import Link from "next/link";

const CustomerIcon = () => {
  return (
    <main>
      <Link href="./sign-up">
        <button className="btn">
          <img src="./user.png" width={25} height={25} alt="" />
        </button>
      </Link>
    </main>
  );
};

export default CustomerIcon;
