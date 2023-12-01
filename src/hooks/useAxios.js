import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const REQ_TYPES = {
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  GET: "get",
};

export default function useAxios(initialData) {
  const [resData, setResData] = useState(initialData);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const instance = axios.create({
    baseURL: "http://localhost:9000/api",
    timeout: 1000,
  });

  const doRequest = (
    url,
    method = "get",
    redirect = undefined,
    callback,
    data = undefined
  ) => {
    console.log(
      "url",
      url,
      "method",
      method,
      "redirect",
      redirect,
      "RESSTATEDATA",
      resData
    );
    instance[method](url, data)
      .then((res) => {
        console.log("RESDATA AND CALLBACK", res.data, callback);

        setResData(res.data);
        callback && callback();
        if (redirect) history.push(redirect);
      })
      .catch((err) => {
        console.log(
          `${url} URL ine ${method} isteği gönderilirken bir hata ile karşılaşıldı.`
        );
        setError(err);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return [resData, doRequest, setResData, loading, error];
}
