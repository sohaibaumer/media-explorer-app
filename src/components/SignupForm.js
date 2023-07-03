import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FileUploader } from 'react-drag-drop-files';
import CancelIcon from '@mui/icons-material/Cancel';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

const initialValues = {
  email: '',
  fullName: '',
  password: '',
  confirmPassword: '',
  profession: '',
  aboutMe: '',
  age: '',
  gender: '',
  location: '',
  profilePicture: '',
  phoneNumber: '',
  facebook: '',
  instagram: '',
  twitter: '',
  step: 1,
};

const fileTypes = ['JPG', 'PNG', 'GIF'];

function SignupForm(props) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleChange = (file) => {
    setLoading(true);
    setFile(file);
  };

  useEffect(() => {
    setLoading(false);
    if (file) {
      storeFile();
    }
  }, [file]);

  async function storeFile() {
    const reader = await new FileReader();
    const blob = new Blob([file], { type: file.type });
    reader.readAsDataURL(blob);
    reader.addEventListener('load', () => {
      console.log(reader.result);
      setFileUrl(reader.result);
    });
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required!'),
    fullName: Yup.string().required('Required!'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required!'),
    profession: Yup.string().required('Required!'),
    aboutMe: Yup.string().required('Required!'),
    age: Yup.number().required('Required!'),
    gender: Yup.string().required('Required!'),
    location: Yup.string().required('Required!'),
    phoneNumber: Yup.string().required('Required!'),
    facebook: Yup.string().url('Invalid URL format').required('Required!'),
    instagram: Yup.string().url('Invalid URL format').required('Required!'),
    twitter: Yup.string().url('Invalid URL format').required('Required!'),
  });

  const onSubmit = (values, { resetForm }) => {
    const user = {
      email: values.email,
      fullName: values.fullName,
      password: values.password,
      profession: values.profession,
      aboutMe: values.aboutMe,
      age: values.age,
      gender: values.gender,
      location: values.location,
      profilePicture: fileUrl && fileUrl,
      phoneNumber: values.phoneNumber,
      facebook: values.facebook,
      instagram: values.instagram,
      twitter: values.twitter,
    };

    props.onAddUser(user);
    resetForm();
    setFile(null);
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
          const { setFieldValue, values } = formik;
          const step = values.step;

          return (
            <Form className="px-0 2xs:px-4">
              {values.step === 1 && (
                <>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="fullName" className="text-[12px] tracking-wide font-bold">
                        Full Name{' '}
                      </label>
                      <ErrorMessage
                        name="fullName"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="fullName"
                      type="text"
                      name="fullName"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="email" className="text-[12px] tracking-wide font-bold">
                        Email
                      </label>
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="email"
                      type="email"
                      name="email"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="password" className="text-[12px] tracking-wide font-bold">
                        Password
                      </label>
                      <ErrorMessage
                        name="password"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="password"
                      type="password"
                      name="password"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-2/5 flex justify-between">
                      <label htmlFor="confirmPassword" className="text-[12px] tracking-wide font-bold">
                        Confirm Password
                      </label>
                      <ErrorMessage
                        name="confirmPassword"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <button
                    className="w-full my-2 border h-10 font-semibold text-sm rounded-lg bg-[#cc3c71] text-white  disabled:bg-opacity-10 disabled:text-[#ccc] disabled:cursor-not-allowed"
                    type="button"
                    onClick={() => setFieldValue('step', step + 1)}
                    disabled={
                      formik.errors.fullName ||
                      formik.errors.email ||
                      formik.errors.password ||
                      formik.errors.confirmPassword
                    }
                  >
                    Next
                  </button>
                </>
              )}

              {values.step === 2 && (
                <>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="profession" className="text-[12px] tracking-wide font-bold">
                        Profession{' '}
                      </label>
                      <ErrorMessage
                        name="profession"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="profession"
                      type="text"
                      name="profession"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="aboutMe" className="text-[12px] tracking-wide font-bold">
                        About Me
                      </label>
                      <ErrorMessage
                        name="aboutMe"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="aboutMe"
                      type="text"
                      name="aboutMe"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="age" className="text-[12px] tracking-wide font-bold">
                        Age
                      </label>
                      <ErrorMessage
                        name="age"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="age"
                      type="number"
                      name="age"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                      step="1"
                      onKeyDown={(e) =>
                        ['e', 'E', '+', '-', '.'].includes(e.key) &&
                        e.preventDefault()
                      }
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="gender" className="text-[12px] tracking-wide font-bold">
                        Gender{' '}
                      </label>
                      <ErrorMessage
                        name="gender"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="gender"
                      type="text"
                      name="gender"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="location" className="text-[12px] tracking-wide font-bold">
                        Location{' '}
                      </label>
                      <ErrorMessage
                        name="location"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="location"
                      type="text"
                      name="location"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  {!loading && !file && (
                    <FileUploader
                      handleChange={handleChange}
                      name="file"
                      types={fileTypes}
                      children={
                        <div className="w-full border border-black h-20 rounded-md mb-2 relative">
                          <div className="w-full h-1/6 flex justify-between absolute">
                            <label
                              htmlFor="imageUpload"
                              className="ml-2 text-[10px]"
                            >
                              Upload or drop an image inside this box
                            </label>
                            {values.location &&
                              values.gender &&
                              values.age &&
                              values.aboutMe &&
                              values.profession &&
                              !file && (
                                <span className="mr-2 text-[10px] text-red-700">
                                  Required
                                </span>
                              )}
                          </div>
                          <div className="absolute w-full h-full cursor-pointer flex justify-center items-center">
                            <AddPhotoAlternateOutlinedIcon
                              sx={{
                                margin: 'auto',
                                width: '28px',
                                height: '28px',
                              }}
                            />
                          </div>
                        </div>
                      }
                    />
                  )}
                  {loading && !file && (
                    <div className="relative">
                      <svg
                        class="absolute top-[50%] left-[50%] animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  {file && (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="rounded-md"
                      />
                      <CancelIcon
                        className="absolute top-1 right-1 cursor-pointer"
                        onClick={() => {
                          setFile(null);
                        }}
                      />
                    </div>
                  )}
                  <div className="flex">
                    <button
                      className="w-full my-8 mr-1 border h-8 font-semibold text-sm rounded-lg bg-zinc-800 text-white disabled:bg-zinc-200 disabled:text-black"
                      type="button"
                      onClick={() => setFieldValue('step', step - 1)}
                    >
                      Back
                    </button>
                    <button
                      className="w-full my-8 ml-1 border h-8 font-semibold text-sm rounded-lg bg-zinc-800 text-white disabled:bg-zinc-200 disabled:text-black "
                      type="button"
                      onClick={() => setFieldValue('step', step + 1)}
                      disabled={
                        formik.errors.profession ||
                        formik.errors.aboutMe ||
                        formik.errors.age ||
                        formik.errors.gender ||
                        formik.errors.location ||
                        !file
                      }
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {values.step === 3 && (
                <>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="phoneNumber" className="text-[12px] tracking-wide font-bold">
                        Phone Number{' '}
                      </label>
                      <ErrorMessage
                        name="phoneNumber"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="phoneNumber"
                      type="number"
                      name="phoneNumber"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                      onKeyDown={(e) =>
                        ['e', 'E', '+', '-', '.'].includes(e.key) &&
                        e.preventDefault()
                      }
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 my-4" >
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="facebook" className="text-[12px] tracking-wide font-bold">
                        Facebook
                      </label>
                      <ErrorMessage
                        name="facebook"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="facebook"
                      type="url"
                      name="facebook"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <div className="px-2 w-full  border border-black h-10 rounded-md mb-2">
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="instagram" className="text-[12px] tracking-wide font-bold">
                        Instagram
                      </label>
                      <ErrorMessage
                        name="instagram"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="instagram"
                      type="url"
                      name="instagram"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <div className="px-2 w-full  border border-black h-10 rounded-md mb-2">
                    <div className="w-full h-[35%] flex justify-between">
                      <label htmlFor="twitter" className="text-[12px] tracking-wide font-bold">
                        Twitter
                      </label>
                      <ErrorMessage
                        name="twitter"
                        component="span"
                        className="text-[12px] text-red-400 drop-shadow-sm"
                      />
                    </div>
                    <Field
                      id="twitter"
                      type="url"
                      name="twitter"
                      className="  h-10 rounded  w-full outline-none bg-transparent 
                  focus:bg-transparent  bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg px-2"
                    />
                  </div>
                  <div className="flex">
                    <button
                      className="w-full mr-1 my-8 border h-8 font-semibold text-sm rounded-lg bg-zinc-800 text-white disabled:bg-zinc-200 disabled:text-black"
                      type="button"
                      onClick={() => setFieldValue('step', step - 1)}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className="w-full ml-1 my-8 border h-8 font-semibold text-sm rounded-lg bg-zinc-800 text-white disabled:bg-zinc-200 disabled:text-black"
                    >
                      Sign up{' '}
                    </button>
                  </div>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
      <p className="text-center">
        Already have an account?{' '}
        <Link to="?mode=Login" className="font-bold underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignupForm;
