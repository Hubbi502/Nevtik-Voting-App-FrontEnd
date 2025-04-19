"use client";

import Countdown from "@/components/Countdown";
import { voteApi } from "@/lib/api";
import { useCandidate } from "@/lib/hooks/useCandidate";
import Image from "next/image";
import { useState } from "react";

import { Candidate } from "@/lib/types";




export default function VoteCard() {
  const { candidates, loading, error } = useCandidate() as { candidates: Candidate[]; loading: boolean; error: any };
  const candidatesRaw: Candidate[] = candidates.map((candidate, index) => ({
    id: candidate.id,
    name: candidate.name,
    image: candidate.image,
    divisi: candidate.divisi,
    vision: candidate.vision,
    mission: candidate.mission,
    kelas: candidate.kelas,
    jurusan: candidate.jurusan,
    href: `/Voting-Page/candidates?page=${index+1}`,
  }));
  console.log(candidatesRaw);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const openModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const confirmYes = async () => {
    if (!selectedCandidate) return;
    try {
      const response = await voteApi.castVote(selectedCandidate.id);
      if(response.message !== "success"){ 
        alert("Gagal melakukan vote");
        console.log(response)
        return;
      }
      window.location.href = "/end"; // Adjust the route based on your setup
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center flex-col bg-[#F8F2DE]">
      <h1 className="text-4xl font-bold pt-20 text-center ">
        Ayo Vote! Siapa Pemimpin Nevtik Selanjutnya!
      </h1>
      <p className="font-thin mt-2 mb-4">Pilih kandidat terbaik untuk memimpin organisasi kita ke depan</p>

      {/* Candidate Cards */}
      <div className="bg-[#FFFFFF] shadow-2xl flex flex-col">
        <div className="flex py-12 px-12  justify-center items-center mt-4 gap-20">
          {candidatesRaw.map((candidate, index) => (
            <CandidateCard key={index} candidate={candidate} openModal={openModal} />
          ))}
          
        </div>
        <div className="px-12 items-center flex justify-between mb-3">
          <p>Total Votes : 12345</p>
          <Countdown targetDate="2025-05-01T00:00:00" />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCandidate && (
        <div className="fixed inset-0 flex z-20 justify-center items-center bg-black/25 bg-opacity-50">
          <div className="bg-white w-1/2 h-1/2 flex flex-col justify-center px-12 py-8 rounded-lg shadow-lg text-center">
            <div className="text-center flex justify-center items-center mb-12">
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35C70 54.33 54.33 70 35 70C15.67 70 0 54.33 0 35Z" fill="#FEF2F2"/>
                  <path d="M34.5 53.25C44.8553 53.25 53.25 44.8553 53.25 34.5C53.25 24.1447 44.8553 15.75 34.5 15.75C24.1447 15.75 15.75 24.1447 15.75 34.5C15.75 44.8553 24.1447 53.25 34.5 53.25Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M34.5 27V34.5" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M34.5 42H34.5188" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p className="text-3xl font-semibold">
              Apakah Anda Yakin Ingin memilih <br /> Kandidat Ini?
            </p>
            <p className="text-lg font-thin mb-10">Note: Jangan sampai anda salah pilih</p>
            <div className="flex justify-center gap-12 mt-2">
              <button onClick={confirmYes} className="bg-[#10B981] hover:bg-white border  hover:text-black duration-300 ease-in text-white px-18 py-2 rounded-xl cursor-pointer">
                Iya
              </button>
              <button onClick={closeModal} className="bg-[#E31F1F]  hover:bg-white border  hover:text-black duration-300 ease-in text-white px-18 py-2 rounded-xl cursor-pointer">
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function CandidateCard({ candidate, openModal }: { candidate: Candidate; openModal: (candidate: Candidate) => void }) {
  return (
    <>   
      <div className=" w-96 text-center flex flex-col flex-wrap">
        <div className="bg-[#E64848] rounded-tr-lg rounded-tl-lg flex justify-between p-7 py-4 text-white">
          <div className="flex justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24" className="text-[#f7cccc] "><path fill="currentColor" d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4"></path></svg>
            <h1 className="text-xl font-semibold  font-sans text-white pl-3 ">{candidate.name}</h1>
          </div>
          <span className="text-[18px] font-thin text-white">{candidate.divisi}</span>
        </div>
        <div className=" text-center flex-wrap flex-col justify-center ">
            <Image src={candidate.image || "/pino.png"} alt={candidate.name} width={300} height={300} className="w-full h-[387px] object-cover object-center mb-9 rounded-br-lg rounded-bl-lg"/>
              <div className="relative">
                 <div className="absolute bg-white cursor-pointer border hover:rotate-180  duration-300 ease-in-out border-black/25 p-2 rounded-full -top-24 right-2 ">
                    <a href={candidate.href} className=""><svg width="23" height="20" viewBox="0 0 23 20" fill="none" className="" xmlns="http://www.w3.org/2000/svg">
                      <path className="" d="M22.0899 18.9832C22.6391 18.9254 23.0375 18.4333 22.9797 17.884L22.0378 8.93348C21.98 8.38423 21.4879 7.98583 20.9386 8.04363C20.3894 8.10143 19.991 8.59355 20.0488 9.1428L20.8861 17.0989L12.93 17.9362C12.3807 17.994 11.9823 18.4861 12.0401 19.0353C12.098 19.5846 12.5901 19.983 13.1393 19.9252L22.0899 18.9832ZM0.370784 1.77711L21.356 18.7659L22.6144 17.2115L1.62922 0.222647L0.370784 1.77711Z" fill="black"/>
                      </svg>
                    </a>
                 </div>
              </div>
        </div>
          <div className=" items-center  ">
            <button
              onClick={() => openModal(candidate)}
              className="rounded-lg hover:bg-white  hover:text-black duration-300 border right-1/4 bg-red-800 w-full py-2 text-white cursor-pointer"
            >
              Vote Me
            </button>
          </div>
        </div>
    </>   
    
  );
}