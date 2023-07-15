import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/userProfile/accountDetails.module.css";
import './checkout.css'
import OrderCard from "../../components/OrderCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../APIs/config";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../redux/slices/cart";
import { setToken } from "../../redux/slices/token";

const Checkout = () => {
    const [userDetails, setUserDetails] = useState({});
    const [selectedValue, setSelectedValue] = useState({});
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const handleAddressChange = (event) => {
        const value = JSON.parse(event.target.value);
        setSelectedValue(value);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        axiosInstance
            .get("/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setUserDetails(res.data);
                setSelectedValue(res.data.addresses[0])
            })
            .catch((error) => {
                console.log(error);
                if(error.response?.data?.error?.status === 402) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("cart");
                    localStorage.removeItem("wishlist");
                    dispatcher(setToken(""));
                    dispatcher(resetCart());
                    navigate(`/login`);
                }});
    }, []);
    const cart = useSelector(store => store.cart);
    const currencyFormat = (price) => {
        return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
    };
    let orderProducts = cart.cartItems.map(item => {
        return {
            _id: item.product._id,
            quantity: item.quantity
        }
    })
    const confirmOrder = () => {
        axiosInstance.post('/order',{
            customerId: userDetails._id,
            products: orderProducts,
            totalPrice: cart.totalPrice,
            shippingAddress: selectedValue
        })
        .then(res => {
            axiosInstance.delete('/cart');
            localStorage.removeItem('cart')
            dispatcher(resetCart());
            navigate('/user/orders')
        })
        .catch((error) => {
            console.log(error);
            if(error.response?.data?.error?.status === 402) {
                localStorage.removeItem("token");
                localStorage.removeItem("cart");
                localStorage.removeItem("wishlist");
                dispatcher(setToken(""));
                dispatcher(resetCart());
                navigate(`/login`);
            }});
    }
    return ( 
        <div className="row">
            <div className=" col-lg-6">
                <h3 className={styles["field-title"]}>Delivery Info</h3>
                <div className="row border border-white p-3 mt-3 rounded-1">
                    <div className="col-6 py-1">
                        <h4 className={styles["field-title"]}>Name</h4>
                        <div className={`${styles["main-field"]} ${styles["inner-field"]}`}>
                                <span>{`${userDetails.firstName} ${userDetails.lastName}`}</span>
                        </div>
                    </div>
                    <div className="col-6 py-1">
                        <h4 className={styles["field-title"]}>Phone Number</h4>
                        <div className={`${styles["main-field"]} ${styles["inner-field"]}`}>
                                <span>{userDetails.phoneNumbers? userDetails.phoneNumbers[0]: 0}</span>
                        </div>
                    </div>
                    <div className="col-6 py-1">
                        <h4 className={styles["field-title"]}>Email</h4>
                        <div className={`${styles["main-field"]} ${styles["inner-field"]}`}>
                                <span>{userDetails.email}</span>
                        </div>
                    </div>
                    <div className="col-6 py-1 checkout-address-options">
                        <h4 className={styles["field-title"]}>Address</h4>
                        <select className={`${styles["main-field"]} ${styles["inner-field"]} w-100 text-white`} onChange={handleAddressChange}>
                                {
                                    userDetails.addresses?.map(address => {
                                        return <option key={address.street} value={`{"governorate": "${address.governorate}", "city": "${address.city}", "street": "${address.street}"}`}>{address.governorate}, {address.city}, {address.street}</option>
                                    })
                                }
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <button className="btn home-button w-100" onClick={() => {confirmOrder()}}>Confirm Order</button>
                </div>
            </div>
            <div className="col-lg-6 p-0 pt-5 pt-lg-0 ps-lg-2">
                <h3 className={styles["field-title"]}>Order Summary</h3>
                <div className="border border-white rounded-1 mt-3 p-3">
                    <div className="order-items">
                        {cart.cartItems.map(item => {
                            return <OrderCard key={item.product._id} item={item.product} count={item.quantity} />
                        })}
                    </div>
                    <div className="row fw-bold fs-5 mt-5">
                        <div className="col-6 ps-5 text-start">Total</div>
                        <div className="col-6 pe-5 text-end">{currencyFormat(cart.totalPrice)} L.E</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Checkout;