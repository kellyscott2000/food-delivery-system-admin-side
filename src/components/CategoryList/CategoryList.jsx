/* eslint-disable react/prop-types */
import axios from "axios";
import "./CategoryList.css";
import config from "../../config/config";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const CategoryList = ({
  category,
  setShowAddCategory,
  refreshCategory,
  setShowViewCategory,
  setShowEditCategory,
  setSelectedCategory,
}) => {
  const removeCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await axios.post(
          `${config.apiUrl}/api/category/delete`,
          {
            id: categoryId,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          refreshCategory();
        } else {
          toast.error("Error deleting Category!");
        }
      } catch (error) {
        console.error(
          "There was an error deleting the selected category",
          error
        );
        alert("An error occured while deleting the category item.");
      }
    }
  };

  return (
    <div className="category">
      <button onClick={() => setShowAddCategory(true)}>Add Category</button>
      <p className="category-title">Category List</p>
      <div className="category-table">
        <div className="category-table-format title">
          <b>S/N</b>
          <b>Name</b>
          <b>Image</b>
          <b>Actions</b>
        </div>
        {category.map((items, index) => {
          return (
            <div className="category-table-format" key={index}>
              <h3>{index + 1}</h3>
              <p>{items.name}</p>
              <img src={`${config.apiUrl}/images/` + items.image} alt="" />
              <div className="actions">
                <img
                  src={assets.view}
                  alt=""
                  onClick={() => {
                    setShowViewCategory(true);
                    setSelectedCategory(items);
                  }}
                />
                <img
                  src={assets.edit}
                  alt=""
                  onClick={() => {
                    setSelectedCategory(items);
                    setShowEditCategory(true);
                  }}
                />
                <img
                  src={assets.remove}
                  alt=""
                  onClick={() => removeCategory(items)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
CategoryList.propTypes = {
  category: PropTypes.array.isRequired,
  setShowAddCategory: PropTypes.func.isRequired,
  refreshCategory: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};
export default CategoryList;
