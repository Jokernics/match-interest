import React from "react";
import Api from "../../../API/API";
import RoundedButton from "../../../components/shared/RoundedButton/RoundedButton";
import { useFetch } from "../../../hooks/useFetch";
import { wordsType } from "../../../types/types";

type props = {
  data: wordsType;
};

export default function SaveWordsBtn({ data }: props) {
  const { makeReq, isLoading, error } = useFetch();

  return (
    <div className="flex w-fit gap-3">
      {error && <h5>{error}</h5>}
      <RoundedButton
        className="flex ml-auto"
        onClick={() => makeReq(async () => Api.updateUserWords(data))}
        isLoading={isLoading}
      >
        Сохранить
      </RoundedButton>
    </div>
  );
}
