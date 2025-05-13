"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form } from "radix-ui";
import React from "react";
import { toast } from "react-toastify";
import { buttonClass, inputClass } from "../ui/consts";

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const newUser = await axios
      .post("/api/signup", {
        email: data.email,
        name: data.userName,
        password: data.password,
      })
      .catch((error) => {
        if (error.status == 409) {
          toast.error(`User already exists`, {
            position: "top-right",
          });
          return;
        }
        toast.error(`${error.status}-${error.message}`, {
          position: "top-right",
        });
      });

    if (newUser) {
      toast.success("User created", {
        position: "top-right",
      });
      router.push("/signin");
    }
  };

  return (
    <Form.Root className="w-[260px]" onSubmit={handleSignup}>
      <Form.Field className="mb-2.5 grid" name="email">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
            Email
          </Form.Label>
          <Form.Message
            className="text-[13px] text-white opacity-80"
            match="valueMissing"
          >
            Enter your email
          </Form.Message>
          <Form.Message
            className="text-[13px] text-white opacity-80"
            match="typeMismatch"
          >
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={inputClass} type="email" required />
        </Form.Control>
      </Form.Field>
      <Form.Field className="mb-2.5 grid" name="userName">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
            Your name
          </Form.Label>
          <Form.Message
            className="text-[13px] text-white opacity-80"
            match="valueMissing"
          >
            Enter your Name
          </Form.Message>
          <Form.Message
            className="text-[13px] text-white opacity-80"
            match="typeMismatch"
          >
            Please provide a valid Name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={inputClass} type="text" required id="userName" />
        </Form.Control>
      </Form.Field>
      <Form.Field className="mb-2.5 grid" name="password">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
            Password
          </Form.Label>
          <Form.Message
            className="text-[13px] text-white opacity-80"
            match="valueMissing"
          >
            Enter your password
          </Form.Message>
          <Form.Message
            className="text-[13px] text-white opacity-80"
            match="typeMismatch"
          >
            Please provide a valid password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={inputClass} type="password" required />
        </Form.Control>
      </Form.Field>
      <Form.Field className="mb-2.5 grid" name="password2">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-white whitespace-nowrap">
            Repeat
          </Form.Label>
          <Form.Message
            className="text-[13px] text-white opacity-80 whitespace-nowrap"
            match="valueMissing"
          >
            Repeat your password
          </Form.Message>
          <Form.Message
            className="text-[13px] text-white opacity-80"
            match={(value, formData) => value !== formData.get("password")}
          >
            Passwords didn't match
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={inputClass} type="password" required />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className={buttonClass}>Sign in</button>
      </Form.Submit>
      <div className="mt-3">
        <Link href="/signin" className="text-[10px]">
          Has acc? Signin
        </Link>
      </div>
    </Form.Root>
  );
};
export default SignUpForm;
