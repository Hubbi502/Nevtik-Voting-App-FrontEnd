import Image from "next/image";

interface Props {
  text: string;
}

export default function User(props: Props) {
  return (
    <div className='flex items-center gap-2 mr-5'>
      <h1 className='text-2xl text-white'>{props.text}</h1>
      <Image src={"/assets/user.svg"} width={60} height={60} alt='user' />
    </div>
  );
}
