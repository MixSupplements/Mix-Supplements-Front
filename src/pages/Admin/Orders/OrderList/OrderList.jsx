
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setToken } from '../../../../redux/slices/token';
import { resetCart } from '../../../../redux/slices/cart';
import moment from 'moment/moment';

import "./OrderList.css";
import axiosInstance from '../../../../APIs/config';

export default function OrderList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { status } = useParams();     //used in API call

    const [orders, setOrders] = useState([]);
    // const [page, setPage] = useState(1);   // ToDo

    useEffect(() => {
        status = status?.replace(/-/g, ' ');
        setOrders([]);  //to reset the list when the tab changes
        let token = localStorage.getItem('token');
        axiosInstance
            .get('/orders/' + (status ?? ''), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setOrders(response.data)
            })
            .catch((error) => {
                console.log(error);
                if(error.response?.data?.error?.status === 402) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("cart");
                    localStorage.removeItem("wishlist");
                    dispatch(setToken(""));
                    dispatch(resetCart());
                    navigate(`/login`);
                }});
    }, [status])

    return (
        <table className="table table-striped table-hover">
            <thead className='table-dark'>
                <tr>
                    <th>Order Number</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Last Update</th>
                </tr>
            </thead>
            <tbody>
                {!orders.length && <tr><td colSpan={5}>No orders yet</td></tr>}
                {orders.map(((order) => {
                    return (
                        <tr key={order.orderNumber}>
                            <td>
                                <Link to={`/Admin/Dashboard/Order/${order.orderNumber}`}>
                                    <div>{order.orderNumber}</div>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/Admin/Dashboard/Order/${order.orderNumber}`}>
                                    <div className=''>{order.status}</div>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/Admin/Dashboard/Order/${order.orderNumber}`}>
                                    <div>{order.customerName}</div>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/Admin/Dashboard/Order/${order.orderNumber}`}>
                                    <div>{order.totalPrice}</div>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/Admin/Dashboard/Order/${order.orderNumber}`}>
                                    <div>{moment(order.updatedAt).fromNow()}</div>
                                </Link>
                            </td>
                        </tr>

                    )
                }))}
            </tbody>
        </table>
    )
}
