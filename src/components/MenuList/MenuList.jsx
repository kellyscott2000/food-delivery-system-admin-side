/* eslint-disable react/prop-types */
import "./MenuList.css";
import config from "../../config/config.js";
import PropTypes from "prop-types";
import axios from "axios";
import { assets } from "../../assets/assets.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const MenuList = ({
  menu,
  setShowAddMenu,
  refreshMenu,
  setShowViewMenu,
  setShowEditMenu,
  setSelectedMenu,
}) => {
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/category/get`);
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          toast.error("Error fetching categories");
        }
      } catch (error) {
        console.error("There was an error fetching the categories!", error);
        toast.error("An error occurred while fetching categories.");
      }
    };

    fetchCategories();
  }, []);

  // Filter menu items based on selected category
  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter((item) => item.category === selectedCategory);

  const removeMenu = async (foodId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await axios.post(
          `${config.apiUrl}/api/menu/deleteFood`,
          {
            id: foodId,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          refreshMenu();
        } else {
          toast.error("Error deleteing Menu");
        }
      } catch (error) {
        console.error("There was an error deleting the menu item!", error);
        alert("An error occurred while deleting the menu item.");
      }
    }
  };
  return (
    <div className="menu flex-col">
      <button onClick={() => setShowAddMenu(true)}>Add Menu</button>
      <p className="menu-title">Menu List</p>
      <div className="sort">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="menu-table">
        <div className="menu-table-format title">
          <b>S/N</b>
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Status</b>
          <b>Action</b>
        </div>
        {filteredMenu.map((menuItem, index) => {
          return (
            <div key={index} className="menu-table-format">
              <h3>{index + 1}</h3>
              <img src={`${config.apiUrl}/images/` + menuItem.image} alt="" />
              <p>{menuItem.name}</p>
              {/* <p>₵{menuItem.price}</p> */}
              <p>₵{parseFloat(menuItem.price).toFixed(2)}</p>
              {/* <p>{menuItem.status}</p> */}

              <select
                value={menuItem.status}
                onChange={async (e) => {
                  try {
                    const response = await axios.put(
                      `${config.apiUrl}/api/menu/updateFood/${menuItem._id}`,
                      {
                        status: e.target.value,
                      }
                    );
                    if (response.data.success) {
                      toast.success("Status updated successfully!");
                      refreshMenu(); // Refresh the menu to reflect the status change
                    } else {
                      toast.error("Error updating status");
                    }
                  } catch (error) {
                    console.error(
                      "There was an error updating the status!",
                      error
                    );
                    alert("An error occurred while updating the status.");
                  }
                }}
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>

              <div className="actions">
                <img
                  onClick={() => {
                    setShowViewMenu(true);
                    setSelectedMenu(menuItem);
                  }}
                  src={assets.view}
                  alt=""
                />

                <img
                  onClick={() => {
                    setSelectedMenu(menuItem);
                    setShowEditMenu(true);
                  }}
                  src={assets.edit}
                  alt=""
                />

                <img
                  onClick={() => removeMenu(menuItem._id)}
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

MenuList.propTypes = {
  menu: PropTypes.array.isRequired,
  setShowAddMenu: PropTypes.func.isRequired,
  refreshMenu: PropTypes.func.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
};

export default MenuList;
