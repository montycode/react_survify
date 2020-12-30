import React from "react";

import { userService, authenticationService } from "@/_services";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      users: null,
    };
  }

  componentDidMount() {
    userService.getAll().then((users) => this.setState({ users }));
  }

  render() {
    const { currentUser, users } = this.state;
    return (
      <div class="bg-gray-800 overflow-x-hidden flex-grow">
        <div class="px-6 py-8 flex-grow">
          <div class="flex justify-between flex-col lg:flex-row container mx-auto">
            <div class="lg:-mx-8 w-full lg:w-6/12 flex-row lg:block mb-4">
              <div class="lg:px-8">
                <h1 class="mb-6 text-xl font-bold text-white">Surveys</h1>
                <div class="max-w-4xl px-10 py-6 bg-gray-900 rounded-lg shadow-md">
                  <div class="flex justify-between items-center">
                    <span class="font-light text-gray-600">Jun 1, 2020</span>
                  </div>
                  <div class="mt-2">
                    <h2 class="text-2xl text-white font-bold hover:underline">
                      ¿Which is your favorite computer brand?
                    </h2>
                    <Formik
                      initialValues={{
                        email: "",
                        comments: "",
                        fav_pc: "",
                        date: new Date(),
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string().required("Email is required"),
                        comments: Yup.string().required(
                          "Comments are required"
                        ),
                        fav_pc: Yup.string().required(
                          "Select a computer brand."
                        ),
                      })}
                      onSubmit={(
                        { email, comments, fav_pc, date },
                        { setStatus, setSubmitting }
                      ) => {
                        setStatus();
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
                                (errors.username && touched.username
                                  ? " is-invalid"
                                  : "")
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
                                htmlFor="comments"
                                className="text-sm font-semibold text-gray-500"
                              >
                                Comments
                              </label>
                            </div>
                            <Field
                              name="comments"
                              type="textarea"
                              className={
                                "px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-main" +
                                (errors.password && touched.password
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="comments"
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
                              Submit
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
                              <p>*Error.</p>
                            </div>
                          )}
                        </Form>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 mb-4">
              <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold text-white md:text-2xl">
                  My Results
                </h1>
              </div>
              <div class="mt-6">
                <div class="max-w-4xl px-10 py-6 bg-gray-900 rounded-lg shadow-md">
                  <div class="flex justify-between items-center">
                    <span class="font-light text-gray-600">
                      No. #1231650012
                    </span>
                    <span class="font-light text-gray-600">Dic 29, 2020</span>
                  </div>
                  <div class="mt-2 font-bold">
                    <h3 class="text-2xl text-white hover:underline py-2">
                      ¿Which is your favorite computer brand?
                    </h3>
                    <p class="text-gray-300">omar@montydev.com</p>
                    <p class="text-gray-300">I don't like laptops.</p>
                  </div>
                  <div class="flex justify-between items-center mt-4">
                    <div>
                      <a href="#" class="flex items-center">
                        <img
                          src="https://pcsinmisterios.files.wordpress.com/2016/04/brand1.gif?w=1000"
                          alt="avatar"
                          class="mr-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                        />
                        <h1 class="text-white font-bold hover:underline">
                          Alienware
                        </h1>
                      </a>
                    </div>
                    <a
                      href="#"
                      class="px-2 py-1 bg-main text-white font-bold rounded hover:bg-main-light"
                    >
                      Delete Result
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { HomePage };
