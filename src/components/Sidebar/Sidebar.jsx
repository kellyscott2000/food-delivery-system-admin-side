import {NavLink} from 'react-router-dom'
import { assets } from '../../assets/assets';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
      <NavLink to="/" className="sidebar-option">
          <img src={assets.dashboard} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/menu" className="sidebar-option">
          <img src={assets.menu} alt="" />
          <p>Menu</p>
        </NavLink>
        <NavLink to="/categories" className="sidebar-option">
          <img src={assets.categories} alt="" />
          <p>Menu Categories</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.orders} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/customers" className="sidebar-option">
          <img src={assets.customers} alt="" />
          <p>Customers</p>
        </NavLink>
        <NavLink to="/coupons" className="sidebar-option">
          <img src={assets.coupons} alt="" />
          <p>Coupons</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar