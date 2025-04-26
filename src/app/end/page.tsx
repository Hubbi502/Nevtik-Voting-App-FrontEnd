"use client";
import Menu from "@/components/Navigation";
import Image from "next/image";
import { authApi } from "@/lib/api";

export default function End() {
  return (
    <div className='h-screen bg-[#F8F2DE]'>
      <Menu />
      <div className='flex  flex-col place-items-center py-52 space-y-3'>
        <Image src={"/assets/logo.svg"} width={200} height={200} alt='logo' />
        <h1 className='text-4xl font-bold'>
          Terima Kasih Telah Menggunakan Hak Suara Anda
        </h1>
        <h2 className='text-xl font-bold'>
          "Setiap suara membawa perubahan. Nevtik terus maju karena Anda!"
        </h2>
        <button onClick={async() => {
          const response = await authApi.logout()
          console.log(response)
          window.location.href = "/signIn"
          }} className='px-30 py-2 mt-12 bg-red-600 rounded-xl hover:bg-black duration-500 ease-in text-white shadow-black shadow-sm text-2xl hover:cursor-pointer'>
          Kembali
        </button>
      </div>
    </div>
  );
}
