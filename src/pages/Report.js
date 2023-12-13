import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isAdmin, isAuthenticated } from "../libs/helpers/auth";

const Report = () => {
  const [orders, setOrders] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0);
  const allOrders = useSelector((state) =>
    state.orderItems.orderItems.length > 0
      ? state.orderItems.orderItems
      : JSON.parse(localStorage.getItem("orderItems"))
  );

  useEffect(() => {
    const fetchReportData = async () => {
      if (!(isAuthenticated() && isAdmin())) {
        window.location.href = "/login";
      }

      const products =
        allOrders &&
        allOrders.reduce((result, order) => {
          const items = order.filter((item) => {
            const sameItem = result.find((resultItem) => resultItem.id === item.id);
            if (sameItem) {
              sameItem.count += item.count;
              return null;
            }
            return item;
          });
          return [...result, ...items];
        }, []);

      const earning =
        products &&
        products.reduce((result, product) => result + product.price * product.count, 0);

      setOrders(products);
      setTotalEarning(earning);
    };

    fetchReportData();
  }, [allOrders]);

  return (
    <div className="w-full h-screen p-2 md:p-12 space-y-8 md:space-y-16">
      {orders && orders.length > 0 ? (
        <div className="flex flex-col items-center justify-between">
          <div>
            <div className="grid grid-cols-4 gap-2 items-center w-full border p-5 border-gray-500">
              <div className="text-center">
                <p>Image</p>
              </div>
              <div className="text-left">
                <p>Product Name</p>
              </div>
              <div className="text-right">
                <p>Price</p>
              </div>
              <div className="text-right">
                <p>Sold</p>
              </div>
            </div>

            {orders.map((product, idx) => (
              <div
                key={product.id}
                className={`${
                  idx % 2 === 0 && "bg-white"
                } grid grid-cols-4 gap-2 items-center w-full border p-5 border-gray-500`}
              >
                <div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-20 object-contain mx-auto"
                  />
                </div>
                <div className="text-left">
                  <p>{product.title}</p>
                </div>
                <div className="text-right">
                  <p>{product.price}</p>
                </div>
                <div className="text-right">
                  <p>{product.count} items</p>
                </div>
              </div>
            ))}

            <div className="flex flex-row items-center justify-between p-5 border border-gray-500" style={{ margin: 0 }}>
              <p className="font-bold">Total earning</p>
              <p>${totalEarning}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-2xl font-semibold text-left">Belum ada Penjualan</p>
      )}
    </div>
  );
};

export default Report;
