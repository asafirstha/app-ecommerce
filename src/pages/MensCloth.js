import CardProduct from "../components/CardProduct";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { settings } from "../libs/helpers/sliderSettings";

const CATEGORY = `men's clothing`;

const MensCloth = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const allProducts = useSelector((state) =>
    state.products.products.length > 0
      ? state.products.products
      : JSON.parse(localStorage.getItem("allProducts"))
  );

  const handleClick = (id) => {
    navigate(`/${id}`);
  };

  const filterProductsByCategory = () => {
    const filteredProducts = allProducts.filter(
      (product) => product.category === CATEGORY
    );
    setProducts(filteredProducts);
  };

  useEffect(() => {
    filterProductsByCategory();
  }, []);
  return (
    <div className="w-full h-screen p-4 md:p-4 md:h-screen space-y-8 md:space-y-16" style={{ background: "#f5f5dc" }}>
      <h1 className="text-xl font-semibold text-gray-600">
        Men's Clothing Products
      </h1>
      <Slider {...settings}>
        {products.map((product, idx) => {
          return (
            <div key={idx}>
              <CardProduct
                key={product.id}
                id={product.id}
                category={product.category}
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating}
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

export default MensCloth;
