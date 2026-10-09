"use client";

import { Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Link,
  Spinner,
  TextField,
} from "@heroui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/lib/api";

const signIn = async (data: { email: string; password: string }) => {
  await api.post("auth/sign-in", data);
};

function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({ mutationFn: signIn });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4 ">
        <TextField
          isRequired
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e);
          }}
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input autoComplete="email" placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e);
          }}
          validate={(value) => {
            if (value.length < 8) {
              return "password must be at least 8 characters";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input autoComplete="current-password webauthn" placeholder="" />
          <FieldError />
        </TextField>

        <NextLink href={"sign-up"}>
          <Link>
            Doesn&apos;t have an account ? sign up <Link.Icon />
          </Link>
        </NextLink>
        <div className="flex gap-2">
          <Button
            className={"w-full"}
            type="submit"
            isDisabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Spinner color="current" size="sm" />
                Signing In...
              </>
            ) : (
              <>
                <Check />
                Sign In
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SingIn;
