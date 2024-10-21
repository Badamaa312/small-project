import { BACKEND_ENDPOINT } from "@/constants/constant";

const OrdersIcon = ({ cards, setCards }) => {
  const handleDecrease = (id) => {
    setCards((prevCardItems) => {
      return prevCardItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            count: item.count - 1,
          };
        }
        return item;
      });
    });
  };
  const handleIncrease = (id) => {
    setCards((prevCardItems) => {
      return prevCardItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            count: item.count + 1,
          };
        }
        return item;
      });
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/order_items`, options);
      const data = await response.json();

      // setProducts((prevProducts) => [...prevProducts, data[0]]);
    } catch (error) {
      console.log(error, "error");
    }
    // setProduct({
    //   name: "",
    //   description: "",
    //   price: "",
    //   image_url: "",
    // });
    // document.getElementById("my_modal_4").close();
  };

  return (
    <main>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <img src="./box.png" width={25} height={25} alt="" /> Order
        {cards.length}
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <div className="container grid grid-cols-3 gap-6 mt-40">
            {cards.map((card, index) => {
              return (
                <div
                  className="card card-side bg-base-100 shadow-xl"
                  key={index}
                >
                  <div className="card-body">
                    {/* <img src={card.image_url} alt="photo" /> */}
                    <h2 className="card-title">Product name: {card.name}</h2>
                    <p>id: {card.id}</p>
                    <p>Description: {card.description}</p>
                    <p>Price: {card.price}$</p>
                    <div className="flex items-center justify-center gap-[5px]">
                      <p>quantity: </p>
                      <button onClick={() => handleDecrease(card.id)}>-</button>
                      <p className="pl-1">{card.count}</p>
                      <button onClick={() => handleIncrease(card.id)}>+</button>
                    </div>
                    <p>Total price each product: {card.price * card.count}$</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex items-center gap-2">
              <button className="mt-4 btn" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn">Submit</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default OrdersIcon;
