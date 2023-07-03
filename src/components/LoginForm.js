import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
            <Form className="px-0 2xs:px-4 ">
              <div className="w-full flex flex-col gap-1 my-4" >
                <div className="w-full  flex justify-between">
                  <label htmlFor="email" className="text-[12px] tracking-wide font-bold">
                    Email
                  </label>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-[12px] text-red-400 drop-shadow-sm"
                  />
                </div>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                />
              </div>
              <div className="w-full  flex flex-col gap-1 my-4">
                <div className="w-full h-1/3 flex justify-between">
                  <label htmlFor="password" className="text-[12px] tracking-wide font-bold" >
                    Password
                  </label>
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-[12px] text-red-400 drop-shadow-sm"
                  />
                </div>
                <Field
                  type="password"
                  id="password2"
                  name="password"
                  className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                />
              </div>
              <button
                type="submit"
                disabled={!formik.isValid}
                className="w-full my-2 border h-10 font-semibold text-sm rounded-lg bg-[#cc3c71] text-white  disabled:bg-opacity-10 disabled:text-[#ccc] disabled:cursor-not-allowed"
              >
                Log in
              </button>
            </Form>
          );
        }}
      </Formik>
      <p className="text-center my-2">
        Don't have an account?{' '}
        <Link to="?mode=Signup" className="font-bold underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
