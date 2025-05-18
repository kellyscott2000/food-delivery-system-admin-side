/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

import "./EditCategory.css";
import config from "../../config/config";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const EditCategory = ({
  setShowEditCategory,
  categoryItem,
  onEditCategory,
}) => {
  const [name, setName] = useState(categoryItem.name || "");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", categoryItem._id);
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${config.apiUrl}/api/category/update/${categoryItem._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        onEditCategory();
        setShowEditCategory(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error updating the category", error);
      toast.error("An error occured while updating the category");
    }
  };

  return (
    <div className="edit-popup">
      <form onSubmit={handleSubmit} className="edit-popup-container">
        <div className="edit-popup-title">
          <h2>Edit Category</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowEditCategory(false)}
          />
        </div>
        <div className="edit-popup-inputs">
          <input
            type="text"
            placeholder="Catgeory name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="image">
            Category Image
            <img src={assets.upload_area} alt="" />
            <input type="file" id="image" onChange={handleFileChange} />
          </label>
        </div>
        <button type="submit">Edit Category</button>
      </form>
    </div>
  );
};

export default EditCategory;
