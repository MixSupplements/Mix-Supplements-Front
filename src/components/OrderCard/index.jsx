const OrderCard = ({ item, count }) => {
    const currencyFormat = (price) => {
        return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
    };

    return ( 
        <div className="row mb-2 py-3 px-2 fw-bold justify-content-between">
            <div className="col-2 p-0">
                <img
                    className="img-fluid"
                    src={
                        item.images[0]
                            ? item.images[0].imageUrl
                            : process.env.PUBLIC_URL + "images/512x512.png"
                    }
                    alt="Item in Cart"
                />
            </div>
            <div className="col-6 text-center d-flex flex-column justify-content-center p-0">
                <span>{item.name}</span>
            </div>
            <div className="col-2 text-center d-flex flex-column justify-content-center p-0">
                <span>x{count}</span>
            </div>
            <div className="col-2 text-center d-flex flex-column justify-content-center p-0">
                <span>{currencyFormat(item.price)} LE</span>
            </div>
        </div>
     );
}
 
export default OrderCard;