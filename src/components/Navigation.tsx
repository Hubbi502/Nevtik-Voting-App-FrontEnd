import Image from "next/image";
import User from "./User";

export default function Menu() {
  return (
    <div className='bg-red-600 flex py-3 rounded-b-2xl shadow-black shadow-sm items-center justify-between'>
      <div className='flex items-center gap-2 ml-5'>
        <Image src={"/assets/logo.svg"} width={60} height={60} alt='logo' />
        <h1 className='text-3xl text-white font-bold'>Pemilu Nevtik 2024</h1>
      </div>
      <User text="Admin"/>
    </div>
  );
}
