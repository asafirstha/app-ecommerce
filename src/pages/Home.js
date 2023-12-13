import React, { useEffect, useState } from "react";
import "../assets/css/modules/reactSlick.css";
import PopularByCategory from "../components/PopularByCategory";
import { http } from "../libs/services/http";
import { useDispatch } from "react-redux";
import { ADD_ALL_PRODUCTS } from "../store/slicers/products";
import useProducts from "../hooks/products";
import { isAdmin } from "../libs/helpers/auth";

const URL = "products";
const GET = "get";

const Home = () => {
  const { products } = useProducts(GET, URL);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http("get", "products/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const setData = async () => {
      try {
        const localProducts = JSON.parse(
          localStorage.getItem("allProducts") || "[]"
        );

        if (localProducts.length > 0) {
          dispatch(ADD_ALL_PRODUCTS(localProducts));
        } else {
          dispatch(ADD_ALL_PRODUCTS(products));
        }
      } catch (error) {
        console.error("Error parsing local products:", error);
      }
    };
    setData();
  }, [dispatch, products]);

  useEffect(() => {
    fetchData();
    if (isAdmin()) {
      window.location.href = "/report";
    }
  }, []);

  return (
    <div className="w-full h-screen p-4 md:p-4 md:h-screen space-y-8 md:space-y-16" style={{ background: "#f5f5dc" }}>
      <div className="space-y-5">
        {categories.map((category) => (
          <PopularByCategory key={category} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;
