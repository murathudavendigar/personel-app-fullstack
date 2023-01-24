import Head from "next/head";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { LoginType } from "../types";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

type Props = {};

const login = (props: Props) => {
  const { loading, errorsMessage, loginFunc } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    await loginFunc(data);
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <motion.div
        initial={{ y: -1300 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5 }}
        className="flex justify-center items-center h-screen">
        <form
          className=" flex flex-col gap-10"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="inputDiv">
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
              {...register("username", { required: true })}
            />
          </div>

          <div className="inputDiv">
            <input
              type="text"
              placeholder="Password"
              className="registerInput"
              {...register("password", { required: true })}
            />

            {errorsMessage?.non_field_errors && (
              <p className="errorMessage">
                {errorsMessage.non_field_errors[0]}
              </p>
            )}
          </div>

          <button type="submit" className="submitButton">
            {loading ? <Loader color="#bcc" /> : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default login;
