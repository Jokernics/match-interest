import { useState } from "react";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const makeReq = (fetchReq: (Promise<void>)) => {
    setIsLoading(true);
    setError("");
    fetchReq
      .catch((err) => setError(`${err.status || ""} ${err.statusText || ""}`))
      .finally(() => setIsLoading(false));
  };

  return { makeReq, isLoading, error };
};
