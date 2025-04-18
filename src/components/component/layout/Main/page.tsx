export default function MainComp() {
  return (
      <>
      <div className="bg-[#F8F2DE] w-full h-screen relative flex flex-col">
          <div className="absolute left-30 top-1/3 text-black">
            <h1 className="font-semibold text-6xl">Selamat Datang, Player</h1>
            <p 
              className="my-3 text-[32px] font-light" 
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Pilihanmu akan menentukan masa depan
            </p>
            <p 
              className="mt-5 text-4xl font-light tracking-wider" 
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Siap buat memilih ketua Nevtik <br />Berikutnya?
            </p>
            <div className="mt-10">
              <a 
                href="/signIn" 
                className="w-full h-full p-4 bg-red-500 rounded-xl text-white text-2xl hover:bg-amber-50 hover:text-black ease-in duration-300" 
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Mulai Voting
              </a>   
            </div>
            <div className="absolute -top-1/2 -right-10/6 ">
              <img src="/banner-img.png" alt="" width={700} height={700}/>
            </div>         
          </div>
          <div className="absolute right-6 -bottom-0 ">
            <img src="/logo-rmv.png" alt="" width={50} height={50} />
          </div>  
      </div>
      </>
  )
}