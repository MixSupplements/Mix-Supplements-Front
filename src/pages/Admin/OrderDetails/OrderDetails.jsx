import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft } from '@fortawesome/free-regular-svg-icons';

import "./OrderDetails.css"
import axiosInstance from '../../../APIs/config';
import { faEnvelope, faHouse, faPhone, faTruck } from '@fortawesome/free-solid-svg-icons';

export default function OrderDetails() {
    const { orderNumber } = useParams();
    const [order, setOrder] = useState();
    const [statusTransitions] = useState({
        Pending: ['Confirmed', 'Cancelled'],
        Confirmed: ['Out for delivery', 'Cancelled'],
        'Out for delivery': ['Delivered', 'Cancelled'],
        Delivered: ['Completed'],
        Completed: [],
        Cancelled: []
    });
    const [statusTheme] = useState({
        Pending: 'secondary',
        Confirmed: 'info',
        'Out for delivery': 'warning',
        Delivered: 'primary',
        Completed: 'success',
        Cancelled: 'danger'
    });
    const [transitionAction, setTransitionAction] = useState({
        Confirmed: 'Confirm',
        'Out for delivery': 'Send for delivery',
        Delivered: 'Confirm delivery',
        Completed: 'Finish',
        Cancelled: 'Cancel'
    });

    const [refreshFlag, setRefreshFlag] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
        // axiosInstance need to be fixed
        axiosInstance
            .get('/order/' + orderNumber, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                setOrder(response.data);
            })
            .catch((error => console.log(error)));
    }, [refreshFlag])

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const getDeliveryDate = (createdAt, shippingDays) => {
        const date = new Date(createdAt);

        date.setDate(date.getDate() + shippingDays);

        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const capitalize = (string) => {
        return string?.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1))
    }

    const makeTransition = (transition) => {

        const confirmDelete = window.confirm(`Do you want the order to be ${transition} ?`);
        if (confirmDelete)
            axiosInstance
                .patch('/order/' + order._id, {
                    status: transition
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((response) => {
                    if (response.data.message === "Order status updated successfully")
                    {
                        // setTransitionAction("Done");
                        setRefreshFlag(!refreshFlag);
                    }
                })
                .catch((error => console.log(error)));
    }

    return (
        <div className='order-details'>
            <div className="header text-center text-sm-start">
                <span className='back-icon me-3' onClick={goBack}><FontAwesomeIcon icon={faSquareCaretLeft} size='2xl' /></span>
                <div className="head d-inline-block d-sm-block  ">Order: #{orderNumber}</div>
                <div className="mb-3 fs-6 ">
                    <span>Customer Name: <span className='fw-bold'>{order?.customer.name}</span></span>
                </div>
            </div>

            <div className='row'>
                <div className="col-12 col-lg-8">
                    <div className="table-container">
                        <table className='table table-striped text-center '>
                            <thead className='border-bottom border-top border-dark'>
                                <tr>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.products.map((product) => {
                                    return (
                                        <tr key={product?._id}>
                                            <td><img src={product?.image.imageUrl} alt="" className='rounded' style={{ width: '50px ' }} /></td>
                                            <td>{product?.name}</td>
                                            <td>{product?.price}</td>
                                            <td>{product?.quantity}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{product?.quantity * product?.price + " EGP"}</td>
                                        </tr>
                                    )
                                })}

                                <tr className='table-active fw-bold  border-bottom border-top border-dark'>
                                    <td colSpan={3}>Items subtotal :</td>
                                    <td colSpan={2} className='text-end'>{order?.totalPrice + " EGP"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="address-container mt-5">
                        <h4 className="mb-3 fw-bold">Shipping details</h4>
                        <div className="ms-4 row">
                            <div className='my-3 col-sm-6'>
                                <div className='d-flex align-items-center'>
                                    <FontAwesomeIcon className='pt-0 pe-md-1  ' icon={faEnvelope} />
                                    <h6 className='fw-bold m-0 '>Email</h6>
                                </div>
                                <a className='ms-5 d-block mt-2 ' href={"mailto:" + order?.customer.email}>{order?.customer.email}</a>
                            </div>
                            <div className='my-3 col-sm-6'>
                                <div className='d-flex align-items-center'>
                                    <FontAwesomeIcon className='pt-0 pe-md-1  ' icon={faPhone} />
                                    <h6 className='fw-bold m-0 '>Phone</h6>
                                </div>
                                {order?.customer.phoneNumbers.map(phone => {
                                    return (
                                        <a className='ms-5 d-block mt-2 ' href={"tel:+2" + phone}>{"+2" + phone}</a>
                                    )
                                })}
                            </div>
                            <div className='my-3 col-sm-6'>
                                <div className='d-flex align-items-center'>
                                    <FontAwesomeIcon className='pt-0 pe-md-1  ' icon={faTruck} />
                                    <h6 className='fw-bold m-0 '>Shipping Deadline</h6>
                                </div>
                                <span className='ms-5 d-block mt-2 '>{getDeliveryDate(order?.createdAt, order?.shipping.days)}</span>

                            </div>
                            <div className='my-3 col-sm-6'>
                                <div className='d-flex align-items-center'>
                                    <FontAwesomeIcon className='pt-0 pe-md-1  ' icon={faHouse} />
                                    <h6 className='fw-bold m-0 '>Address</h6>
                                </div>
                                <span className='ms-5 d-block mt-2 '>{order?.shippingAddress.street + ','}<br />{order?.shippingAddress.city + ','}<br /> {capitalize(order?.shippingAddress.governorate)}</span>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="summary card border-dark mb-3">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Summary</h3>
                            <div>
                                <div className="d-flex justify-content-between">
                                    <p className="text-900 fw-semi-bold">Items subtotal :</p>
                                    <p className="text-1100 fw-semi-bold">{order?.totalPrice + " EGP"}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="text-900 fw-semi-bold">Shipping Cost :</p>
                                    <p className="text-1100 fw-semi-bold">{order?.shipping.fees + " EGP"}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between border-dark border-top pt-4">
                                <h4 className="mb-0">Total :</h4>
                                <h4 className="mb-0">{(order?.totalPrice + order?.shipping.fees) + " EGP"}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card border-dark">
                        <div className="card-body">
                            <div className="card-title mb-3 d-flex align-items-center justify-content-between ">
                                <h3 className='d-inline-block'>Order Status</h3>
                                <span className={"badge fs-5  rounded-pill text-bg-" + statusTheme[order?.status]}>{order?.status}</span>
                            </div>
                            {(statusTransitions[order?.status] || transitionAction === "Done") && <div className={"d-flex flex-row-reverse border-dark border-top pt-3 " + (statusTransitions[order?.status].length === 1 ? 'justify-content-center' : 'justify-content-evenly')}>
                                {statusTransitions[order?.status].map((transition, index) => {
                                    return (
                                        <button key={transition} type="button"
                                            className={"transition text-light btn btn-sm fw-semibold  btn-" + (index === 0 ? 'success' : 'danger') + (transitionAction === "Done" ? 'secondary disabled' : '')}
                                            onClick={() => { makeTransition(transition) }}
                                        >{transitionAction[transition] || 'Done'}</button>
                                    )
                                })}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
