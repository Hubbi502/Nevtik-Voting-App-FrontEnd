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

interface User {
  id: string;
  name: string;
  email: string;
  divisi: string;
}

interface ApiResponse {
  message: string;
  data: User[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const DropdownButton = ({ title, items }: { title: string; items: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mx-2 inline-block text-left text-black ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border-none duration-200 ease-in cursor-pointer bg-white border  border-black px-6 py-2 rounded-2xl shadow-sm hover:bg-gray-100 w-40">
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
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }

  return range;
};

export default function AdminTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const USERS_PER_PAGE = 6;

  const fetchUsers = async (page: number) => {
    try {
      console.log('Fetching page:', page); 
      const response = await fetch(`http://localhost:5000/auth/users?page=${page}&limit=${USERS_PER_PAGE}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data: ApiResponse = await response.json();
      console.log('API Response:', data); 

      if (response.ok && data.message === "success") {
        setUsers(data.data);
        setTotalPages(data.totalPages || Math.ceil(data.total / USERS_PER_PAGE));
        setCurrentPage(data.currentPage || page);
      } else {
        throw new Error(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load users');
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
      console.log('Changing to page:', newPage); // Debug log
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
                <DropdownButton title="Status" items={["Vote", "Not Vote"]}  />
                <DropdownButton title="Filter" items={["ITNSA", "Web Developer", "Cyber Security"]} />
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
                    <div key={user.id} className="grid grid-cols-5 bg-white px-3 py-6 rounded-lg shadow-lg items-center">
                      <span className="font-semibold">{((currentPage - 1) * USERS_PER_PAGE) + index + 1}.</span>
                      <span className="font-semibold">{user.name}</span>
                      <span>{user.email}</span>
                      <span>{user.divisi}</span>
                      <div className="pl-3 text-red-800">
                        <a href="">
                          <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7zm4 12H8v-9h2zm6 0h-2v-9h2zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
                          </svg>
                        </a>
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
                          className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {getPaginationRange(currentPage, totalPages).map((pageNum, index) => (
                        <PaginationItem key={index}>
                          {pageNum === '...' ? (
                            <span className="px-4 py-2">...</span>
                          ) : (
                            <PaginationLink
                              isActive={currentPage === pageNum}
                              onClick={() => handlePageChange(pageNum as number)}
                            >
                              {pageNum}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
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
    </div>
  );
}