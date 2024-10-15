"use client";

import Link from "next/link";
import { useState } from "react";

export const SignUpPage = () => {
  const [customer, setCustomer] = useState({});

  const BACKEND_ENDPOINT = "http://localhost:5555/sign-up";

  const handleOnSubmit = async (event) => {
    console.log(customer);

    try {
      event.preventDefault();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}`, options);
      const data = await response.json();
      //router.push("/products")
      // setProducts((prevProducts) => [...prevProducts, data]);
    } catch {
      console.log("error");
    }

    // LogUp hiij bui hesgiig hoosolj bn
    setCustomer({
      name: "",
      email: "",
      address: "",
    });
    document.getElementById("my_modal_1").close();
  };

  // input ni name bolon value-r tanih

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setCustomer((prevCustomer) => {
      return {
        ...prevCustomer,
        [name]: value,
      };
    });
  };

  return (
    <div className="">
      <div className="flex w-full h-screen">
        <div className="w-1/2 h-full flex items-center justify-end pr-[126px]">
          <div className="w-[384px] h-[426px] flex flex-col gap-10">
            <div className="flex justify-center items-center gap-[10px] p-[6px]"></div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-base font-normal text-[#334155] ">
                Sign up below to create your Wallet account
              </p>
              <button
                className="btn btn-outline btn-info  "
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Please Create Account
              </button>
            </div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="text-lg font-bold">Create account</h3>
                <div className="flex flex-col gap-3 mt-4">
                  <input
                    name="name"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="name"
                    className="w-full input input-bordered"
                    value={customer?.name}
                  />
                  <input
                    name="email"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="email"
                    className="w-full input input-bordered"
                    value={customer?.description}
                  />
                  <input
                    name="address"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="address"
                    className="w-full input input-bordered"
                    value={customer?.price}
                  />
                  <input
                    name="address"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="address"
                    className="w-full input input-bordered"
                  />
                </div>
                <Link href="./product">
                  <button className="mt-4 btn" onClick={handleOnSubmit}>
                    Submit
                  </button>
                </Link>
              </div>
            </dialog>
            <div className="flex gap-1 h-8 justify-center items-center">
              <p className="text-[#0F172A] text-base font-normal">
                Do you have an account?
              </p>
              <Link href="./sign-in">
                <button className="text-[#0166FF] pl-8 text-base font-normal leading-6">
                  Log in
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#0166FF] w-1/2 h-full"></div>
      </div>
    </div>
  );
};
export default SignUpPage;
