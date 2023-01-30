import { ReactElement, useMemo, useState } from "react";

type prms = {
  data: { name: string; element: ReactElement }[];
  defaultIndex?: number;
};

export default function useTabs({ data, defaultIndex = 0 }: prms) {
  const [tabIndex, setTabIndex] = useState(defaultIndex);

  const tabNames = data.map((el, i) => {
    const name = ({ className = "" }: { className?: string }) => (
      <button {...{ className }} onClick={() => setTabIndex(i)}>
        {el.name}
      </button>
    );
    return name;
  });

  const tabElement = useMemo(
    () => data.filter((el, i) => i === tabIndex)[0].element,
    [data, tabIndex]
  );

  return { tabNames, tabElement, tabIndex };
}
