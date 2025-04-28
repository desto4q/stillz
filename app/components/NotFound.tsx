import { Link } from "react-router";
import FlexBody from "./FlexBody";

export default function NotFound() {
  return (
    <FlexBody>
      <div className="flex-1 grid place-items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-6xl font-extrabold text-primary">404</h2>
            <p className="text-2xl text-gray-600 mt-2">
              Oops! The page you're looking for can't be found.
            </p>
            <p className="text-md text-gray-500 mt-1">
              It might have been moved or deleted.
            </p>
          </div>
          <Link to="/" className="btn btn-primary btn-soft btn-lg">
            Go Home
          </Link>
        </div>
      </div>
    </FlexBody>
  );
}
