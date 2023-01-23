import Head from "next/head";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { RegisterType } from "../types";

type Props = {};

const register = (props: Props) => {
  const { errorsMessage, registerFunc } = useAuth();
  // console.log(errorsMessage);

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

      <div className="flex  justify-center items-center h-screen">
        <form
          className=" flex flex-col gap-6 p-6"
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
                {item}
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
                {item}
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
            {errorsMessage?.password?.map((item, index) => (
              <p className="errorMessage" key={index}>
                {item}
              </p>
            ))}
          </div>
          <div className="inputDiv">
            <input
              type="text"
              placeholder="Password Again"
              className="registerInput"
              {...register("password2", { required: true })}
            />
            {errorsMessage?.password2?.map((item, index) => (
              <p className="errorMessage" key={index}>
                {item}
              </p>
            ))}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default register;
