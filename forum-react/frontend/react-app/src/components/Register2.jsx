import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./user/userActions";
import { useNavigate } from "react-router-dom";
import { LOCATION_CHANGE } from "./user/userSlice";

export const Register2 = () => {
  const USER_REGEX = /^[.]{2,23}$/;
  const PWD_REGEX = /^[.]{8,40}$/;
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userToken, error, success } = useSelector(
    (state) => state.user
  );

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    dispatch(LOCATION_CHANGE());
  }, []);

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [navigate, userToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(inputs));
  };
  // Styling source: https://tailwindui.com/components/application-ui/forms/sign-in-forms
  return (
    <>
      {success ? (
        <h1>Success</h1>
      ) : (
        <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    value={inputs.username || ""}
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error && (
                    <h2 style={{ color: "red", textAlign: "center" }}>
                      Username is already taken.
                    </h2>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="displayname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Displayname
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="displayname"
                    autoComplete="off"
                    value={inputs.displayname || ""}
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    value={inputs.password || ""}
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="submit"
                    value={"Register"}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};
