"use client";

import Link from "next/link";

const SignInPage = () => {
  const BACKEND_ENDPOINT = "http://localhost:5555/sign-in";

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: event.target.name.value,
      password: event.target.password.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(BACKEND_ENDPOINT, options);
    const data = await response.json();
  };

  return (
    <div className="flex w-full h-screen">
      <div className=" w-1/2 h-full flex items-center justify-end  pr-[126px]">
        <div className="w-[384px] h-[426px] flex flex-col gap-10">
          <div className="flex flex-col items-center gap-10">
            <h1 className="text-2xl font-semibold leading-8 text-[#0F172A]">
              Welcome to
            </h1>
            <p className="text-base font-normal text-[#334155]">
              Welcome back, Please Log In
            </p>
          </div>
          <div>
            <form
              className="flex flex-col gap-3"
              action=""
              onSubmit={handleOnSubmit}
            >
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="input input-bordered text-[#A3A3A3] text-base w-full  border  border-[#D1D5DB] bg-[#F3F4F6]"
              />
              <input
                type="text"
                name="password"
                placeholder="Password"
                className="input input-bordered text-[#A3A3A3] text-base w-full  border  border-[#D1D5DB] bg-[#F3F4F6]"
              />
              <button className="btn btn-primary rounded-[20px] text-xl leading-7 text-white">
                Log in
              </button>
            </form>
          </div>
          <div className="flex gap-1 h-8 justify-center items-center">
            <p className="text-[#0F172A] text-base font-normal">
              Don't have account?
            </p>
            <Link href="./sign-up">
              <button className="text-[#0166FF] text-base font-normal leading-6">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-[#0166FF] h-full"></div>
    </div>
  );
};

export default SignInPage;
