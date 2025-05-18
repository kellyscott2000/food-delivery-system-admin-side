/* eslint-disable react/prop-types */
import { useState } from "react";
import { assets } from "../../assets/assets";
import "./AddCategoryPopup.css";
import axios from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const AddCategoryPopup = ({ setShowAddCategory, onAddCategory }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${config.apiUrl}/api/category/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        setData({
          name: "",
        });
        setImage(null);
        toast.success(response.data.message);
        onAddCategory();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      toast.error("An error occurred whie");
    }
    setShowAddCategory(false);
  };

  return (
    <div className="category-popup">
      <form className="category-popup-container" onSubmit={onSubmitHandler}>
        <div className="category-popup-title">
          <h2>Add new Category</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowAddCategory(false)}
          />
        </div>
        <div className="category-popup-inputs">
          <input
            type="text"
            onChange={onChangeHandler}
            value={data.name}
            name="name"
            placeholder="Enter Category name"
            required
          />
          <label htmlFor="image">
            Choose Category Image
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              required
            />
          </label>
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

AddCategoryPopup.prototype = {
  setShowAddCategory: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
}
export default AddCategoryPopup;
