import Link from "next/link";

const HomeIcon = (cards) => {
  return (
    <main>
      <Link href="./sign-up">
        {" "}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <img src="./home.png" width={25} height={25} alt="" />
        </button>
      </Link>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default HomeIcon;
