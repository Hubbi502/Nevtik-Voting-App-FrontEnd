"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { User } from "@/lib/types";
import { Jersey_10 } from "next/font/google";
import { useEffect, useState } from "react";
import Modal from "./modal";

import { authApi } from "@/lib/api";
const jersey10 = Jersey_10({
  weight: "400",
  subsets: ["latin"],
});

const DropdownButton = ({
  title,
  items,
  currentPage,
  onChange,
}: {
  title: string;
  items: string[];
  currentPage: number;
  onChange?: (selected: string) => void;
}) => {
  const [selected, setSelected] = useState("");
  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
    console.log("Selected:", selected);
  }, [selected]);
  return (
    <div className="relative mx-2 inline-block text-left text-black">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="flex items-center justify-between border-none duration-200 ease-in cursor-pointer bg-white border border-black px-6 py-2 rounded-2xl shadow-sm hover:bg-gray-100 w-40 appearance-none"
      >
        <option value="" disabled hidden>
          {title}
        </option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500">
        ▼
      </div>
    </div>
  );
};

const getPaginationRange = (currentPage: number, totalPages: number) => {
  const delta = 2;
  const range: (number | string)[] = [];

  for (let i: number = 1; i <= totalPages; i++) {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [selectedDivisi, setSelectedDivisi] = useState("all");
  const [selectedVoteStatus, setSelectedVoteStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    open: boolean;
    state: "edit" | "create";
  }>({ open: false, state: "create" });

  const USERS_PER_PAGE = 5;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const fetchUsers = async (
    page: number,
    selectedDivisi: string = "all",
    isVoted: string = "all",
    USERS_PER_PAGE: number = 5,
    search: string = ""
  ) => {
    try {
      console.log("Fetching page:", page);

      const data = await authApi.getUsers(
        page,
        USERS_PER_PAGE,
        isVoted,
        selectedDivisi,
        search
      );

      const usersData = Array.isArray(data.data) ? data.data : [];

      if (sortConfig && usersData.length > 0) {
        usersData.sort((a, b) => {
          const key = sortConfig.key as keyof User;
          if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
          if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      console.log(usersData);

      setUsers(usersData);
      setTotalPages(
        data.totalPages || Math.ceil((data.total ?? 0) / USERS_PER_PAGE)
      );
      setCurrentPage(data.currentPage || page);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(currentPage, selectedDivisi, selectedVoteStatus, USERS_PER_PAGE, searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentPage, selectedDivisi, selectedVoteStatus]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      console.log("Changing to page:", newPage);
      setCurrentPage(newPage);
    }
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  interface formDataInterface {
    name: string;
    email: string;
    divisi: string;
    password: string;
    role: "USER" | "ADMIN";
  }

  const handleSubmitCreate = async (formData: formDataInterface) => {
    try {
      const res = await authApi.addUser(formData);
      if (res.message === "User berhasil ditambahkan") {
        await fetchUsers(currentPage);
        setIsModalOpen({ open: false, state: "create" });
      } else {
        alert("Error creating user: " + res.message);
      }
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create user.");
    }
  };

  const handleSubmitEdit = async (
    userId: string,
    formData: formDataInterface
  ) => {
    try {
      const res = await authApi.editUser(userId, formData);
      if (res.message === "success") {
        await fetchUsers(currentPage);
        setIsModalOpen({ open: false, state: "edit" });
      } else {
        alert("Error editing user: " + res.message);
      }
    } catch (error) {
      console.error("Edit error:", error);
      alert("Failed to edit user.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await authApi.deleteUser(id);
        if (res.message === "success") {
          await fetchUsers(currentPage);
        } else {
          alert("Error deleting user: " + res.message);
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete user.");
      }
    }
  };

  useEffect(() => {
    const divisi = selectedDivisi || "all";
    const voteStatus = selectedVoteStatus || "all";

    fetchUsers(currentPage, divisi, voteStatus);
  }, [currentPage, selectedDivisi, selectedVoteStatus]);

  return (
    <div className="bg-[#F8F2DE] w-full mx-36 mt-[120px] p-4  rounded-3xl">
      <div className="pt-2 w-full px-2">
        <p className="text-2xl text-black font-bold pl-12">Users</p>
        <div className="flex w-full gap-4 ">
          <div className="flex w-7xl ">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="text-black bg-white mt-8 w-full p-3 border border-black rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between ml-12 mt-9">
              <DropdownButton
                title="Status"
                items={["Vote", "Not Vote"]}
                currentPage={currentPage}
                onChange={(value) => {
                  console.log(value);
                  setSelectedVoteStatus(value);
                }}
              />
              <DropdownButton
                title="Filter"
                items={["ITNSA", "Web Development", "Cyber Security"]}
                currentPage={currentPage}
                onChange={(value) => {
                  console.log(value);
                  setSelectedDivisi(value);
                }}
              />
              <a
                onClick={() => {
                  setIsModalOpen({ open: !isModalOpen.open, state: "create" });
                }}
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
          <div className="grid grid-cols-6 bg-white/85 text-black p-3 py-2 rounded-lg font-semibold">
            <span>No</span>
            <span
              onClick={() => handleSort("name")}
              className="cursor-pointer hover:text-red-600"
            >
              Nama{" "}
              {sortConfig?.key === "name" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </span>
            <span
              onClick={() => handleSort("email")}
              className="cursor-pointer hover:text-red-600"
            >
              Email{" "}
              {sortConfig?.key === "email" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </span>
            <span
              onClick={() => handleSort("divisi")}
              className="cursor-pointer hover:text-red-600"
            >
              Divisions{" "}
              {sortConfig?.key === "divisi" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </span>
            <span
              onClick={() => handleSort("vote")}
              className="cursor-pointer hover:text-red-600"
            >
              Vote Status{" "}
              {sortConfig?.key === "vote" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </span>
            <span>Action</span>
          </div>

          <div className="space-y-5 mt-6 text-black">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <>
                {(!users || users.length === 0) ? (
                  <div>No users found</div>
                ) : (
                  users.map((user, index) => 
                  // {console.log(user)}
                    (
                    <div
                      key={user.id}
                      className="grid grid-cols-6 bg-white px-3 py-6 rounded-lg shadow-lg items-center"
                    >
                      <span className="font-semibold">
                        {(currentPage - 1) * USERS_PER_PAGE + index + 1}.
                      </span>
                      <span className="font-semibold">{user.name}</span>
                      <span>{user.email}</span>
                      <span>{user.divisi}</span>
                      <span>
                        {(user.vote === null ) ? (
                          <div className="h-8 w-8 bg-red-500 rounded-3xl "></div>
                        ) : (
                          <div className="h-8 w-8 bg-green-500 rounded-3xl "></div>
                        )}
                      </span>
                      <div className="pl-3 text-red-800 flex flex-row gap-5">
                        <div>
                          <button onClick={() => handleDelete(user.id)}>
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
                        <div>
                          <button
                            onClick={() => {
                              setIsModalOpen({ open: true, state: "edit" });
                              setUserData(user);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={30}
                              height={30}
                              viewBox="0 0 640 512"
                            >
                              <path
                                fill="currentColor"
                                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4 6.8-3.4-14-2.6-21.3l6.8-60.9l1.2-11.1l7.9-7.9l77.3-77.3c-24.5-27.7-60-45.5m45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8l137.9-137.9l-71.7-71.7zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8l-4.1 4.1l71.8 71.7l41.8-41.8c9.3-9.4 9.3-24.5 0-33.9"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )

                )
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
      {isModalOpen.open && isModalOpen.state === "create" ? (
        <Modal
          onCloseButton={() => setIsModalOpen({ open: false, state: "create" })}
          state="create"
          onSubmit={handleSubmitCreate}
        />
      ) : isModalOpen.open && isModalOpen.state === "edit" ? (
        <Modal
          onCloseButton={() => setIsModalOpen({ open: false, state: "edit" })}
          state="edit"
          onSubmit={(formData) => {
            if (userData?.id) {
              handleSubmitEdit(userData.id, formData);
            } else {
              alert("User ID is undefined. Cannot edit user.");
            }
          }}
          userData={userData}
        />
      ) : (
        ""
      )}
    </div>
  );
}
