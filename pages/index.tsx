import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="max-w-[600px] mx-auto pt-4 flex flex-col items-center">
        <h1 className="font-extrabold text-[40px] text-center mb-20">
          WELCOME TO SMART ED
        </h1>
        <Image src="/company.png" width={300} height={300} alt="" />
        <div className="flex flex-col items-center justify-center mt-20">
          <button className="bg-[#F2F2F2] w-[300px] h-[50px] rounded-[10px] text-[#000000] font-bold text-[20px]">
            Continue as a teacher
          </button>
          <button className="bg-[#F2F2F2] w-[300px] h-[50px] rounded-[10px] text-[#000000] font-bold text-[20px] mt-4">
            Continue as a student
          </button>
        </div>
      </div>
    </main>
  );
}
