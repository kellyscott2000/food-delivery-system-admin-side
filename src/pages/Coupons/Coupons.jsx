import { useEffect, useState } from "react";
import "./Coupons.css";
import axios from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";
import CouponList from "../../components/CouponList/CouponList";
import AddCouponPopup from "../../components/AddCouponPopup/AddCouponPopup";
import ViewCoupon from "../../components/ViewCoupon/ViewCoupon";
import EditCoupon from "../../components/EditCoupon/EditCoupon";

const Coupons = () => {
  const [coupon, setCoupon] = useState([]);
  const [showAddcoupon, setShowAddCoupon] = useState(false);
  const [showViewcoupon, setShowViewCoupon] = useState(false);
  const [showEditcoupon, setShowEditCoupon] = useState(false);
  const [selectedcoupon, setSelectedCoupon] = useState({});

  const fetchCoupon = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/coupon/get`);
      if (response.data.success) {
        setCoupon(response.data.data);
      } else {
        toast.error("Error fetching coupons");
      }
    } catch (error) {
      console.log("There was an error fetching the coupon!", error);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, []);

  const handleAddCoupon = () => {
    fetchCoupon();
  };

  const handleEditCoupon = () => {
    fetchCoupon();
  };

  return (
    <div className="add">
      <CouponList
        coupon={coupon}
        setShowAddCoupon={setShowAddCoupon}
        refreshCoupon={fetchCoupon}
        setShowViewCoupon={setShowViewCoupon}
        setShowEditCoupon={setShowEditCoupon}
        setSelectedCoupon={setSelectedCoupon}
      />
      {showAddcoupon && (
        <AddCouponPopup
          setShowAddCoupon={setShowAddCoupon}
          onAddCoupon={handleAddCoupon}
        />
      )}
      {showViewcoupon && (
        <ViewCoupon
          setshowViewCoupon={setShowViewCoupon}
          couponItem={selectedcoupon}
        />
      )}
      {showEditcoupon && (
        <EditCoupon
          setShowEditCoupon={setShowEditCoupon}
          couponItem={selectedcoupon}
          onEditCoupon={handleEditCoupon}
        />
      )}
    </div>
  );
};

export default Coupons;
