import { useState } from "react";
import axios from "../scripts/axios";

export function useAuthSumbit(url, values) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(url, values)
      .then(({ data }) => {
        setLoading(false);
        if (!data.success) {
          setError(true);
        } else {
          window.location.replace("/games");
        }
      })
      .catch(err => {
        setLoading(false);
        console.log("error in submit: ", err);
        setError(true);
      });
  };

  return [error, loading, handleSubmit];
}
