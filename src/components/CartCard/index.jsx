import ProductCounter from '../ProductDetails/ProductCounter'

import './CartCard.css'

const CartCard = () => {
    return ( 
        <div className='row border border-white rounded-1 mb-2 py-3 px-2'>
            <div className='col-2'>
                <img className='img-fluid' src={process.env.PUBLIC_URL + 'images/image_512.png'} alt='Item in Cart' />
            </div>
            <div className='col-5 text-center d-flex flex-column justify-content-center'>
                <span>Max Muscle Amino Fuel-21Serv.-945Ml.-Pineapple Splash</span>
            </div>
            <div className='col-2 text-center d-flex flex-column justify-content-center'>
                <ProductCounter />
            </div>
            <div className='col-2 text-center d-flex flex-column justify-content-center'>
                <span>800 L.E</span>
            </div>
            <div className='col-1 text-start d-flex flex-column justify-content-center'>
                <i class="fa-solid fa-trash-can"></i>
            </div>
        </div>
     );
}
 
export default CartCard;