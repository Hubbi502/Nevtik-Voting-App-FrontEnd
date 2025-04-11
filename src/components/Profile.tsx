import React from "react";

type ProfileCardProps = {
  imageUrl: string;
  name: string;
  className: string;
  division: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  imageUrl,
  name,
  className,
  division,
}) => {
  return (
    <div className='w-full h-[45rem] bg-white rounded-lg shadow-lg overflow-hidden'>
      <img
        src={imageUrl}
        alt='Profile picture'
        width={500}
        height={500}
        className=' object-cover '
      />
      <div className='mx-12 my-5'>
        <h2 className='text-4xl font-semibold text-gray-900'>{name}</h2>
        <p className='text-gray-600 mt-6 font-semibold'>Kelas : {className}</p>
        <p className='text-gray-600 font-semibold'>Divisi  : {division}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
