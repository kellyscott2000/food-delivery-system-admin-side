/* eslint-disable react/prop-types */
import { useState } from "react";
import { assets } from "../../assets/assets";
import "./EditMenu.css";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config/config";
import { useEffect } from "react";

const EditMenu = ({ setShowEditMenu, menuItem, onEditMenu }) => {
  const [name, setName] = useState(menuItem.name || "");
  const [price, setPrice] = useState(menuItem.price || "");
  const [description, setDescription] = useState(menuItem.description || "");
  const [category, setCategory] = useState(menuItem.category || "");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/category/get`);
        if (response.data.success) {
          setCategories(response.data.data); 
        } else {
          toast.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories", error);
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", menuItem._id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${config.apiUrl}/api/menu/updateFood/${menuItem._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        onEditMenu();
        setShowEditMenu(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error updating the menu item!", error);
      toast.error("An error occurred while updating the menu item.");
    }
  };

  return (
    <div className="edit-popup">
      <form className="edit-popup-container" onSubmit={handleSubmit}>
        <div className="edit-popup-title">
          <h2>Edit Menu</h2>
          <img
            onClick={() => setShowEditMenu(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="edit-popup-inputs">
          <input
            type="text"
            placeholder="Menu Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Menu Price"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name=""
            id=""
            rows="6"
            placeholder="Menu description"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <label htmlFor="image">
            Menu Image
            <img src={assets.upload_area} alt="" />
            <input type="file" id="image" onChange={handleFileChange} />
          </label>
        </div>
        <button type="submit">Edit Menu</button>
      </form>
    </div>
  );
};

export default EditMenu;
