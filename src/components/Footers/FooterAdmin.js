import React from "react";
import { Link } from "react-router-dom";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <Link
                  to={{ pathname: "https://www.bizflowsync.com" }}
                  className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
                  target="_blank"
                >
                  Bizflowsync
                </Link>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <Link
                    to={{ pathname: "https://www.bizflowsync.com" }}
                    className="text-blueGray-600 hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/landing"
                    className="text-blueGray-600 hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={{ pathname: "https://blog.bizflowsync.com" }}
                    className="text-blueGray-600 hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-blueGray-600 hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    MIT License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
