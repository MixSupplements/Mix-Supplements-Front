import React from 'react'
import './orders.css'
import { NavLink, Outlet } from 'react-router-dom'

export default function Orders() {
    return (
        <div className='orders-page container-md text-center pt-5'>
            <div className="btn-group orders-nav-links w-100 row">
                <NavLink to="/Admin/Dashboard/Orders/Pending" className="col-2 btn btn-sm btn-outline-dark">New</NavLink>
                <NavLink to="/Admin/Dashboard/Orders/Confirmed" className="col-2 btn btn-sm btn-outline-dark">Ready For Delivery</NavLink>
                <NavLink to="/Admin/Dashboard/Orders/Out-for-delivery" className="col-2 btn btn-sm btn-outline-dark">Out For Delivery</NavLink>
                <NavLink to="/Admin/Dashboard/Orders/Delivered" className="col-2 btn btn-sm btn-outline-dark">Delivered</NavLink>
                <NavLink to="/Admin/Dashboard/Orders/Completed" className="col-2 btn btn-sm btn-outline-dark">Completed</NavLink>
            </div>
            <div className="pt-5">
                <Outlet />
            </div>
        </div>
    )
}
