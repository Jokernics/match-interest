import { ReactElement, useMemo, useState } from "react";

type prms = {
  data: { name: string; element: ReactElement }[];
  defaultIndex?: number;
};

export default function useTabs({ data, defaultIndex = 0 }: prms) {
  const [tabIndex, setTabIndex] = useState(defaultIndex);

  const tabNames = data.map(
    (el, i) =>
      ({ className = "" }: { className?: string }) =>
        (
          <button {...{ className }} onClick={() => setTabIndex(i)}>
            {el.name}
          </button>
        )
  );

  const TabElement = () => data.filter((el, i) => i === tabIndex)[0].element;

  return { tabNames, TabElement, tabIndex };
}
