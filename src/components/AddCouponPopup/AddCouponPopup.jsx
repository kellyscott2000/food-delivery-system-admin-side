/* eslint-disable react/prop-types */
import { useState } from "react";
import "./AddCouponPopup.css";
import axios from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import PropTypes from 'prop-types';

const AddCouponPopup = ({ setShowAddCoupon, onAddCoupon }) => {
  const [data, setData] = useState({
    code: "",
    discountType: "",
    discountValue: "",
    startDate: "",
    endDate: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append("code", data.code);
    // formData.append("discountType", data.discountType);
    // formData.append("discountValue", data.discountValue);
    // formData.append("startDate", data.startDate);
    // formData.append("endDate", data.endDate);

    try {
      const response = await axios.post(
        `${config.apiUrl}/api/coupon/add`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        setData({
          code: "",
          discountType: "",
          discountValue: "",
          startDate: "",
          endDate: "",
        });
        toast.success(response.data.message);
        onAddCoupon();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("There was an error submitting the form", error);
      toast.error("An error occurred while adding coupon");
    }
    setShowAddCoupon(false);
  };

  return (
    <div className="coupon-popup">
      <form className="coupon-popup-container" onSubmit={onSubmitHandler}>
        <div className="coupon-popup-title">
          <h2>Add New Coupon</h2>
          <img
            onClick={() => setShowAddCoupon(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="coupon-popup-inputs">
          <input
            onChange={onChangeHandler}
            type="text"
            value={data.code}
            name="code"
            placeholder="Enter coupon Code"
            required
          />
          <select
            name="discountType"
            value={data.discountType}
            onChange={onChangeHandler}
            required
          >
            <option value="">Select Discount Type</option>
            <option value="percentage">Percentage(%)</option>
            <option value="fixed">Fixed</option>
          </select>
          <input
            onChange={onChangeHandler}
            type="text"
            value={data.discountValue}
            name="discountValue"
            placeholder="Enter Discount Value"
            required
          />
          <input
            onChange={onChangeHandler}
            type="date"
            value={data.startDate}
            name="startDate"
            placeholder="Enter coupon Start Date"
            required
          />
          <input
            onChange={onChangeHandler}
            type="date"
            value={data.endDate}
            name="endDate"
            placeholder="Enter coupon End Date"
            required
          />
        </div>
        <button type="submit">Add Coupon</button>
      </form>
    </div>
  );
};


AddCouponPopup.prototype = {
    setShowAddCoupon: PropTypes.func.isRequired,
   onAddCoupon: PropTypes.func.isRequired,
}
export default AddCouponPopup;
