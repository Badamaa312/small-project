"use client";

import { CreateCard } from "@/components/CreateCard";

import { useState, useEffect } from "react";
import { EditProduct } from "./Edit";
import HomeIcon from "./icons/HomeIcon";
import CustomerIcon from "./icons/CustomerIcon";

const Header = () => {
  const BACKEND_ENDPOINT = "http://localhost:5555";

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/products`);
      const responseData = await response.json();

      setProducts(responseData?.data);
    } catch (error) {
      console.log("error in fetching products", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/product`, options);
      const data = await response.json();

      setProducts((prevProducts) =>
        prevProducts.filter((product) => data?.product?.id !== product?.id)
      );
      alert("Product successfully removed.");
    } catch (error) {
      console.log("error in delete product", error);
    }
  };

  const handleSubmit = async (id) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProduct),
      };
      const response = await fetch(
        `${BACKEND_ENDPOINT}/product/${id}`,
        options
      );
      const data = await response.json(response);

      setProducts(data.products);
    } catch (error) {
      console.log("error in update product", error);
    }
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSelectedProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  return (
    <main className="w-screen  flex items-center flex-col">
      <header className="container h-[130px] border border-grey rounded-[20px] flex items-center justify-around p-2 bg-gray-200 fixed z-50">
        <img src="./logo.png" width={50} height={50} alt="Photo" />
        <input
          name=""
          placeholder="Search"
          className="w-[500px] h-[50px] border border-grey rounded-[10px] pl-4"
          type="text"
        />
        <div className="flex gap-4">
          <HomeIcon />
          <CustomerIcon />
          <CreateCard setProducts={setProducts} />
        </div>
      </header>
      <div className="container grid grid-cols-3 gap-6 mt-40">
        {products?.map((product) => {
          return (
            <div className="card card-side bg-base-100 shadow-xl">
              <figure>
                <img src={product.image_url} alt="Photo" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}$</p>
                <div className="card-actions justify-end">
                  <EditProduct
                    product={product}
                    setSelectedProduct={setSelectedProduct}
                    selectedProduct={selectedProduct}
                    handleSubmit={() => handleSubmit(product?.id)}
                    handleInputChange={handleInputChange}
                  />

                  <button
                    onClick={() => handleDelete(product?.id)}
                    className="btn"
                  >
                    Delete
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

export default Header;

{
  /* <div className="grid grid-cols-3 gap-6">
{products?.map((product) => {
  return (
    <Card
      key={product?.id}
      product={product}
      setProducts={setProducts}
      setSelectedProduct={setSelectedProduct}
      selectedProduct={selectedProduct}
    />
  );
})}
</div> */
}
