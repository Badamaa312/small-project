"use-client";

import { CreateCard } from "./CreateCard";

const Header = () => {
  return (
    <main>
      <header className="h-[130px] border border-grey rounded-[20px] flex items-center justify-between p-2 bg-pink-200 ">
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
        <CreateCard />
      </header>
    </main>
  );
};

export default Header;
