"use-client";

import { BACKEND_ENDPOINT } from "@/constants/constant";
import { useState } from "react";

export const CreateCard = ({ setProducts }) => {
  const [product, setProduct] = useState({});

  const handleSubmit = async (event) => {
    console.log(product);

    try {
      event.preventDefault();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/product`, options);
      const data = await response.json();

      setProducts((prevProducts) => [...prevProducts, data]);
    } catch {
      console.log("error");
    }
    setProduct({
      name: "",
      description: "",
      price: "",
      image_url: "",
    });
    document.getElementById("my_modal_1").close();
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  return (
    <>
      <button
        className="btn btn-outline btn-info"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Create product
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create product</h3>
          <div className="flex flex-col gap-3 mt-4">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <input
              name="name"
              onChange={handleInputChange}
              type="text"
              placeholder="name"
              className="w-full input input-bordered"
              value={product?.name}
            />
            <input
              name="description"
              onChange={handleInputChange}
              type="text"
              placeholder="description"
              className="w-full input input-bordered"
              value={product?.description}
            />
            <input
              name="price"
              onChange={handleInputChange}
              type="text"
              placeholder="Price"
              className="w-full input input-bordered"
              value={product?.price}
            />
            <input
              name="image_url"
              onChange={handleInputChange}
              type="text"
              placeholder="image_url"
              className="w-full input input-bordered"
              value={product?.image_url}
            />
          </div>

          <button className="mt-4 btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </dialog>
    </>
  );
};
