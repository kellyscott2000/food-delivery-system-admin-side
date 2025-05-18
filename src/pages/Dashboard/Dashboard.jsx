/* eslint-disable no-unused-vars */
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import config from "../../config/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFoodList, setTotalFoodList] = useState(0);
  const [totalCouponList, setTotalCouponList] = useState(0);
  const [totalAvailableCoupon, setTotalAvailableCoupon] = useState(0);
  const [totalPickedUpOrders, setTotalPickedUpOrders] = useState(0);
  const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(0);
  const [totalCategoryList, setTotalCategoryList] = useState(0);
  // const [lineChartData, setLineChartData] = useState(0);
  // const [barChartData, setBarChartData] = useState(0);
  // const [pieChartData, setPieChartData] = useState(0);
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Order Count",
        data: [], // Initialize with an empty array
        borderColor: "rgba(218, 165, 32, 1)",
        backgroundColor: "rgba(250, 250, 210, 1)",
      },
    ],
  });

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [], // Initialize with an empty array
        backgroundColor: "rgba(250, 250, 210, 1)",
        borderColor: "rgba(184, 134, 11, 1)",
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales Distribution",
        data: [], // Initialize with an empty array
        backgroundColor: [
          "rgba(218, 165, 32, 1)",
          "rgba(184, 134, 11, 1)",
          "rgba(240, 230, 140, 1)",
          "rgba(250, 250, 210, 1)",
        ],
      },
    ],
  });

  // get the total number of items in the orders table

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/order/total`);

        const data = await response.json();
        if (data.success) {
          setTotalOrders(data.totalOrders);
          setTotalPickedUpOrders(data.pickedUpOrders);
          setTotalDeliveredOrders(data.deliveredOrders);
        }
      } catch (error) {
        console.error("Error fetching order counts:", error);
      }
    };

    fetchTotalOrders();
  }, []);

  // get pending orders

  useEffect(() => {
    const fetchTotalPendingOrders = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/order/pending`);

        const data = await response.json();
        if (data.success) {
          setPendingOrders(data.pendingOrders);
        }
      } catch (error) {
        console.error("Error fetching order counts:", error);
      }
    };

    fetchTotalPendingOrders();
  }, []);

  // get the total number of items in the user field

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/user/total`);
        const data = await response.json();
        if (data.success) {
          setTotalUsers(data.totalUsers);
        }
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  // get the total number of items in the menu list

  useEffect(() => {
    const fetchTotalFoodList = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/menu/total`);
        const data = await response.json();
        if (data.success) {
          setTotalFoodList(data.totalFoodList);
        }
      } catch (error) {
        console.error("Error fetching total menu:", error);
      }
    };

    fetchTotalFoodList();
  }, []);

  // get total closed list

  useEffect(() => {
    const fetchTotalCouponList = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/coupon/closed`);
        const data = await response.json();
        if (data.success) {
          setTotalCouponList(data.totalClosed);
        }
      } catch (error) {
        console.error("Error fetching total menu:", error);
      }
    };

    fetchTotalCouponList();
  }, []);

  // get total available coupon
  useEffect(() => {
    const fetchTotalAvailableCoupon = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/coupon/available`);
        const data = await response.json();
        if (data.success) {
          setTotalAvailableCoupon(data.totalAvailable);
        }
      } catch (error) {
        console.error("Error fetching total menu:", error);
      }
    };

    fetchTotalAvailableCoupon();
  }, []);

  // get the total number of items in the category
  useEffect(() => {
    const fetchTotalCategoryList = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/category/total`);
        const data = await response.json();
        if (data.success) {
          setTotalCategoryList(data.totalCategoryList);
        }
      } catch (error) {
        console.error("Error fetching total category:", error);
      }
    };

    fetchTotalCategoryList();
  }, []);

  const fetchChartData = async () => {
    try {
      const ordersResponse = await fetch(`${config.apiUrl}/api/order/chart`);
      const ordersData = await ordersResponse.json();

      if (ordersData.success) {
        setLineChartData({
          labels: ordersData.labels,
          datasets: [
            {
              ...lineChartData.datasets[0],
              data: ordersData.values,
            },
          ],
        });
      }

      // Fetch data for bar chart (revenue per month)
      const revenueResponse = await fetch(`${config.apiUrl}/api/order/revenue`);
      const revenueData = await revenueResponse.json();

      if (revenueData.success) {
        setBarChartData({
          labels: revenueData.labels,
          datasets: [
            {
              ...barChartData.datasets[0],
              data: revenueData.values,
            },
          ],
        });
      }

      // Fetch data for pie chart (sales distribution)
      const salesResponse = await fetch(`${config.apiUrl}/api/order/sales`);
      const salesData = await salesResponse.json();

      if (salesData.success) {
        setPieChartData({
          labels: salesData.labels,
          datasets: [
            {
              ...pieChartData.datasets[0],
              data: salesData.values,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="add">
      <div className="dashboard-header">Admin Dashboard</div>
      <div className="stat-cards">
        <div className="card">
          <div className="image">
            <img src={assets.order_icon} alt="" />
          </div>
          <div className="text">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
        </div>

        <div className="card">
          <div className="image">
            <img src={assets.order_icon} alt="" />
          </div>
          <div className="text">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
        </div>

        <div className="card">
          <div className="image">
            <img src={assets.order_icon} alt="" />
          </div>
          <div className="text">
            <h3>Total Food List</h3>
            <p>{totalFoodList}</p>
          </div>
        </div>

        <div className="card">
          <div className="image">
            <img src={assets.order_icon} alt="" />
          </div>
          <div className="text">
            <h3>Total Menu List</h3>
            <p>{totalCategoryList}</p>
          </div>
        </div>

        <div className="card">
          <div className="image">
            <img src={assets.order_icon} alt="" />
          </div>
          <div className="text">
            <h3>Complete Orders</h3>
            <p>{totalPickedUpOrders + totalDeliveredOrders}</p>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src={assets.order_icon} alt="" />
          </div>
          <div className="text">
            <h3>Pending Orders</h3>
            <p>{pendingOrders} </p>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src={assets.order_icon} alt="" />
          </div>
          <div className="text">
            <h3>Available Coupons</h3>
            <p>{totalAvailableCoupon}</p>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src={assets.order_icon} alt="" />
          </div>
          <div className="text">
            <h3>Closed Coupons</h3>
            <p>{totalCouponList}</p>
          </div>
        </div>
      </div>

      <div className="chart-container">
        {barChartData ? (
          <Bar data={pieChartData} className="chart" />
        ) : (
          <p>Loading bar chart...</p>
        )}

        {lineChartData ? (
          <Line data={lineChartData} className="chart" />
        ) : (
          <p>Loading line chart...</p>
        )}
      </div>
      {/* <div className="chart-container">
        {pieChartData ? (
          <Pie data={barChartData} className="chart" />
        ) : (
          <p>Loading pie chart...</p>
        )}
      </div> */}

      <div className="table-container">
        {/* Insert table component for recent orders here */}
      </div>
    </div>
  );
};

export default Dashboard;
