import { useEffect } from "react";
// Subject to testing
/**
 * A custom hook that fires the `callback` when the `ref` changes.
 *
 * @param ref - A React ref object to watch.
 * @param callback - A function to call whenever the `ref.current` value changes.
 */
export function useResizeObserver<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: () => void,
) {
  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, callback]);
}
