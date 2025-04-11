interface Props {
  text: string;
  className?: string;
  type?: "primary" | "secondary";
}

export default function Button(props: Props) {
  return (
    <button
      className={`px-10 py-2 bg-red-600 rounded-2xl text-white text-2xl hover:cursor-pointer
        ${
          props.type === "secondary" &&
          "px-20 py-2 bg-white rounded-2xl text-black border-1 border-black active:bg-red-600 active:text-white"
        }
          ${props.className}
    `}
    >
      {props.text}
    </button>
  );
}
