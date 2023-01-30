import { useCallback, useState } from "react";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const makeReq = useCallback(async (fetchReq: () => Promise<void>) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError("");
    try {
      setIsSuccess(false);
      await fetchReq();
      setIsSuccess(true);
    } catch (err: any) {
      const fetchErr = `${err.status || ""} ${err.statusText || ""}`;
      setError(err.message || fetchErr);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { makeReq, isLoading, error, isSuccess };
};
