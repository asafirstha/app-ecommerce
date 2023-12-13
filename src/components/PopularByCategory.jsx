import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { settings } from "../libs/helpers/sliderSettings";
import CardProduct from "./CardProduct";
import Slider from "react-slick";
import "../assets/css/modules/reactSlick.css";

const PopularByCategory = ({ category }) => {
  const [products, setproducts] = useState([]);
  const allProducts = useSelector((state) => state.products.products);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/${id}`);
  };

  const filterProductsByCategory = () => {
    const filteredProducts = allProducts.filter(
      (product) => product.category === category
    );
    setproducts(filteredProducts);
  };

  useEffect(() => {
    filterProductsByCategory();
  }, [allProducts]);

  return(
    <div className="space-y-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-600">
          {category} Terpopuler
        </h1>
      </div>
      <Slider {...settings}>
        {products.length > 0 &&
          products.map((product, idx) => {
            return (
              <div key={idx}>
                <CardProduct
                  category={product.category}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  rating={product.rating}
                  id={product.id}
                  stock={product.stock}
                  handleClick={handleClick}
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default PopularByCategory;
