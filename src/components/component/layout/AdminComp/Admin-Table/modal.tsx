"use client";

import type { User } from "@/lib/types";
import { Jersey_10 } from "next/font/google";
import { useEffect, useState } from "react";

const jersey10 = Jersey_10({
  weight: "400",
  subsets: ["latin"],
});

interface formDataInterface {
  name: string;
  email: string;
  divisi: string;
  password: string;
  role: "USER" | "ADMIN";
}

interface ModalProps {
  state: "edit" | "create";
  onCloseButton: () => void;
  onSubmit: (formData: formDataInterface) => void;
  userData?: User
}

const Modal = ({ state, onCloseButton, onSubmit, userData }: ModalProps) => {
  const [formData, setFormData] = useState<formDataInterface>({
    name: "",
    email: "",
    divisi: "",
    password: "",
    role: "USER",
  });

  useEffect(()=>{
    if (state === "edit" && userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        divisi: userData.divisi,
        password: "",
        role: "USER",
      });
    }
  },[])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 bg-opacity-50 z-50">
          <div className="bg-[#FFFDE3] p-6 rounded-lg shadow-lg w-1/3">
            <div className="relative mb-12">
              <button
                onClick={() => onCloseButton()}
                className="absolute top-0 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08 256z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className={jersey10.className}>
              <h2 className="text-6xl tracking-wide mb-4 text-center">
                {state === "create" ? "Create" : "Edit"} Account
              </h2>
            </div>
            <form
              className="px-12 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg mb-2 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter Your Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-md px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg mb-2 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-md px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="divisi"
                  className="block text-lg mb-2 font-medium text-gray-900"
                >
                  Division
                </label>
                <div className="mt-2">
                  <select
                    id="divisi"
                    name="divisi"
                    required
                    value={formData.divisi}
                    onChange={handleInputChange}
                    className="block w-full rounded-md px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600"
                  >
                    <option value="" disabled>
                      Select Division
                    </option>
                    <option value="ITNSA">ITNSA</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="********"
                    required={state === "create"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full rounded-md px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex my-7 w-full justify-center rounded-md bg-red-800 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  {state === "create" ? "Create" : "Edit"} Account
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}
export default Modal;