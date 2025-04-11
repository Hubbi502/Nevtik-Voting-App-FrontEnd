export default function AdminRow() {
    return (
        <>
        <div className="w-1/6 items-center py-12 flex flex-col h-[100vh] border-r-2 border-black text-black h-100vh relative px-32">
           <div className="absolute top-[90px] mt-6 ">
                <div className="flex flex-col cursor-pointer  ">
                    <p className="text-2xl font-semibold pl-4 pb-2">List User</p>
                    <div className=" flex items-center px-6 py-2 border-1 bg-[#D84040] rounded-xl text-white text-[20px] hover:bg-amber-50 hover:text-black ease-in duration-300 hover:border-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" className=""><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m0 0a8.95 8.95 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.95 8.95 0 0 0 12 21m3-11a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path></svg>
                        <a href="/Admin/AdminTable" className="px-12 text-text-center items-center" >Users</a>
                    </div>
                </div>
                <div className="flex flex-col mt-6 cursor-pointer">
                    <p className="text-2xl font-semibold pl-3 pb-2">Hasil Voting</p>
                    <div className=" flex items-center px-6 py-2 border-1 bg-[#D84040] rounded-xl text-white text-[20px] hover:bg-amber-50 hover:text-black ease-in duration-300 hover:border-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="currentColor" d="M4 2v18h18v2H2V2zm17.914 6L15.5 14.414l-4-4l-5 5L5.086 14L11.5 7.586l4 4l5-5z"></path></svg>
                        <a href="/Admin/AdminChart" className="px-12 text-text-center items-center" >Hasil</a>
                    </div>
                </div>
                <div className="flex flex-col mt-6 cursor-pointer">
                    <p className="text-2xl font-semibold pl-3 pb-2">Lihat Pemenang</p>
                    <div className=" flex items-center px-6 py-2 border-1 bg-[#D84040] rounded-xl text-white text-[20px] hover:bg-amber-50 hover:text-black ease-in duration-300 hover:border-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 256 256"><path fill="currentColor" d="M111.49 52.63a15.8 15.8 0 0 0-26 5.77L33 202.78A15.83 15.83 0 0 0 47.76 224a16 16 0 0 0 5.46-1l144.37-52.5a15.8 15.8 0 0 0 5.78-26Zm-8.33 135.21l-35-35l13.16-36.21l58.05 58.05Zm-55 20l14-38.41l24.45 24.45ZM156 168.64L87.36 100l13-35.87l91.43 91.43ZM160 72a37.8 37.8 0 0 1 3.84-15.58C169.14 45.83 179.14 40 192 40c6.7 0 11-2.29 13.65-7.21a22 22 0 0 0 2.35-8.85a8 8 0 0 1 16 .06c0 12.86-8.52 32-32 32c-6.7 0-11 2.29-13.65 7.21a22 22 0 0 0-2.35 8.85a8 8 0 0 1-16-.06m-24-32V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m101.66 82.34a8 8 0 1 1-11.32 11.31l-16-16a8 8 0 0 1 11.32-11.32Zm4.87-42.75l-24 8a8 8 0 0 1-5.06-15.18l24-8a8 8 0 0 1 5.06 15.18"></path></svg>
                        <a href="/Congrats" className="px-12 text-text-center items-center" >Winner</a>
                    </div>
                </div>
           </div>
           <div className="absolute bottom-0 mb-6">
            <a href="#" className="border-1 border-black rounded-3xl px-12 bg-white hover:bg-black hover:text-white duration-500 ease-in-out p-3">Log Out</a>
           </div>
        </div>

        </>
    )
}