export const EditModal = ({
  selectedProduct,
  handleSubmit,
  handleInputChange,
  setSelectedProduct,
  product,
}) => {
  const handleModalClick = () => {
    document.getElementById("my_modal_2").showModal();
    setSelectedProduct(product);
  };
  return (
    <main className="">
      <button className="btn" onClick={handleModalClick}>
        Edit
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit product</h3>
          <div className="flex flex-col gap-3 mt-4">
            <input
              name="name"
              onChange={handleInputChange}
              type="text"
              placeholder="name"
              className="w-full input input-bordered"
              value={selectedProduct?.name}
            />
            <input
              name="description"
              onChange={handleInputChange}
              type="text"
              placeholder="description"
              className="w-full input input-bordered"
              value={selectedProduct?.description}
            />
            <input
              name="price"
              onChange={handleInputChange}
              type="text"
              placeholder="Price"
              className="w-full input input-bordered"
              value={selectedProduct?.price}
            />
            <input
              name="image_url"
              onChange={handleInputChange}
              type="text"
              placeholder="image_url"
              className="w-full input input-bordered"
              value={selectedProduct?.image_url}
            />
          </div>

          <button className="mt-4 btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </dialog>
    </main>
  );
};
