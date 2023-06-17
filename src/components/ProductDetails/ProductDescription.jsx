const ProductDescription = ({ product }) => {
    return (
        <div className="row" style={{ marginTop: `var(--size-600)` }}>
            <div className="col">
                <h3 style={{ marginBottom: `var(--size-400)` }}>Description</h3>
                <div style={{ marginLeft: `var(--size-400)` }}>
                    {Object.entries(product.description).map(([key, val]) => {
                        return (
                            <div>
                                <h5>{key}:</h5>
                                {Array.isArray(val) ? (
                                    <ul>
                                        {val.map((b) => (
                                            <li key={b}>{b}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>{val}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;
