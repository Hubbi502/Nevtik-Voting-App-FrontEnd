"use client";
import { useEffect, useState } from "react";
import { authApi } from "@/lib/api";
import { CurrentUser } from "@/lib/types";

export default function MainComp() {
  const [user, setUser] = useState<CurrentUser | null>(null);
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response:CurrentUser = await authApi.getCurrentUser();
                setUser(response);
            } catch (error) {
                console.error("Error checking login status:", error);
                window.location.href = "/signIn";
            }
        };
        checkLoginStatus();
    }, []);
  return (
      <>
      <div className="bg-[#F8F2DE] w-full h-screen  sm:my-auto flex flex-col-reverse sm:flex-row  lg:justify-around items-center px-4 sm:px-0">
          <div className="text-black lg:my-auto mb-44 ">
            <h1 className="font-semibold text-4xl sm:text-6xl text-center sm:text-left">Selamat Datang, {user?.name}</h1>
            <p 
              className="my-3 text-[20px] sm:text-[32px] font-light text-center sm:text-left" 
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Pilihanmu akan menentukan masa depan
            </p>
            <p 
              className="mt-5 text-xl sm:text-4xl font-light tracking-wider text-center sm:text-left" 
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Siap buat memilih ketua Nevtik <br className="hidden sm:block" />Berikutnya?
            </p>
            <div className="mt-10 flex justify-center sm:justify-start">
              <a 
                href="/Voting-Page" 
                className="w-full sm:w-auto h-full p-3 sm:p-4 bg-red-500 rounded-xl text-white text-lg sm:text-2xl hover:bg-amber-50 hover:text-black ease-in duration-300 text-center" 
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Mulai Voting
              </a>   
            </div>
            <div className="mb-12">
            <img 
              src="/banner-img.png" 
              alt="" 
              className="w-[300px] sm:w-[700px] h-auto mx-auto sm:mx-0" 
            />
            </div>
          </div>
      </div>
      </>
  )
}