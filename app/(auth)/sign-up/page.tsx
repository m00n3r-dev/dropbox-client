"use client";

import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const signUp = async (data: {
  email: string;
  username: string;
  password: string;
}) => {
  await axios.post("127.0.0.1", data);
};

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const mutation = useMutation({ mutationFn: signUp });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      email,
      username,
      password,
    });
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <Form onSubmit={handleSubmit} className="flex w-96 flex-col gap-4 ">
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
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          name="username"
          type="username"
          value={username}
          onChange={(e) => {
            setUsername(e);
          }}
          validate={(value) => {
            if (value.length < 3) {
              return "Username must be more than 3 characters";
            }
            return null;
          }}
        >
          <Label>Username</Label>
          <Input placeholder="john" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          value={verifyPassword}
          onChange={(value) => setVerifyPassword(value)}
          validate={(value) => {
            if (value != password) {
              return "Passwords Doesn't match";
            }

            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

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

export default SignUp;
