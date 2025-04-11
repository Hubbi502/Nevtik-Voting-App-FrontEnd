import React, { useState } from "react";

type TabProps = {
  visi: string;
  misi: string;
};

const Tabs: React.FC<TabProps> = ({ visi, misi }) => {
  const [activeTab, setActiveTab] = useState<"visi" | "misi">("visi");

  return (
    <div className='w-5xl h-full min-h-96 mt-5 bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='flex border-b'>
        <button
          onClick={() => setActiveTab("visi")}
          className={`flex-1 py-2 text-center font-semibold ${
            activeTab === "visi"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-500"
          }`}
        >
          VISI
        </button>
        <button
          onClick={() => setActiveTab("misi")}
          className={`flex-1 py-2 text-center font-semibold ${
            activeTab === "misi"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-500"
          }`}
        >
          MISI
        </button>
      </div>

      <div className='p-4'>
        {activeTab === "visi" && <p className='text-gray-700'>{visi}</p>}
        {activeTab === "misi" && <p className='text-gray-700'>{misi}</p>}
      </div>
    </div>
  );
};

export default Tabs;
