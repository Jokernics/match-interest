import { useCallback, useState } from "react";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const makeReq = async (fetchReq: () => Promise<void>) => {
    setIsLoading(true);
    setError("");
    try {
      await fetchReq();
    } catch (err: any) {
      const fetchErr = `${err.status || ""} ${err.statusText || ""}`;
      setError(err.message || fetchErr);
    } finally {
      setIsLoading(false);
    }
  };

  return { makeReq, isLoading, error };
};
