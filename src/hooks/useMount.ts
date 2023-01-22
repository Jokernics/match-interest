import { useEffect, useState } from "react";

export const useMount = ({
  opened,
  time,
}: {
  opened: boolean;
  time: number;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return { mounted };
};
