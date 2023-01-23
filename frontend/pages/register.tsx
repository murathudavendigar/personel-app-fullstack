import Head from "next/head";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { RegisterType } from "../types";
import { motion } from "framer-motion";

type Props = {};

const register = (props: Props) => {
  const { loading, errorsMessage, registerFunc } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    await registerFunc(data);
  };

  return (
    <div>
      <Head>
        <title>Register</title>
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
            {errorsMessage?.username?.map((item, index) => (
              <p className="errorMessage" key={index}>
                * {item}
              </p>
            ))}
          </div>
          <div className="inputDiv">
            <input
              type="email"
              placeholder="Email"
              className="registerInput"
              {...register("email", { required: true })}
            />
            {errorsMessage?.email?.map((item, index) => (
              <p className="errorMessage" key={index}>
                * {item}
              </p>
            ))}
          </div>
          <div className="inputDiv">
            <input
              type="text"
              placeholder="First Name"
              className="registerInput"
              {...register("first_name")}
            />
          </div>
          <div className="inputDiv">
            <input
              type="text"
              placeholder="Last Name"
              className="registerInput"
              {...register("last_name")}
            />
          </div>
          <div className="inputDiv">
            <input
              type="text"
              placeholder="Password"
              className="registerInput"
              {...register("password", { required: true })}
            />
            {errorsMessage?.password && (
              <p className="errorMessage">* {errorsMessage.password[0]} </p>
            )}
          </div>
          <div className="inputDiv">
            <input
              type="text"
              placeholder="Password Again"
              className="registerInput"
              {...register("password2", { required: true })}
            />
            {errorsMessage?.password2 && (
              <p className="errorMessage">* {errorsMessage.password2[0]} </p>
            )}
          </div>

          <button type="submit" className="submitButton">
            {loading ? <Loader color="#bcc" /> : "Register"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default register;
