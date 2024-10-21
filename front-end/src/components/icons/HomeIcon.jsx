import Link from "next/link";

const HomeIcon = () => {
  return (
    <main>
      <Link href="./">
        <button className="btn">
          <img src="./home.png" width={25} height={25} alt="" />
        </button>
      </Link>
    </main>
  );
};

export default HomeIcon;
