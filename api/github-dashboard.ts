type GitHubLanguageStat = {
  color: string;
  label: string;
  value: number;
};

type GitHubDashboardData = {
  activityCells: number[];
  avatarUrl: string;
  languages: GitHubLanguageStat[];
  lastPushAt: string | null;
  publicRepos: number;
  source: "live";
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

type ApiRequest = {
  query: {
    username?: string;
  };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
};

const languageColors: Record<string, string> = {
  CSS: "#9aa4b2",
  HTML: "#ef4444",
  Java: "#f4f7fb",
  JavaScript: "#f7df1e",
  TypeScript: "#2df28c"
};

function buildHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Gabriel-Cavalcante-Portfolio",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

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
    .slice(0, 6)
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

async function fetchGitHubJson<T>(url: string) {
  const response = await fetch(url, { headers: buildHeaders() });
  if (!response.ok) {
    throw new Error(`github-api-${response.status}`);
  }

  return (await response.json()) as T;
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const username = request.query.username ?? "Bielzin0108";

  try {
    const [user, repoList] = await Promise.all([
      fetchGitHubJson<GitHubUserResponse>(`https://api.github.com/users/${username}`),
      fetchGitHubJson<GitHubRepoResponse[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`)
    ]);

    const repos = repoList.filter((repo) => !repo.fork);
    const languageTotals: Record<string, number> = {};
    const topRepos = repos.slice(0, 20);
    const languageResults = await Promise.allSettled(
      topRepos.map((repo) => fetchGitHubJson<Record<string, number>>(repo.languages_url))
    );

    languageResults.forEach((result) => {
      if (result.status !== "fulfilled") return;

      Object.entries(result.value).forEach(([language, bytes]) => {
        languageTotals[language] = (languageTotals[language] ?? 0) + bytes;
      });
    });

    const languages = normalizeLanguageStats(languageTotals);
    const latestPush = repos.find((repo) => repo.pushed_at)?.pushed_at ?? null;
    const dashboard: GitHubDashboardData = {
      activityCells: buildActivityCells(repos),
      avatarUrl: user.avatar_url,
      languages: languages.length ? languages : getFallbackLanguageStats(repos),
      lastPushAt: latestPush,
      publicRepos: user.public_repos,
      source: "live",
      stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      username: user.login
    };

    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    response.status(200).json(dashboard);
  } catch {
    response.status(502).json({ message: "github-dashboard-unavailable" });
  }
}
