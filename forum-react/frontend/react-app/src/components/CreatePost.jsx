import { NavLink } from "react-router-dom";

export const CreatePost = () => {
  return (
    <>
      <div class="relative mt-20 mx-10 max-w-container px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              // onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="off"
                    // value={inputs.username || ""}
                    required
                    // onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Body
                </label>
                <div className="col-span-full">
                  <textarea
                    id="body"
                    name="body"
                    className="block w-full rounded-md border-0 py-1.5 text-xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <div className="mt-2">
                  <NavLink to="/">Cancel</NavLink>
                  <input
                    type="submit"
                    value="Post"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
