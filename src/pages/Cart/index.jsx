import { useEffect } from "react";
import CartCard from "../../components/CartCard";
import { useSelector } from "react-redux";

import styles from "../../styles/userProfile/userWishlist.module.css";

const Cart = () => {
    useEffect(() => {
        window.scrollTo(0,0);
      },[]);

    const cart = useSelector(store => store.cart);

    let showItems = [];
    let emptyCart = true;
    if(cart.cartItems.length === 0){
        showItems = <div className={styles["empty-placeholder"]}>No Product Found</div>;
    }else{
        emptyCart = false;
        cart.cartItems.map(item => {
            return(
                showItems.push(<CartCard key={item.item._id} item={item.item} />)
            )
        })
    }

    return ( 
        <div className="text-center">
            <h2>My Cart</h2>
            <div className="cart-content row pt-5">
                <div className="cart-items text-start col-md-9 mb-3">
                    { showItems }
                    <button className="btn home-button" disabled={emptyCart}>Proceed  To Checkout</button>
                </div>
                <div className="cart-total  col-md-3">
                    <div className="border border-white p-3 text-start rounded-2">
                        <h5><i className="fa-solid fa-bag-shopping"></i> Order Total</h5>
                        <div className="row py-3">
                            <span className="col-6">Total Items:</span>
                            <span className="col-6 text-end">{ cart.count }</span>
                        </div>
                        <div className="row py-3">
                            <span className="col-6">Total Price:</span>
                            <span className="col-6 text-end">{ cart.totalPrice } L.E</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;