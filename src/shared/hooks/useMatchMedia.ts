import { useEffect, useState } from "react";

export const useMatchMedia = (width: number) => {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    setTimeout(() => {
      setMatches(media.matches);
    }, 0);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [width]);

  return matches;
};
