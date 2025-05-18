import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Menu.css";
import config from "../../config/config";
import MenuList from "../../components/MenuList/MenuList";
import AddMenuPopUp from "../../components/AddMenuPopUp/AddMenuPopUp";
import ViewMenu from "../../components/ViewMenu/ViewMenu";
import EditMenu from "../../components/EditMenu/EditMenu";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  // const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState({});

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/menu/getFoods`);
      if (response.data.success) {
        setMenu(response.data.data);
      } else {
        toast.error("Error fetching menu");
      }
    } catch (error) {
      console.error("There was an error fetching the menu!", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleAddMenu = () => {
    fetchMenu();
  };

  const handleEditMenu = () => {
    fetchMenu();
  };

  return (
    <div className="add">
      <MenuList
        menu={menu}
        setShowAddMenu={setShowAddMenu}
        refreshMenu={fetchMenu}
        setShowViewMenu={setShowViewMenu}
        setShowEditMenu={setShowEditMenu}
        setSelectedMenu={setSelectedMenu}
      />
      {showAddMenu && (
        <AddMenuPopUp
          setShowAddMenu={setShowAddMenu}
          onAddMenu={handleAddMenu}
        />
      )}
      {showViewMenu && (
        <ViewMenu setShowViewMenu={setShowViewMenu} menuItem={selectedMenu} />
      )}

      {showEditMenu && (
        <EditMenu
          setShowEditMenu={setShowEditMenu}
          menuItem={selectedMenu}
          onEditMenu={handleEditMenu}
        />
      )}
    </div>
  );
};

export default Menu;
