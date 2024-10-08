"use client";

import { CreateCard } from "@/components/CreateCard";
import Header from "@/components/Header";
import Card from "@/components/ProductCard";
import { useState, useEffect } from "react";

export default function Home() {
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
    <main className="flex justify-center items-center">
      <CreateCard setProducts={setProducts} />
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
}
