/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

import "./Orders.css";
import config from "../../config/config";
import { useEffect } from "react";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${config.apiUrl}/api/order/allOrders`);
    if (response.data.success) {
      setOrders(response.data.data);
      
    } else {
      toast.error("Error");
    }
  };

 


  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value;  
    try {
      const response = await axios.post(`${config.apiUrl}/api/order/status`, {
        orderId,
        status: newStatus
      });

      if (response.data.success) {
        toast.success("Order status updated successfully!"); 
        await fetchAllOrders();  
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  

                  if (index === order.items.length) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.name}
              </p>
              <p className="order-item-method">
                {order.orderMethod}
              </p>
              <div className="order-item-address">
              <p>{order.address || "___"}</p>
              </div>
              <p className="order-item-phone">{order.contact}</p>
              
            </div>
            <p>Items : {order.items.length}</p>
            <p>₵{parseFloat(order.amount).toFixed(2)}</p>
            <select onChange={(e) => statusHandler(event, order._id)} value={order.status}>
              <option value="">{order.status}</option>
              <option value="Order Processing">Order Processing</option>
              <option value="Order out for delivery">Order Out for Delivery</option>
              <option value="Order ready for pickup">Order ready for pickup</option>
              <option value="Delivered">Delivered</option>
              <option value="Pickedup">Pickedup</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
