
import { assets } from "../../assets/assets";
import PropTypes from 'prop-types';
import config from "../../config/config";
import "./ViewCategory.css";

const ViewCategory = ({ setShowViewCategory, categoryItem }) => {
  return (
    <div className="view-popup">
      <form action="" className="view-popup-container">
        <div className="view-popup-title">
          <h2>View Category</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowViewCategory(false)}
          />
        </div>
        <div className="view-popup-inputs">
          <input
            type="text"
            placeholder="Category Name"
            value={categoryItem.name || ""}
            readOnly
          />
          <label htmlFor="image">
            Category Image
            <img
              src={
                categoryItem.image
                  ? `${config.apiUrl}/images/${categoryItem.image}`
                  : assets.upload_area
              }
              alt=""
            />
          </label>
        </div>
      </form>
    </div>
  );
};

ViewCategory.propTypes = {
    setShowViewCategory: PropTypes.func.isRequired,
    categoryItem: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
    })
}

export default ViewCategory;
