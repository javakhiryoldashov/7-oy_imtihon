import "./App.css";
import logo from "../public/GG.svg"
import logo2 from "../public/phone.svg"
import logo3 from "../public/text.svg"
import logo4 from "../public/green.svg"
import logo5 from "../public/Shop.svg"
import logo6 from "../public/england.svg"
import logo7 from "../public/GameGeek.svg"
import logo8 from "../public/search.svg"
import logo9 from "../public/user.svg"
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Products from "./components/products/Products";
import Product from "./components/product/Product";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./components/Cart"

function App() {
  const [cart, setCart] = useState([]);
  const [add, setAdd] = useState(0);
  const baseURL = "https://headphones-server.onrender.com/products";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [add, baseURL]);

  App.js

  return (
    <div>
      <Router>
        <header>
          <nav className="navbar">
            <div className="header_img">
              <img className="GG_svg" src={logo} alt="#" />
              <img className="phone_svg" src={logo2} alt="#" />
              <img className="text_svg" src={logo3} alt="#" />
              <img className="green_svg" src={logo4} alt="#" />
              <img className="Shop_svg" src={logo5} alt="#" />
              <img className="england_svg" src={logo6} alt="#" />
            </div>
            <ul className="header_title">
              <img className="GameGeek" src={logo7} alt="#" />
              <li className="header_text">
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                  to="/products"
                >
                  Home
                </NavLink>
              </li>
              <li className="header_text">
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}

                >
                  Brands
                </NavLink>
              </li>
              <li className="header_text">
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}

                >
                  What’s new
                </NavLink>
              </li>
              <li className="header_text">
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}

                >
                  Sales
                </NavLink>
              </li>
              <li className="header_text">
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}

                >
                  Help
                </NavLink>
              </li>
              <li className="header_text">
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}

                >
                  About
                </NavLink>
              </li>

              <div className="header_svg">
                <img className="search_svg" src={logo8} alt="#" />
                <img className="user_svg" src={logo9} alt="#" />
              </div>

              <li className="header_cart">
                <NavLink to="/cart">
                  {cart.length > 0 && (
                    <span className="cart-count">{cart.length}</span>
                  )}
                  <div className="header_shop">
                    <FaShoppingCart />
                  </div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route
            path="/products"
            element={<Products cart={cart} setCart={setCart} setAdd={setAdd} />}
          />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart products={cart} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
