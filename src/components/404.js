import { React } from "react";
import { Link } from "react-router-dom";

function PageNotFound(props) {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            Opps!
            <span className="text-danger"></span> Page not found.
          </p>

          <Link to={"/"} className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
