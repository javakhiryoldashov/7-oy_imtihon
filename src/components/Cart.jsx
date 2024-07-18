import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = ({ products }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = products.reduce(
        (sum, product) => sum + product.price,
        0
      );
      setTotal(totalPrice);
    };

    calculateTotal();
  }, [products]);

  return (
    <div className="p-4 flex container mx-auto">
      <div className="animate-slideInLeft">
        <button
          className="flex items-center gap-[10px] mt-[74px] "
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft />
          Back to Shopping
        </button>
        <h2 className="text-2xl font-bold mb-[57px] text-[32px] mt-[52px]">
          SHOPPING CART
        </h2>
        <div className="border border-dotted border-gray-500 border-b-0 border-l-0 border-t-0 pr-[30px]">
          <div className="flex border border-dotted border-gray-500 border-r-0 border-l-0 p-4">
            <h2 className="mr-[600px] font-bold">Product</h2>
            <h3 className="mr-[100px] font-bold">Quantity</h3>
            <h3 className="font-bold">Price</h3>
          </div>

          <ul>
            {products.map((product) => (
              <div
                className="flex items-center mb-4 border border-dotted border-gray-500 border-r-0 border-l-0 border-t-0 p-4"
                key={product.id}
              >
                <img
                  className="w-[155px] h-auto mr-[36px]"
                  src={product.image_url}
                  alt={product.name}
                />

                <div className="flex-grow">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="mt-[20px] font-bold">Black</p>
                  <p className="text-green-500">In stock</p>
                </div>
                <div className="flex items-center border border-solid rounded-[10px] border-gray-300 w-[135px] ml-[36px] mr-[36px] justify-center">
                  <button className="px-10 py-1 bg-gray-400 hover:bg-gray-300 rounded-l-[10px]">
                    -
                  </button>
                  <p className="mx-4">1</p>
                  <button className="px-10 py-1 bg-gray-400 hover:bg-gray-300 rounded-r-[10px]">
                    +
                  </button>
                </div>
                <h2 className="font-bold">${product.price}</h2>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className=" ml-[31px] mt-[226px] animate-slideInRight">
        <h2 className="text-[23px] w-[500px] font-bold border border-dotted border-gray-500 border-r-0 border-l-0 border-t-0 p-4">
          Cart Totals
        </h2>
        <div className="flex justify-between mt-[37px] border border-dotted border-gray-500 border-r-0 border-l-0 border-t-0">
          <div>
            <p>Shipping (3-5 Business Days)</p>
            <p className="mt-[21px] mb-[21px]">
              TAX (estimated for the United States (US))
            </p>
            <p className="mb-[25px]">Subtotal</p>
          </div>
          <div className="text-right">
            <h2 className="font-bold">Free</h2>
            <p className="font-bold mb-[21px] mt-[21px]">$0</p>
            <p className="font-bold">${total.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex justify-between mt-[33px] mb-[68px]">
          <h2 className="font-bold">Total</h2>
          <p className="font-bold">${total.toFixed(2)}</p>
        </div>
        <button className="bg-[#0BA42D] text-white border border-solid rounded-[10px] w-full h-[54px]">
          PROCEED TO CHECKOUT
        </button>
        <button
          className="flex items-center gap-[10px] mt-[46px] justify-center w-full"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft />
          Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
