import React from "react";
import logo from "./assets/logo2.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-400 text-white py-14">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <img src={logo} alt="logo" className="h-20 mb-3" />
            <span>dfe rfhijenfen fjnr3v nurnfrne iwoenn</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Address */}

          <div>
            <h3 className="text-xl font-semibold mb-3">Address</h3>
            <p className="text-base">
              123 Main Street, <br />
              Suite 100, <br />
              New York, NY 10001
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="hover:text-blue-200">
                <FaFacebook size={26} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <FaTwitter size={26} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <FaInstagram size={26} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <FaLinkedin size={26} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-6 pt-4 text-center text-base">
          © 2024 Techbams. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
