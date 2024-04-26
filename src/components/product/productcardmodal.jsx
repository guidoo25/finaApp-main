const ProductCardModal = ({ product }) => {
    return (
        <div className="product-card" style={{ width: '200px', height: '300px' }}>
            <img src={product.imagen} alt={product.nombre} style={{ width: '100%', height: '60%' }} />
            <div className="product-info" style={{ padding: '10px' }}>
                <h5 style={{ fontSize: '14px', margin: '0' }}>{product.nombre}</h5>
                <p style={{ fontSize: '12px', margin: '0' }}>{product.precio}</p>
            </div>
        </div>
    );
};

export default ProductCardModal;