import Image from "next/image";
import { Bebas_Neue, Roboto, Playfair_Display } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const roboto = Roboto({ subsets: ["latin"], weight: "700" }); // Bold weight for "SELAMAT"
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: "400" }); // Regular weight for "Atas Terpilihnya"

export default function CongratsPage () {

  return (
    <>
        <div className=" absolute top-44 ">
            <div className="relative left-48">
                <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.13525 39.75L11.5207 25.1146L0.166504 15.2708L15.1665 13.9688L20.9998 0.166668L26.8332 13.9688L41.8332 15.2708L30.479 25.1146L33.8644 39.75L20.9998 31.9896L8.13525 39.75Z" fill="#E31F1F"/>
                </svg>
                <svg width="42" height="40" className="ml-36 mt-[28rem]" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.13525 39.75L11.5207 25.1146L0.166504 15.2708L15.1665 13.9688L20.9998 0.166668L26.8332 13.9688L41.8332 15.2708L30.479 25.1146L33.8644 39.75L20.9998 31.9896L8.13525 39.75Z" fill="#E31F1F"/>
                </svg>
            </div>
        </div>
        <div className=" absolute top-44 ">
            <div className="relative left-[105rem]">
                <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.13525 39.75L11.5207 25.1146L0.166504 15.2708L15.1665 13.9688L20.9998 0.166668L26.8332 13.9688L41.8332 15.2708L30.479 25.1146L33.8644 39.75L20.9998 31.9896L8.13525 39.75Z" fill="#E31F1F"/>
                </svg>
                <svg width="42" height="40" className="-ml-36 mt-[28rem]" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.13525 39.75L11.5207 25.1146L0.166504 15.2708L15.1665 13.9688L20.9998 0.166668L26.8332 13.9688L41.8332 15.2708L30.479 25.1146L33.8644 39.75L20.9998 31.9896L8.13525 39.75Z" fill="#E31F1F"/>
                </svg>
            </div>
        </div>
        
            <div className=" absolute left-[53rem]  top-25">
                <div className="flex items-center text-center flex-col">
                     <img src="/logo-rmv.png" alt="" width={60} height={60} />
                     <div className="flex mt-2 flex-col text-center">
                        <span className={`text-5xl font-bold ${roboto.className}`}>
                            SELAMAT
                        </span>
                        <span className={`text-2xl font-light  ${playfairDisplay.className}`}>
                            Atas Terpilihnya
                        </span>
                     </div>
                </div>
            </div>
        <div className="flex justify-center items-center w-full bg-[#F8F2DE] h-screen">
            <div className="p-12 w-[36rem] text-center top-96 absolute">
                <span className={`text-8xl font-mono font-bold absolute z-3  bottom-2 left-8 ${bebasNeue.className}`} style={{ transform: "skewX(10deg)" }}>
                    Congratulation
                </span>
                <span 
                    className={`text-8xl font-mono font-bold text-white/0 absolute -bottom-4 left-7 text-shadow text-outline z-6 ${bebasNeue.className}`}  
                    style={{ WebkitTextStroke: "1px black", transform: "skewX(10deg)" }}
                >
                    Congratulation
                </span>
            </div>
            <div className="relative -left-2 z-10 -top-4 flex">
                <Image src="/pino.png" alt="confetti" width={450} height={450} className="mx-auto" />
            </div>
            <div className="bg-[#C21010] w-full h-44 rounded-tr-[6rem] rounded-tl-[6rem] absolute bottom-0 left-0">
            </div>
            <div className="relative">
            </div>
        </div>

        <div className="flex justify-center items-center relative">
            <div className="absolute bottom-40 z-10 h-">
                <svg width="1106" height="119" viewBox="0 0 1106 119" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 0H1106L1053 61L1106 119H0L71.5 61L0 0Z" fill="#D84040" />
                    <text x="50%" y="35%" className="" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="44" fontFamily="Mono" fontWeight="bold">
                        Advino Rahmandika Tahir
                    </text>
                    <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontFamily="Mono" fontWeight="normal">
                        Division
                    </text>
                </svg>
            </div>
            <div className="relative bottom-[115px] flex justify-center items-center flex-row top">
                <div className="absolute border-1 rounded-3xl px-12 py-3 w-[30rem] bg-[#DCFCE7] flex justify-around border-black/25 text-center">
                    <div className=" ">
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26 1L32.9042 5.79L41.4513 5.775L44.0761 13.51L51 18.275L48.3437 26L51 33.725L44.0761 38.49L41.4513 46.225L32.9042 46.21L26 51L19.0958 46.21L10.5487 46.225L7.92393 38.49L1 33.725L3.65627 26L1 18.275L7.92393 13.51L10.5487 5.775L19.0958 5.79L26 1Z" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.7993 26L23.371 32.25L36.5144 19.75" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-[#16A34A]/75 text-[20px] bg-[#DCFCE7] pl-3 justify-center items-center flex text-center">
                        Terpilih dengan 100 suara (56.8%)
                    </div>
                </div>
            </div>
            <div className="absolute bottom-10 left-24">
                <div className="p-4 px-12 rounded-xl hover:bg-white hover:text-black ease-in duration-300 cursor-pointer border-1 border-white bg-[#E64848] text-white">
                    <a href="/" className="text-xl font-mono">Kembali</a>
                </div>
            </div>
        </div>
    </>
  );
};