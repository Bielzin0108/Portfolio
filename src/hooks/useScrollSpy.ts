import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      const offset = 140;
      let currentId = ids[0] ?? "";

      ids.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= offset) {
          currentId = id;
        }
      });

      if (currentId) {
        setActiveId(currentId);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  return activeId;
}
