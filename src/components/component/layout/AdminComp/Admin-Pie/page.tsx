"use client";

import Image from "next/image";
import React from "react";
import PieChart from "@/components/PieChart";

const Static = () => {
  return (
        <div className='w-145 p-4 mx-auto  my-auto'>
          <h1 className='text-3xl font-bold text-center '>
            Hasil Voting Pemilihan Ketua Nevtik
          </h1>
          <h1 className='text-3xl font-bold text-center mt-4'>
            2025/2026
          </h1>
          <PieChart />
    </div>
  );
};

export default Static;
