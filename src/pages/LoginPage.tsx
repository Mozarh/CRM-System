import React from "react";
import {LoginForm} from "../components/LoginForm/LoginForm.tsx";
import {AuthLayout} from "../components/Layout/AuthLayout.tsx";



export const LoginPage : React.FC = () => {
  return (
    <AuthLayout
      rightTitle="Login to your Account"
      rightSubtitle="See what is going on with your business"
    >
      <LoginForm />
    </AuthLayout>
  )
}