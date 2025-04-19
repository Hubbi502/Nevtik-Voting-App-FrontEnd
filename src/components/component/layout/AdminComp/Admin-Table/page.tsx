"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { User } from "@/lib/types";
import type { ApiResponseUsers } from "@/lib/api/config";
import { Jersey_10 } from "next/font/google";

import { authApi } from "@/lib/api";
const jersey10 = Jersey_10({
  weight: "400",
  subsets: ["latin"],
});

const DropdownButton = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mx-2 inline-block text-left text-black ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border-none duration-200 ease-in cursor-pointer bg-white border  border-black px-6 py-2 rounded-2xl shadow-sm hover:bg-gray-100 w-40"
      >
        {title}
        <Menu className="w-5 h-5 text-red-500 ml-2 " />
      </button>

      {isOpen && (
        <div className="absolute left-0 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
              onClick={() => setIsOpen(false)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getPaginationRange = (currentPage: number, totalPages: number) => {
  const delta = 2;
  const range: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return range;
};

export default function AdminTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const USERS_PER_PAGE = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    divisi: string;
    password: string;
    role: "USER" | "ADMIN";
  }>({
    name: "",
    email: "",
    divisi: "",
    password: "",
    role: "USER",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    const res = await authApi.addUser(formData);
    // console.log("Create user response:", formData);
      if (res.message === "User berhasil ditambahkan") {
        fetchUsers(currentPage); 
      } else {
        alert("Error creating user: " + res.message);
      }
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create user.");
    }
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchUsers = async (page: number) => {
    try {
      console.log("Fetching page:", page);

      const data: ApiResponseUsers<User[]> = await authApi.getUsers(
        page,
        USERS_PER_PAGE
      );
      console.log("API Response:", data);

      if (data.message === "success") {
        setUsers(data.data);
        setTotalPages(
          data.totalPages || Math.ceil((data.total ?? 0) / USERS_PER_PAGE)
        );
        setCurrentPage(data.currentPage || page);
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Create array of page numbers safely
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      console.log("Changing to page:", newPage); // Debug log
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-[#F8F2DE] w-full mx-36 mt-[120px] p-4  rounded-3xl">
      <div className="pt-2 w-full px-2">
        <p className="text-2xl text-black font-bold pl-12">Users</p>
        <div className="flex w-full gap-4 ">
          <div className="flex w-7xl ">
            <input
              type="text"
              placeholder="Search..."
              className="text-black bg-white mt-8 w-full p-3 border border-black rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between ml-12 mt-9">
              <DropdownButton title="Status" items={["Vote", "Not Vote"]} />
              <DropdownButton
                title="Filter"
                items={["ITNSA", "Web Developer", "Cyber Security"]}
              />
              <a
                onClick={handleModalToggle}
                className="rounded-full p-2 hover:bg-black hover:text-white duration-300 ease-in mx-4 bg-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  height={30}
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M8 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0 2a6 6 0 0 1 6 6H2a6 6 0 0 1 6-6m8-4a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="container pt-6 px-2">
          <div className="grid grid-cols-5 bg-white/85 text-black p-3 py-2 rounded-lg font-semibold">
            <span>No</span>
            <span>Nama</span>
            <span>Email</span>
            <span>Divisions</span>
            <span>Action</span>
          </div>

          <div className="space-y-5 mt-6 text-black">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <>
                {users.length === 0 ? (
                  <div>No users found</div>
                ) : (
                  users.map((user, index) => (
                    <div
                      key={user.id}
                      className="grid grid-cols-5 bg-white px-3 py-6 rounded-lg shadow-lg items-center"
                    >
                      <span className="font-semibold">
                        {(currentPage - 1) * USERS_PER_PAGE + index + 1}.
                      </span>
                      <span className="font-semibold">{user.name}</span>
                      <span>{user.email}</span>
                      <span>{user.divisi}</span>
                      <div className="pl-3 text-red-800">
                        <button onClick={() => console.log("Delete user", user.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            height={30}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7zm4 12H8v-9h2zm6 0h-2v-9h2zm.618-15L15 2H9L7.382 4H3v2h18V4z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={
                            currentPage <= 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {getPaginationRange(currentPage, totalPages).map(
                        (pageNum, index) => (
                          <PaginationItem key={index}>
                            {pageNum === "..." ? (
                              <span className="px-4 py-2">...</span>
                            ) : (
                              <PaginationLink
                                isActive={currentPage === pageNum}
                                onClick={() =>
                                  handlePageChange(pageNum as number)
                                }
                              >
                                {pageNum}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={
                            currentPage >= totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* new user modal*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/25 bg-opacity-50 z-50">
          <div className="bg-[#FFFDE3] p-6 rounded-lg shadow-lg w-1/3">
            <div className="relative mb-12">
              <button
                onClick={() => setIsModalOpen(false)}
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
                Create Account
              </h2>
            </div>
            <form className="px-12 py-4" onSubmit={handleSubmit}>
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
                    <option value="" disabled selected>
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
                    required
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
