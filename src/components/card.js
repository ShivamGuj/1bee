import React from "react";

const Card = ({ item }) => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => {
    setClick(true);
  };

  if (!item || !item.from) {
    return (
      <div className="border mt-3 p-2 flex flex-row bg-white">
        Invalid item data
      </div>
    );
  }

  return (
    <div
      className={`border mt-3 p-2 flex flex-row items-center gap-2 cursor-pointer bg-white hover:bg-[#F2F2F2] ${
        click ? "bg-[#F2F2F2]" : ""
      }`}
      onClick={handleClick}
    >
      <img
        src={item.from.avatar}
        alt={item.from.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col gap-1">
        <p className="">
          <span className="font-semibold">From: </span>
          {item.from.name} &lt;{item.from.email}&gt;
        </p>
        <p>
          <span className="font-semibold">Subject:</span> {item.subject}
        </p>
        <p>{item.short_description}</p>
        <p>{item.date}</p>
      </div>
    </div>
  );
};

export default Card;
