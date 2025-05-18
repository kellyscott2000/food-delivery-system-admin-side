/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import "./Customers.css";
import config from "../../config/config";
import { toast } from "react-toastify";
import { useEffect } from "react";
import UsersList from "../../components/UsersList/UsersList";

const Customers = () => {
  const [customer, setCustomer] = useState([]);
  const [showViewCustomer, setShowViewCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/user/users`);
      if (response.data.success) {
        setCustomer(response.data.users);
        // console.log("response: ", response.data.users)
      } else {
        toast.error("Error fetcing users");
      }
    } catch (error) {
      console.log("There was an error fetching the customers", error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);



  return(
    <div className="add">
      <UsersList customer={customer}/>
    </div>
  )
};

export default Customers;
