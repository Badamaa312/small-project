"use client";

import AdminIcon from "@/components/icons/AdminIcons";
import HomeIcon from "@/components/icons/HomeIcon";
import OrdersIcon from "@/components/icons/OrdersIcon";

import { useEffect, useState } from "react";

const HomePage = () => {
  const [datas, setDatas] = useState([]);
  const [cards, setCards] = useState([]);

  const fetchDatas = async () => {
    try {
      const response = await fetch("http://localhost:5555/products");
      const productData = await response.json();

      setDatas(productData?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCard = (id, name, description, price) => {
    const card = { id, name, description, price, count: 1 };

    setCards((prevItems) => {
      const isExists = prevItems.find((item) => item.id === id);

      if (isExists) {
        return prevItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        });
      }
      return [...prevItems, card];
    });
  };

  console.log(cards);

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <main className="w-screen  flex items-center flex-col">
      <header className="container h-[130px] border border-grey rounded-[20px] flex items-center justify-around p-2 bg-gray-200 fixed z-50">
        <span>Shopping</span>
        <input
          name=""
          placeholder="Search"
          className="w-[500px] h-[50px] border border-grey rounded-[10px] pl-4"
          type="text"
        />
        <div className="flex items-center gap-2 ">
          <HomeIcon />
          <AdminIcon />
          <OrdersIcon cards={cards} setCards={setCards} />
        </div>
      </header>
      <div className="container grid grid-cols-3 gap-6 mt-40">
        {datas?.map((data) => {
          return (
            <div className="card card-side bg-base-100 shadow-xl">
              <figure>
                <img src={data.image_url} alt="Photo" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{data.name}</h2>
                <p>{data.description}</p>
                <p>{data.price}$</p>
                <div className="card-actions justify-end">
                  <button className="btn">Detail</button>

                  <button
                    className="btn "
                    onClick={() => {
                      addCard(data.id, data.name, data.description, data.price);
                    }}
                  >
                    Add order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
