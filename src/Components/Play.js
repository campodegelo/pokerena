import React from "react";
import { Link } from "react-router-dom";

export default function Play () {

  return (
    <div className="play">

        <Link to="/login"  className="btn btn--white btn--animated">login</Link>
        <Link to="/register"  className="btn btn--white btn--animated">registrar</Link>

    </div>
  );
}
