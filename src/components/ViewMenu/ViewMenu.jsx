import { assets } from "../../assets/assets";
import PropTypes from 'prop-types';
import config from "../../config/config";
import "./ViewMenu.css";

const ViewMenu = ({ setShowViewMenu, menuItem }) => {
  
 
  
  
  return (
    <div className="view-popup">
      <form className="view-popup-container">
        <div className="view-popup-title">
          <h2>View Menu</h2>
          <img
            onClick={() => setShowViewMenu(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="view-popup-inputs">
          <input
            type="text"
            placeholder="Menu Name"
            value={menuItem.name || ""}
            readOnly
          />
          <input
            type="text"
            placeholder="Menu Price"
            value={`₵${parseFloat(menuItem.price || 0).toFixed(2)}`}
            readOnly
          />
          <input
            type="text"
            placeholder="Menu Name"
            value={menuItem.status || ""}
            readOnly
          />
          <textarea
            value={menuItem.description || ""}
            rows="6"
            placeholder="Menu description"
            readOnly
          />
          <select defaultValue={menuItem.category} name="" id="" disabled>
            <option value="Rice">Rice</option>
            <option value="Beans">Beans</option>
            <option value="Drinks">Drinks</option>
            <option value="Swallow">Swallow</option>
          </select>

          <label htmlFor="image">
            Menu Image
            <img
              src={
                menuItem.image
                  ? `${config.apiUrl}/images/${menuItem.image}`
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


ViewMenu.propTypes = {
  setShowViewMenu: PropTypes.func.isRequired,
  menuItem: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default ViewMenu;
