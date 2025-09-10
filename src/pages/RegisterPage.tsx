import React from 'react';
import {AuthLayout} from "../components/Layout/AuthLayout.tsx";
import {RegisterForm} from "../components/RegisterForm/RegisterForm.tsx";

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout
      rightTitle="Create your Account"
      rightSubtitle="Please fill in the form to continue"
    >
      <RegisterForm />
    </AuthLayout>

  )
}