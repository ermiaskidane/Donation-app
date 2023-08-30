"use client"

import { useCallback, useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
// import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import {useRouter} from "next/navigation"
import Heading from "../Heading";
import Input from "../inputs/input";
import Button from "../Button";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const [shieldModal, setShieldModal] = useState(loginModal.isOpen);

  useEffect(() => {
    setShieldModal(loginModal.isOpen);
  }, [loginModal.isOpen]);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

const onSubmit = () => {
  console.log("tested")
}

const onToggle = useCallback(() => {
  loginModal.onClose();
  registerModal.onOpen();
}, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome back" 
        subtitle="Login to your account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => console.log("clicked")}
        // onClick={() => signIn('google')}
      />
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>First time using Airbnb?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Create an account</span>
        </p>
      </div>
    </div>
  )

  return (
    <>
      {shieldModal ? <div className="fixed left-0 top-0 w-screen h-screen z-40  opacity-70 bg-current" onClick={loginModal.onClose}></div> : <></>}
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  )
}

export default LoginModal;