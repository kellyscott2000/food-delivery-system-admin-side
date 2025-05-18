
import { assets } from "../../assets/assets";
import "./ViewCoupon.css";
import PropTypes from "prop-types";

const ViewCoupon = ({ setshowViewCoupon, couponItem }) => {


  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-');
    return `${year}-${month}-${day}`;
  };

  const discountType = couponItem?.discountType || "percentage";

  return (
    <div className="view-popup">
      <form className="view-popup-container">
        <div className="view-popup-title">
          <h2>View Coupon</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setshowViewCoupon(false)}
          />
        </div>
        <div className="view-popup-inputs">
          <input
            type="text"
            placeholder="Coupon code"
            value={couponItem.code || ""}
            readOnly
          />
          
          <select
            name="discountType"
            id="discountType"
            value={discountType}
            disabled
          >
            <option value="percentage">Percentage(%)</option>
            <option value="fixed">Fixed</option>
          </select>
          <input
            type="text"
            placeholder="Coupon discount value"
            value={couponItem.discountValue || ""}
            readOnly
          />
          <input
            type="date"
            placeholder="Coupon start date"
            value={formatDate(couponItem.startDate)}
            readOnly
          />
          <input
            type="date"
            placeholder="Coupon end date"
            value={formatDate(couponItem.endDate)}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};


ViewCoupon.propTypes = {
  setshowViewCoupon: PropTypes.func.isRequired,
  couponItem: PropTypes.shape({
    code: PropTypes.string,
    discountType: PropTypes.string,
    discountValue: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
};

export default ViewCoupon;
