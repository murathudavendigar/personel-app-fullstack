import React, { useState } from "react";
import { ErrorType, RegisterType } from "../types";
import axios from "axios";
import { REGISTER_URL } from "../constant/urls";

const useAuth = () => {
  const [errorsMessage, setErrorsMessage] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState(false);

  const registerFunc = async (registerInfo: RegisterType) => {
    setLoading(true);
    try {
      const { data } = await axios.post(REGISTER_URL, registerInfo);
      setErrorsMessage(null);
    } catch (error: any) {
      setErrorsMessage(error.response.data);
    }
    setLoading(false);
  };

  return { loading, errorsMessage, registerFunc };
};

export default useAuth;
