import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { authenticationService } from "@/_services";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="w-full">
        <div className="flex items-center min-h-screen p-4 bg-gray-800 lg:justify-center">
          <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
            <div className="p-5 bg-gray-900 md:flex-1">
              <h3 className="my-4 text-2xl font-semibold text-white">
                Register
              </h3>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required("Email is required"),
                  password: Yup.string().required("Password is required"),
                })}
                onSubmit={(
                  { email, password },
                  { setStatus, setSubmitting }
                ) => {
                  setStatus();
                  authenticationService.register(email, password).then(
                    (user) => {
                      const { from } = this.props.location.state || {
                        from: { pathname: "/login" },
                      };
                      this.props.history.push(from);
                    },
                    (error) => {
                      setSubmitting(false);
                      setStatus(error);
                    }
                  );
                }}
                render={({ errors, status, touched, isSubmitting }) => (
                  <Form className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className={
                          "px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-main" +
                          (errors.email && touched.email ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="italic text-main"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="text-sm font-semibold text-gray-500"
                        >
                          Password
                        </label>
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <Field
                        name="password"
                        type="password"
                        className={
                          "px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-main" +
                          (errors.password && touched.password
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="italic text-main"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-main rounded-md shadow hover:bg-main-light focus:outline-none focus:ring-blue-200 focus:ring-4"
                        disabled={isSubmitting}
                      >
                        Register
                      </button>
                      {isSubmitting && (
                        <div className="flex justify-around p-2">
                          <div className="inline-flex rounded-md">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-main"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    {status && (
                      <div className="text-center italic text-main font-bold p-2">
                        <p>*Oops, try again.</p>
                      </div>
                    )}
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { RegisterPage };
