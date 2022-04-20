import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required!'),
  password: Yup.string().required('Required!'),
});

function LoginForm(props) {
  const onSubmit = (values, { resetForm }) => {
    props.onLogin(values);
    resetForm();
  };

  return (
    <div className="w-full mx-auto">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        {(formik) => {
          return (
            <Form className="px-0 2xs:px-4">
              <div className="px-2 w-full border h-10 rounded-md mb-2">
                <div className="w-full h-1/3 flex justify-between">
                  <label htmlFor="email" className="text-[10px]">
                    Email
                  </label>
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-[10px] text-red-700"
                  />
                </div>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full h-2/3 outline-none focus:bg-transparent"
                />
              </div>
              <div className="px-2 w-full border h-10 rounded-md">
                <div className="w-full h-1/3 flex justify-between">
                  <label htmlFor="password" className="text-[10px]">
                    Password
                  </label>
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-[10px] text-red-700"
                  />
                </div>
                <Field
                  type="password"
                  id="password2"
                  name="password"
                  className="w-full h-2/3 outline-none focus:bg-transparent "
                />
              </div>
              <button
                type="submit"
                disabled={!formik.isValid}
                className="w-full my-8 border h-8 font-semibold text-sm rounded-lg bg-zinc-800 text-white disabled:bg-zinc-200 disabled:text-black"
              >
                Log in
              </button>
            </Form>
          );
        }}
      </Formik>
      <p className="text-center">
        Don't have an account?{' '}
        <Link to="?mode=Signup" className="font-bold underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
