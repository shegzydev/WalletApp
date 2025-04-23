import React, { useState } from 'react';

import vitelogo from '/vite.svg';

const Welcome = () => {
  //   const handleClick = () => {};
  const [choice, setChoice] = useState(0);

  return (
    <div className="d-flex flex-column text-center col-12 p-0 pt-5 m-0">
      <div className="d-flex flex-column align-items-center col-12 mt-5 mb-2 pt-3 pb-3">
        <h1 className="mt-3 mb-3 fw-semibold">Welcome to ShegzPay</h1>
        <img src={vitelogo} alt="" className="col-4 mt-3 mb-3" />
        <span className="mt-2 mb-2 fw-semibold">
          Smoothest banking experience
          <br />
          at your fingertip
        </span>
      </div>

      <div className="mt-3 mb-3">
        <div className="mt-2 mb-2">
          <a href="/register">
            <button className="btn btn-primary w-75 shadow fw-semibold">
              Get Started
            </button>
          </a>
        </div>
        <div className="mt-3">
          <span>
            Have an Account?{' '}
            <a href="/login" className="fw-semibold">
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
