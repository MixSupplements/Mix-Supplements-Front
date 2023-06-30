import { useSelector } from "react-redux";
import styles from "../../styles/userProfile/accountDetails.module.css";
import './checkout.css'
import OrderCard from "../../components/OrderCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../APIs/config";

const Checkout = () => {
    const [userDetails, setUserDetails] = useState({});
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
            })
            .catch((error) => console.log(error));
    }, []);
    const cart = useSelector(store => store.cart);
    const currencyFormat = (price) => {
        return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
    };
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
                        <select className={`${styles["main-field"]} ${styles["inner-field"]} w-100 text-white`}>
                                {
                                    userDetails.addresses?.map(address => {
                                        return <option key={address.street}>{address.governorate}, {address.city}, {address.street}</option>
                                    })
                                }
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <button className="btn home-button w-100">Confirm</button>
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