import { useEffect, useRef, useState, useCallback } from "react";

type prms = React.InputHTMLAttributes<HTMLInputElement>;

export function useAllEnabledWidthDiv() {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const Div = useCallback(
    ({ children, ...props }: prms) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    ),
    []
  );

  return { Div, width, height };
}
