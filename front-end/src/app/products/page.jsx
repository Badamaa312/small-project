"use client";

import AdminIcon from "@/components/icons/AdminIcons";
import HomeIcon from "@/components/icons/HomeIcon";
import OrdersIcon from "@/components/icons/OrdersIcon";

import { useEffect, useState } from "react";

export default function ProductsPage() {
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

  const addCard = (id, name, price) => {
    const card = { id, name, price };
    setCards((prevProducts) => [...prevProducts, card]);
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
                  <button className="btn btn-neutral">Detail</button>

                  <button
                    className="btn btn-neutral"
                    onClick={() => {
                      addCard(data.id, data.price, data.name);
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
}
