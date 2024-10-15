"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [datas, setDatas] = useState([]);
  const [card, setCard] = useState([]);

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
    const card = { id, name, description, price };
    setCard((prevProducts) => [...prevProducts, card]);
  };

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
          <img
            className="w-[25px] h-[25px] rounded-[20px]"
            src="./home.png"
            alt=""
          />
          <img
            className="w-[25px] h-[25px] rounded-[20px]"
            src="./admin.png"
            alt=""
          />
          <img
            className="w-[25px] h-[25px] rounded-[20px]"
            src="./box.png"
            alt=""
          />
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
                  <div className="btn btn-neutral" onClick={addCard}>
                    Add order
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
