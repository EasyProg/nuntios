"use client";

import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  unstable_PasswordToggleField as PasswordToggleField,
} from "radix-ui";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { formButton, formInput } from "../ui/consts";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState<String | null>(null);
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const newUser = await axios
      .post("/api/signup", {
        email: data.email,
        name: data.userName,
        password: password,
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
          <input className={formInput} type="email" required />
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
          <input className={formInput} type="text" required id="userName" />
        </Form.Control>
      </Form.Field>
      <Form.Field className="mb-2.5 grid" name="password">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
            Password
          </Form.Label>
        </div>
        <Form.Control asChild>
          <PasswordToggleField.Root id="password">
            <div className="flex items-center justify-center">
              <PasswordToggleField.Input
                className={
                  formInput +
                  "all-[unset] box-border h-[18px] text-[15px] text-inherit leading-[1] selection:bg-blackA6 selection:text-white"
                }
                required
                onChange={(v: ChangeEvent<HTMLInputElement>) => {
                  setPassword(v.target.value);
                }}
              />
              <PasswordToggleField.Toggle className="relative left-[-25] all-[unset] box-border h-[18px] text-[15px] text-inherit leading-[1] flex items-center justify-center aspect-[1/1] rounded-[0.5px] focus-visible:outline-[2px] focus-visible:outline-accent-9 focus-visible:outline-offset-[2px]">
                <PasswordToggleField.Icon
                  visible={<EyeOpenIcon />}
                  hidden={<EyeClosedIcon />}
                />
              </PasswordToggleField.Toggle>
            </div>
          </PasswordToggleField.Root>
        </Form.Control>
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
        <Form.Message
          className="text-[13px] text-white opacity-80"
          match={(value) => !value.match(strongPasswordRegex)}
        >
          Strong password must contain numbers, letters, at least one special
          symbol, at least one uppercase and length must be no lower than 8
        </Form.Message>
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
          <PasswordToggleField.Root>
            <div className="flex items-center justify-center">
              <PasswordToggleField.Input
                className={
                  formInput +
                  "all-[unset] box-border h-[18px] text-[15px] text-inherit leading-[1] selection:bg-blackA6 selection:text-white"
                }
                required
                id="password2"
              />
              <PasswordToggleField.Toggle className="relative left-[-25] all-[unset] box-border h-[18px] text-[15px] text-inherit leading-[1] flex items-center justify-center aspect-[1/1] rounded-[0.5px] focus-visible:outline-[2px] focus-visible:outline-accent-9 focus-visible:outline-offset-[2px]">
                <PasswordToggleField.Icon
                  visible={<EyeOpenIcon />}
                  hidden={<EyeClosedIcon />}
                />
              </PasswordToggleField.Toggle>
            </div>
          </PasswordToggleField.Root>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className={formButton}>Sign in</button>
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
