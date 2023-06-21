import { useEffect } from "react";
import CartCard from "../../components/CartCard";

const Cart = () => {
    useEffect(() => {
        window.scrollTo(0,0);
      },[])
    return ( 
        <div className="text-center">
            <h2>My Cart</h2>
            <div className="cart-content row pt-5">
                <div className="cart-items text-start col-md-9">
                    <CartCard />
                    <CartCard />
                    <CartCard />
                    <CartCard />
                    <CartCard />
                    <CartCard />
                    <CartCard />
                    <CartCard />
                    <CartCard />
                    <button className="btn home-button">Proceed  To Checkout</button>
                </div>
                <div className="cart-total  col-md-3">
                    <div className="border border-white p-3 text-start rounded-2">
                        <h5><i className="fa-solid fa-bag-shopping"></i> Order Total</h5>
                        <div className="row py-3">
                            <span className="col-6">Total Items:</span>
                            <span className="col-6 text-end">5</span>
                        </div>
                        <div className="row py-3">
                            <span className="col-6">Total Price:</span>
                            <span className="col-6 text-end">5200 L.E</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;