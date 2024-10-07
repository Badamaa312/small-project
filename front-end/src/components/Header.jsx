"use client";

import { useState } from "react";
import Card from "./ProductCard";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <main>
      {" "}
      <header className="h-[130px] border border-grey rounded-[20px] flex items-center justify-between p-2 bg-blue-200 ">
        <img
          className="w-[100px] h-[100px] rounded-[20px]"
          src="./logo.png"
          alt=""
        />
        <input
          name=""
          placeholder="Search"
          className="w-[500px] h-[50px] border border-grey rounded-[10px] pl-4"
          type="text"
        />
        <button onClick={handleVisible} className="btn mr-[20px] btn-outline">
          Add new product
        </button>
      </header>
      <div
        className={`${
          visible ? "flex" : "hidden"
        } grid grid-cols-3 gap-4 items-center justify-center rounded-[20px] mt-[100px]`}
      >
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
};

export default Header;
