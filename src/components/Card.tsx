import React from "react"

type BiodataCardProps = {
  name: string;
  className: string;
  division: string;
};

const BiodataCard: React.FC<BiodataCardProps> = ({
  name,
  className,
  division,
}) => {
  return (
    <div className='w-5xl mt-5 bg-white rounded-lg shadow-lg overflow-hidden'>
      <div className='bg-red-600 p-4 text-white'>
        <h2 className='text-lg font-semibold'>Kandidat Ketua NEVTIK</h2>
      </div>
      <div className='p-4'>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Nama Lengkap
            </label>
            <p className='mt-1 text-gray-900 bg-zinc-50 rounded-sm p-2'>
              {name}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Kelas
            </label>
            <p className='mt-1 text-gray-900 bg-zinc-50 rounded-sm p-2'>
              {className}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Divisi
            </label>
            <p className='mt-1 text-gray-900 bg-zinc-50 rounded-sm p-2'>
              {division}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataCard;