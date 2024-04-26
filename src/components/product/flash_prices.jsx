import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './productflassh.css';
import PriceHistoryModal from './pricehistorialmodal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './path-to-card-component';

const ProductGridFlashsale = ({ products, setPage, page, hasMore }) => {
    if (!products) {
        return <div>Loading...</div>;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const fetchSimilarProducts = async (productId) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/similares/${productId}`);
        const data = await response.json();
        setSimilarProducts(data);
    };

    const fetchPriceHistory = async (productId) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${productId}/historial-precios`);
        const data = await response.json();
        setHistoryData(data);
        setIsModalOpen(true);
    };

    const handleProductClick = (productId) => {
        fetchPriceHistory(productId);
        fetchSimilarProducts(productId);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {isMobile ? (
                <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay interval={3000} centerMode centerSlidePercentage={100}>
                    {products.map((producto, index) => (
                        <article key={index} onClick={() => handleProductClick(producto.id)} className="product-card">
                            <span className={`price-tag ${producto.diferencia >= 0 ? 'price-increased' : 'price-decreased'}`}>
                                {producto.diferencia >= 0 ? 'Subió precio' : 'Mejoró precio'}
                            </span>
                            <header className="product-image-container">
                                <img className="product-image" src={producto.photo} alt={`Imagen de ${producto.nombre}`} />
                            </header>
                            <div className="product-info">
                                <div className="product-details">
                                    <p className="product-location">{producto.lugar}</p>
                                    <div className="product-description">
                                        <p className="product-name">{producto.nombre}</p>
                                        <p className="product-price">Precio: ${producto.precio_actual}</p>
                                        <p className={`product-difference ${producto.diferencia >= 0 ? 'difference-positive' : 'difference-negative'}`}>
                                            Diferencia: ${producto.diferencia}
                                        </p>
                                        <a href={producto.urlproducto} target="_blank" rel="noopener noreferrer" title={`Ver ${producto.nombre}`} className="product-link">Ver Producto</a>
                                    </div>
                                </div>    
                            </div>
                        </article>
                    ))}
                </Carousel>
            ) : (
                <section className="product-grid">
                {products.map((producto,index) => (
                    <Card key={index} onClick={() => handleProductClick(producto.id)} className="product-card">
                        <CardHeader>
                            <img className="product-image" src={producto.photo} alt={`Imagen de ${producto.nombre}`} />
                            <span className={`price-tag ${producto.diferencia >= 0 ? 'price-increased' : 'price-decreased'}`}>
                                {producto.diferencia >= 0 ? 'Subió precio' : 'Mejoró precio'}
                            </span>
                        </CardHeader>
                        <CardContent>
                            <CardTitle>{producto.nombre}</CardTitle>
                            <CardDescription>
                                <p className="product-location">{producto.lugar}</p>
                                <p className="product-price">Precio: ${producto.precio_actual}</p>
                                <p className={`product-difference ${producto.diferencia >= 0 ? 'difference-positive' : 'difference-negative'}`}>
                                    Diferencia: ${producto.diferencia}
                                </p>
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <a href={producto.urlproducto} target="_blank" rel="noopener noreferrer" title={`Ver ${producto.nombre}`} className="product-link">Ver Producto</a>
                        </CardFooter>
                    </Card>
                ))}
            </section>
            )}

            <PriceHistoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                historyData={historyData}
                similarProducts={similarProducts}
            />
        </div>
    );
};

export default ProductGridFlashsale;