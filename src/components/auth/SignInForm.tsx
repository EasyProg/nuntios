"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form } from "radix-ui";
import { toast } from "react-toastify";
import { buttonClass, inputClass } from "../ui/consts";

const SignInForm: React.FC = () => {
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const logged = await axios
      .post("/api/signin", {
        email: data.email,
        password: data.password,
      })
      .catch((error) => {
        toast.error(`${error.status}-${error.message}`, {
          position: "top-right",
        });
      });

    if (logged) {
      toast.success("Success", {
        position: "top-right",
      });
      router.push("/chat");
    }
  };

  return (
    <Form.Root className="w-[260px]" onSubmit={handleSignin}>
      <Form.Field className="mb-2.5 grid" name="email">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
            Email
          </Form.Label>
          <Form.Message
            className="text-[13px] text-white opacity-80"
            match="valueMissing"
          >
            Please enter your email
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
      <Form.Field className="mb-2.5 grid" name="password">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
            Password
          </Form.Label>
          <Form.Message
            className="text-[13px] text-white opacity-80"
            match="valueMissing"
          >
            Please enter your password
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
      <Form.Submit asChild>
        <button className={buttonClass}>Sign in</button>
      </Form.Submit>
      <div className="mt-3">
        <Link href="/signup" className="text-[10px]">
          No acc yet? Signup{" "}
        </Link>
      </div>
    </Form.Root>
  );
};
export default SignInForm;
