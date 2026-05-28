export type GitHubLanguageStat = {
  color: string;
  label: string;
  value: number;
};

export type GitHubDashboardData = {
  activityCells: number[];
  avatarUrl: string;
  languages: GitHubLanguageStat[];
  lastPushAt: string | null;
  publicRepos: number;
  stars: number;
  username: string;
};

type GitHubUserResponse = {
  avatar_url: string;
  login: string;
  public_repos: number;
};

type GitHubRepoResponse = {
  fork: boolean;
  language: string | null;
  languages_url: string;
  pushed_at: string | null;
  stargazers_count: number;
};

const languageColors: Record<string, string> = {
  CSS: "#9aa4b2",
  HTML: "#ef4444",
  Java: "#f4f7fb",
  JavaScript: "#f7df1e",
  TypeScript: "#2df28c"
};

function buildActivityCells(repos: GitHubRepoResponse[]) {
  const days = 84;
  const today = new Date();
  const counts = Array.from({ length: days }, () => 0);

  repos.forEach((repo) => {
    if (!repo.pushed_at) return;

    const pushedAt = new Date(repo.pushed_at);
    const diffDays = Math.floor((today.getTime() - pushedAt.getTime()) / 86_400_000);

    if (diffDays >= 0 && diffDays < days) {
      counts[days - 1 - diffDays] += 1;
    }
  });

  const max = Math.max(...counts, 1);
  return counts.map((count) => (count === 0 ? 0 : Math.max(0.25, count / max)));
}

function normalizeLanguageStats(totals: Record<string, number>) {
  const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
  if (total === 0) return [];

  return Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([label, bytes]) => ({
      color: languageColors[label] ?? "#8b95a7",
      label,
      value: Math.max(1, Math.round((bytes / total) * 100))
    }));
}

function getFallbackLanguageStats(repos: GitHubRepoResponse[]) {
  const totals = repos.reduce<Record<string, number>>((acc, repo) => {
    if (!repo.language) return acc;
    acc[repo.language] = (acc[repo.language] ?? 0) + 1;
    return acc;
  }, {});

  return normalizeLanguageStats(totals);
}

export async function fetchGitHubDashboard(username: string): Promise<GitHubDashboardData> {
  const [userResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`)
  ]);

  if (!userResponse.ok || !reposResponse.ok) {
    throw new Error("github-api-error");
  }

  const user = (await userResponse.json()) as GitHubUserResponse;
  const repos = ((await reposResponse.json()) as GitHubRepoResponse[]).filter((repo) => !repo.fork);
  const languageTotals: Record<string, number> = {};
  const topRepos = repos.slice(0, 10);

  const languageResults = await Promise.allSettled(
    topRepos.map(async (repo) => {
      const response = await fetch(repo.languages_url);
      if (!response.ok) throw new Error("github-language-error");
      return (await response.json()) as Record<string, number>;
    })
  );

  languageResults.forEach((result) => {
    if (result.status !== "fulfilled") return;

    Object.entries(result.value).forEach(([language, bytes]) => {
      languageTotals[language] = (languageTotals[language] ?? 0) + bytes;
    });
  });

  const latestPush = repos.find((repo) => repo.pushed_at)?.pushed_at;
  const languages = normalizeLanguageStats(languageTotals);

  return {
    activityCells: buildActivityCells(repos),
    avatarUrl: user.avatar_url,
    languages: languages.length ? languages : getFallbackLanguageStats(repos),
    lastPushAt: latestPush ?? null,
    publicRepos: user.public_repos,
    stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    username: user.login
  };
}
