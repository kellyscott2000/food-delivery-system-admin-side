import { useEffect, useState } from "react";
import CategoryList from "../../components/CategoryList/CategoryList";
import "./Categories.css";
import axios from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";
import AddCategoryPopup from "../../components/AddCategoryPopup/AddCategoryPopup";
import EditCategory from "../../components/EditCategory/EditCategory";
import ViewCategory from "../../components/ViewCategory/ViewCategory";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showViewCategory, setShowViewCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/category/get`);
      if (response.data.success) {
        setCategory(response.data.data);
      } else {
        toast.error("Error fetching category");
      }
    } catch (error) {
      console.error("There was an error fetching category!", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleAddCatgeory = () => {
    fetchCategory();
  };

  const handleEditCategory = () => {
    fetchCategory();
  };

  return (
    <div className="add">
      <CategoryList
        category={category}
        setShowAddCategory={setShowAddCategory}
        refreshCategory={fetchCategory}
        setShowEditCategory={setShowEditCategory}
        setSelectedCategory={setSelectedCategory}
        setShowViewCategory={setShowViewCategory}
      />

      {showAddCategory && (
        <AddCategoryPopup
          setShowAddCategory={setShowAddCategory}
          onAddCategory={handleAddCatgeory}
        />
      )}

      {showViewCategory && (
        <ViewCategory
         setShowViewCategory={setShowViewCategory}
          categoryItem={selectedCategory}
        />
      )}

      {showEditCategory && (
        <EditCategory
          setShowEditCategory={setShowEditCategory}
          categoryItem={selectedCategory}
          onEditCategory={handleEditCategory}
        />
      )}
    </div>
  );
};

export default Categories;
