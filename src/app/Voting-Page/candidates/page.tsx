'use client';

import BiodataCard from "@/components/Card";
import Menu from "@/components/Navigation";
import Pagination from "@/components/Pagination";
import ProfileCard from "@/components/Profile";
import Tabs from "@/components/Tab";
import { useCandidate } from "@/lib/hooks/useCandidate";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

const CandidatesPage = () => {
  const { candidates, loading, error } = useCandidate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = candidates.length;
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  
  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  },[])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Get current candidate based on page
  const currentCandidate = candidates[currentPage - 1];

  if (!currentCandidate) {
    return <div>No candidate found</div>;
  }

  return (
    <div className='h-screen'>
      <Menu />
      <div className='flex mt-12 items-center gap-30 justify-center '>
        <div>
          <BiodataCard
            name={currentCandidate.name}
            className={`${currentCandidate.kelas} ${currentCandidate.jurusan}`}
            division={currentCandidate.divisi}
          />
          <Tabs
            visi={Array.isArray(currentCandidate.vision) ? currentCandidate.vision.join('\n') : currentCandidate.vision}
            misi={Array.isArray(currentCandidate.mission) ? currentCandidate.mission.join('\n') : currentCandidate.mission}
          />
        </div>
        <div className='mt-7'>
          <ProfileCard
            imageUrl={currentCandidate.image || '/assets/fahri.svg'}
            name={currentCandidate.name}
            className={`${currentCandidate.kelas} ${currentCandidate.jurusan}`}
            division={currentCandidate.divisi}
          />
        </div>
      </div>
      <div className='place-items-center mt-12'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CandidatesPage;