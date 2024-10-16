const OrdersIcon = (cards, setCards) => {
  return (
    <main>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <img src="./box.png" width={25} height={25} alt="" />
        {cards.cards.length}
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <div className="container grid grid-cols-3 gap-6 mt-40">
            {cards.cards.map((card) => {
              return (
                <div className="card card-side bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{card.name}</h2>
                    <p>{card.id}</p>
                    <p>{card.price}$</p>
                  </div>
                </div>
              );
            })}
          </div>
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

export default OrdersIcon;
