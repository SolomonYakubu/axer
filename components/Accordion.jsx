import { useState } from "react";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
export default function FaqComponent(props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="flex flex-col p-3 border-b text-gray-light cursor-pointer"
    >
      <div className="flex flex-row items-center">
        <p
          className={`flex-auto  ${
            expanded ? "text-gray-dark font-black" : "font-normal"
          }`}
        >
          {props.title}
        </p>
        {(expanded && <AiOutlineClose size={20} />) || (
          <AiOutlineDown size={20} />
        )}
      </div>
      <div
        className={`transition-max-height duration-700 ease-in-out overflow-hidden ${
          expanded ? " max-h-60" : "max-h-0"
        }`}
      >
        <p className=" font-light">{props.description}</p>
      </div>
    </div>
  );
}
