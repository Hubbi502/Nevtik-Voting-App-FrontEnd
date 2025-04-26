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
      <div className="bg-[#F8F2DE] w-full h-screen   px-4 ">
          <div className="text-black flex flex-row pt-44 align-center justify-around ">
            <div className="flex-col justify-center flex">
              <h1 className="font-semibold text-5xl   ">Selamat Datang, {user?.name}</h1>
              <p 
                className="my-3 text-[20px]  font-light  " 
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Pilihanmu akan menentukan masa depan
              </p>
              <p 
                className="mt-5 text-xl  font-light tracking-wider  " 
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Siap buat memilih ketua Nevtik <br />Berikutnya?
              </p>
              <div className="mt-10  ">
                <a 
                  href="/Voting-Page" 
                  className=" px-5 py-3  bg-red-500 rounded-xl text-white text-lg  hover:bg-amber-50 hover:text-black ease-in duration-300 " 
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Mulai Voting
                </a>   
              </div>
            </div>
            <div className="  ">
            <img 
              src="/banner-img.png" 
              alt="" 
              className="w-[600px] " 
            />
            </div>
          </div>
      </div>
      </>
  )
}