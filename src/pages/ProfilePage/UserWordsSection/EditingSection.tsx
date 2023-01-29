import { useEffect, useState } from "react";
import RoundedButton from "../../../components/shared/RoundedButton/RoundedButton";
import { wordsType } from "../../../types/types";
import { updateUserWords } from "../../../utils/utils";
import NewCategory from "./NewCategory";
import CategoriesList from "./CategoriesList";
import { useFetch } from "../../../hooks/useFetch";

type props = {
  bdData: any;
};

export default function EditingSection({ bdData }: props) {
  const [data, setData] = useState<wordsType>(bdData);
  const { makeReq, isLoading, error } = useFetch();

  return (
    <div className="flex flex-col gap-5">
      <NewCategory {...{ setData }} />
      <CategoriesList {...{ data, setData }} />
      <div className="flex w-fit ml-auto gap-3">
        {error && <h5>{error}</h5>}
        <RoundedButton
          className="flex ml-auto"
          onClick={() => makeReq(async () => updateUserWords(data))}
          isLoading={isLoading}
        >
          Сохранить
        </RoundedButton>
      </div>
    </div>
  );
}
