"use client";

import { CreateCard } from "@/components/CreateCard";
import Card from "@/components/ProductCard";
import { useState, useEffect } from "react";

const Header = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/products`);
      const responseData = await response.json();
      setProducts(responseData?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="w-screen h-screen flex items-center flex-col">
      <header className="container h-[130px] border border-grey rounded-[20px] flex items-center justify-between p-2 bg-blue-200 ">
        <img
          className="w-[100px] h-[100px] rounded-[20px]"
          src="front-end\src\public\logo.jpeg"
          alt=""
        />
        <input
          name=""
          placeholder="Search"
          className="w-[500px] h-[50px] border border-grey rounded-[10px] pl-4"
          type="text"
        />
        <CreateCard setProducts={setProducts} />
      </header>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {products?.map((product) => {
          return (
            <Card
              product={product}
              setProducts={setProducts}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Header;
