import { FaCartShopping } from "react-icons/fa6";

import Button from "../button/Button";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

const Card = ({ product, cart, setCart }) => {
  return (
    <div>
      <img className=" border w-[500px] h-[300px]" src={product.image_url} alt={product.product_name} />
      <h4>
        <Link className="text-red-700 text-[30px] p-[10px]" to={`/products/${product.id}`}>{product.name}</Link>
      </h4>
      <p className=" h-10 mb-10 p-[10px] w-[400px]">{product.description}</p>
      <div className="p-[10px]">
      <div className={styles.colors} >
        {product.color_options.map((color, index) => (
          <div
            key={index}
            style={{
              background: color,
            }}
            className={styles.color}
          />
        ))}
      </div>
      </div>
      <strong className="mb-5 p-[10px] text-[20px]">{product.price}$</strong>
      <div>
        <Button onClick={() => setCart([...cart, product])}>
          <span className=" flex w-[418px] justify-center text-white">
          <FaCartShopping />
          <span style={{ marginLeft: "0.8em" }}>Add to Cart</span>
          </span>
          
        </Button>
      </div>
    </div>
  );
};

export default Card;

