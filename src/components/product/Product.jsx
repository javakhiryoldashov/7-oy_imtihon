import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoIosBus } from "react-icons/io";
import { RiTableAltLine } from "react-icons/ri";
import logo1 from "../../assets/logo1.svg";
import logo2 from "../../assets/logo2.svg";
import logo3 from "../../assets/logo3.svg";
import logo4 from "../../assets/logo4.svg";
import logo5 from "../../assets/logo5.svg";
import Frame from "../../assets/Frame.svg";

const baseURL = import.meta.env.VITE_BASE_URL;

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductById() {
      try {
        const response = await fetch(`${baseURL}/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }

    fetchProductById();
  }, [productId]);

  return (
    <div className="container mx-auto">
      {product && (
        <div className="flex justify-between">
          <div>
            <p className="mb-[42px]">
              Products / Gaming Headsets & Audio / {product.name}
            </p>

            <div className="flex items-center w-[717px] justify-between h-[700px]">
              <AiOutlineLeft />
              <img
                className="w-[800px]"
                src={product.image_url}
                alt={product.name}
              />
              <AiOutlineRight />
            </div>

            <div className="w-[180px] gap-20 flex justify-between mt-[110px]">
              <img className={logo1.svg} src={logo1} alt="#" />
              <img className={logo2.svg} src={logo2} alt="#" />
              <img className={logo3.svg} src={logo3} alt="#" />
              <img className={logo4.svg} src={logo4} alt="#" />
              <img className={logo5.svg} src={logo5} alt="#" />
            </div>
            <button
              className="mt-[60px] mb-[100px] bg-red-800 text-white ml-[600px] border rounded-[5px] "
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>

          <div>
            <h1 className="mt-[67px] font-bold text-[48px] mb-[16px]">
              {product.name}
            </h1>
            <p className="text-[18px] mb-[18px]">{product.description}</p>
            <p className="mb-[28px]">{product.ratings_stars}</p>
            <div className="w-[150px] pb-[20px]">
            <img className={Frame.svg} src={Frame} alt="#" />
            </div>
            
            <p className="border border-dotted border-gray-500 border-r-0 border-l-0"></p>
            <h2 className="font-bold text-[36px] mb-[15px]">
              ${product.price} or ${Math.round(product.price / 12).toFixed(2)}
              /month
            </h2>
            <p className="text-[18px] mt-[15px] mb-[28px]">
              Suggested payments with 6 month special financing
            </p>
            <p className="border border-dotted border-gray-500 border-r-0 border-l-0"></p>
            <h3 className="text-[24px] font-bold mb-[30px]">Choose a color</h3>
            <ul className="flex space-x-4 mt-4 mb-[37px] border border-dotted border-gray-500 border-r-0 border-l-0 border-t-0 p-7">
              {product.color_options.map((color, index) => (
                <li
                  key={index}
                  className="w-[40px] h-[40px] rounded-full"
                  style={{ backgroundColor: color }}
                  title={color}
                ></li>
              ))}
            </ul>
            <div className="flex items-center justify-between mb-[51px]">
              <div className="flex items-center border border-solid rounded-[40px] border-gray-300 w-[193px] justify-center">
                <button>-</button>
                <p className="mr-[30px] ml-[30px]">1</p>
                <button>+</button>
              </div>
              <p className="w-[167px]">Only 16 items left! Don’t miss it</p>
            </div>
            <div className="flex items-center gap-6 mb-[61px] mt-20">
              <button className="flex items-center gap-[10px] bg-green-600 text-white border border-solid rounded-[10px] w-[442px] justify-center">
                <FaShoppingCart />
                Add to Cart
              </button>
              <CiHeart className="border border-solid border-black" />
            </div>
            <div className="border border-dotted border-gray-500 rounded-[20px] p-7 ">
            <div className="flex items-center gap-[30px] mb-[55px] border border-dotted border-gray-500 border-r-0 border-l-0 border-t-0 p-7">
              <IoIosBus className="w-[30px] h-[30px]" />
              <div>
                <p className="font-bold text-[18px]">Free delivery</p>
                <p>Enter your Postal Code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-[30px]">
              <RiTableAltLine className="w-[30px] h-[30px]" />
              <div>
                <p className="font-bold text-[18px]">Return Delivery</p>
                <p>Free delivery 30 Days return</p>
              </div>
            </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
