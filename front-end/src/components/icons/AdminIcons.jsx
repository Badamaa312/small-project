import Link from "next/link";
import { CreateCard } from "../CreateCard";
import Header from "../Header";

const AdminIcon = (cards) => {
  return (
    <main>
      <Link href="./admin">
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <img src="./admin.png" width={25} height={25} alt="" />
        </button>
      </Link>
      <dialog id="my_modal_2" className="modal">
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

export default AdminIcon;
