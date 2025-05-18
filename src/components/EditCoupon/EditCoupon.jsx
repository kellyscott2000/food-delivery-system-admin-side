/* eslint-disable react/prop-types */
import { useState } from "react";
import "./EditCoupon.css";
import axios from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const EditCoupon = ({ setShowEditCoupon, couponItem, onEditCoupon }) => {
  const [code, setCode] = useState(couponItem.code || "");
  const [discountType, setDiscountType] = useState(
    couponItem.discountType || ""
  );
  const [discountValue, setDiscountValue] = useState(
    couponItem.discountValue || ""
  );
  const [startDate, setstartDate] = useState(couponItem.startDate || "");
  const [endDate, setendDate] = useState(couponItem.endDate || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", couponItem._id);
    formData.append("code", couponItem.code);
    formData.append("discountType", couponItem.discountType);
    formData.append("discountValue", couponItem.discountValue);
    formData.append("startDate", couponItem.startDate);
    formData.append("endDate", couponItem.discountType);

    try {
      const response = await axios.put(
        `${config.apiUrl}/api/coupon/update/${couponItem._id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        onEditCoupon();
        setShowEditCoupon(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("There was an error updating the coupon item", error);
      toast.error("An error occurred while updating the coupon item");
    }
  };

  return (
    <div className="edit-popup">
      <form className="edit-popup-container" onSubmit={handleSubmit}>
        <div className="edit-popup-title">
          <h2>Edit Coupon</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowEditCoupon(false)}
          />
        </div>
        <div className="edit-popup-inputs">
          <input
            type="text"
            placeholder="Coupon code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option value="percentage">Percentage(%)</option>
            <option value="fixed">Fixed</option>
          </select>
          <input
            type="text"
            placeholder="Coupon dicount Value"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />
          <input
            type="date"
            placeholder="Coupon start date"
            value={startDate}
            onChange={(e) => setstartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="Coupon end date"
            value={endDate}
            onChange={(e) => setendDate(e.target.value)}
          />
        </div>
        <button type="submit">Edit Coupon</button>
      </form>
    </div>
  );
};

export default EditCoupon;
