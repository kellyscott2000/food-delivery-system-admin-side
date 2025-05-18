/* eslint-disable react/prop-types */
import axios from "axios";
import "./CouponList.css";
import config from "../../config/config";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const CouponList = ({
  coupon,
  setShowAddCoupon,
  refreshCoupon,
  setShowViewCoupon,
  setShowEditCoupon,
  setSelectedCoupon,
}) => {
  const removeCoupon = async (couponId) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        const response = await axios.post(
          `${config.apiUrl}/api/coupon/delete`,
          {
            id: couponId,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          refreshCoupon();
        } else {
          toast.error("Error deleteing coupon");
        }
      } catch (error) {
        console.error("There was an error deleting the coupon item!", error);
        alert("An error occurred while deleting the coupon item.");
      }
    }
  };

  // Function to detrmine coupon status based on the end date

  const getCouponStatus = (endDate) => {
    const currentDate = new Date();
    const couponEndDate = new Date(endDate);

    return couponEndDate >= currentDate ? "Active" : "Closed";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA"); // "en-CA" for the format YYYY-MM-DD
  };

  return (
    <div className="coupon  flex-col">
      <button onClick={() => setShowAddCoupon(true)}>Add Coupon</button>
      <p className="coupon-title">Coupon List</p>
      <div className="coupon-table">
        <div className="coupon-table-format title">
          <b>S/N</b>
          <b>Code</b>
          <b>Discount Type</b>
          <b>Discount Value</b>
          <b>Start Date</b>
          <b>End Date</b>
          <b>Status</b>
          <b>Action</b>
        </div>
        {coupon.map((couponItem, index) => {
          return (
            <div className="coupon-table-format" key={index}>
              <h3>{index + 1}</h3>
              <p>{couponItem.code}</p>
              <p>{couponItem.discountType}</p>
              <p>{couponItem.discountValue}</p>
              <p>{formatDate(couponItem.startDate)}</p>
              <p>{formatDate(couponItem.endDate)}</p>
              <p>{getCouponStatus(couponItem.endDate)}</p>
              <div className="actions">
                <img
                  onClick={() => setShowViewCoupon(true)}
                  src={assets.view}
                  alt=""
                />
                <img
                  onClick={() => {
                    setSelectedCoupon(couponItem);
                    setShowEditCoupon(true);
                  }}
                  src={assets.edit}
                  alt=""
                />
                <img
                  onClick={() => removeCoupon(couponItem._id)}
                  src={assets.remove}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CouponList.propTypes = {
  coupon: PropTypes.array.isRequired,
  setShowAddCoupon: PropTypes.func.isRequired,
  refreshCoupon: PropTypes.func.isRequired,
  setSelectedCoupon: PropTypes.func.isRequired,
};

export default CouponList;
