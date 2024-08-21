import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <section id="error-page" className="flex items-center justify-center h-screen bg-red-50 text-red-800">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-6xl font-bold text-red-500">404</h2>
        <h4 className="mt-2 text-2xl font-semibold">Sorry! Page not found</h4>
        <p className="mt-4 text-gray-700">
          Oops! It seems like the page you're trying to access doesn't exist.
          If you believe there's an issue, feel free to report it, and we'll
          look into it.
        </p>
        <div className="mt-6">
          <NavLink
            to="/"
            className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Return Home
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Error;
