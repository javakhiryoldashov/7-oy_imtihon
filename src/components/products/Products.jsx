import { useEffect, useState } from "react";

import styles from "./Products.module.scss";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../store/productsSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

const Products = ({ cart, setCart }) => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [sortProducts, setSortProducts] = useState("");

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch(`${baseURL}/brands`);
      const data = await response.json();
      setBrands(data);
    }

    async function fetchColors() {
      const response = await fetch(`${baseURL}/colors`);
      const data = await response.json();
      setColors(data);
    }

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = `${baseURL}/products`;

      const params = [];
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(`${query}`);
        const data = await response.json();
        dispatch(addProducts(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor]);

  const productsSort = [...products].sort((a, b) => {
    if (sortProducts === "asc") {
      return a.price - b.price;
    }
    if (sortProducts === "desc") {
      return b.price - a.price;
    } else if (sortProducts === "reset") {
      return 0;
    }
  });

  return (
    <div className={styles.container}>
      <aside>
        <div>
          <div className="text-[25px] text-[#190D26]">
            <h3>BRAND</h3>
          </div>

          <div>
            <h3 className="text-[30px] text-[#0BA42D]">Price</h3>
            <div >
            <select className="w-[200px] mb-[10px] h-[40px] text-[#0BA42D]"
              name="narx"
              id=""
              value={sortProducts}
              onChange={(event) => setSortProducts(event.target.value)}
            >
              <option value="reset">Reset</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            </div>
            
          </div>

          <ul>
            {brands.map((brand, index) => (
              <li key={index}>
                <input
                  type="radio"
                  value={brand}
                  name="brand"
                  id={brand}
                  checked={brand === selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                />
                <label htmlFor={brand}>{brand}</label>
              </li>
            ))}
          </ul>
          <button
            className="w-[200px] h-[40px] bg-[#0BA42D]"
            onClick={() => setSelectedBrand("")}
          >
            Reset
          </button>
        </div>

        <div>
          <div className="text-[25px] text-[#190D26]">
            <h3>COLORS</h3>
          </div>

          <ul className={styles.colorsContainer}>
            {colors.map((color, index) => (
              <li key={index}>
                <div
                  style={{
                    background: color,
                    outline: selectedColor === color ? "3px solid red" : "",
                  }}
                  className={styles.color}
                  onClick={() => setSelectedColor(color)}
                />
              </li>
            ))}
          </ul>
          <button
            className="w-[200px] h-[40px] bg-[#0BA42D] "
            onClick={() => setSelectedColor("")}
          >
            Reset
          </button>
        </div>
      </aside>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : products.length ? (
          <div className={styles.grid}>
            {productsSort.map((product) => (
              <Card
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
        ) : (
          <p>No products</p>
        )}
      </main>
    </div>
  );
};

export default Products;
