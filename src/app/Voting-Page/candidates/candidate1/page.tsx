"use client";

import { useState } from "react";
import BiodataCard from "@/components/Card";
import Menu from "@/components/Navigation";
import Tabs from "@/components/Tab";
import ProfileCard from "@/components/Profile";
import Pagination from "@/components/Pagination";
import React, { Suspense } from "react";

const Candidates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen bg-orange-50">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex items-center justify-center"> 
          <div>
            <BiodataCard
              name="John Anderson"
              className="XII RPL 1"
              division="Web Development"
            />
            <Tabs
              visi="menciptakan lingkungan pembelajaran yang inovatif dan inklusif dengan memanfaatkan teknologi modern untuk meningkatkan kualitas pendidikan di sekolah kita"
              misi="biarkan tuhan mau memberi jodoh orang mana, asal jangan orang israel, PAHAM!!!"
            />
          </div>
          <div>
            <ProfileCard
              imageUrl="/assets/fahri.svg"
              name="John Anderson"
              className="XII RPL 1"
              division="Web Development"
            />
          </div>
        </div>
        <div className="place-items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default Candidates;
