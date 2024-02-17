import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="text-3xl text-center mt-64 font-bold">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link className="font-normal hover:text-gray-400" to={"/"}>
        Back to home
      </Link>
    </div>
  );
}
