import { useState } from "react";
import { assets } from "../../assets/assets";
import "./AddMenuPopUp.css";
import axios from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useEffect } from "react";

const AddMenuPopUp = ({ setShowAddMenu, onAddMenu }) => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });


  useEffect(() => {
    const fetchCatgories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/category/get`);
        if(response.data.success) {
          setCategories(response.data.data)
        } else {
          toast.error("Failed to fetchh categories");
        }
      } catch (error) {
        console.log("Error fetching categories", error)
        toast.error("Error fetching categories")
      }
    }
    fetchCatgories();
  }, [])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${config.apiUrl}/api/menu/addFood`,
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
          description: "",
          price: "",
          category: "",
        });
        setImage(null);
        toast.success(response.data.message);
        onAddMenu();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      toast.error("An error occurred while adding the menu.");
    }

    setShowAddMenu(false);
  };

  return (
    <div className="menu-popup">
      <form className="menu-popup-container" onSubmit={onSubmitHandler}>
        <div className="menu-popup-title">
          <h2>Add New Menu</h2>
          <img
            onClick={() => setShowAddMenu(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="menu-popup-inputs">
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter Menu Name"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.price}
            type="number"
            name="price"
            step="0.01"
            min="1"
            placeholder="Enter Menu Price"
            required
          />
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Enter Menu Description"
            required
          />
          <select
            value={data.category}
            name="category"
            onChange={onChangeHandler}
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
            {/* Add more options as needed */}
          </select>
          <label htmlFor="image">
            Choose Menu Image
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
        <button type="submit">Add Menu</button>
      </form>
    </div>
  );
};

AddMenuPopUp.propTypes = {
  setShowAddMenu: PropTypes.func.isRequired,
  onAddMenu: PropTypes.func.isRequired,
};

export default AddMenuPopUp;
