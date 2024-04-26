import React, { useState } from 'react';
import PriceHistoryModal from './pricehistorialmodal';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from "@/components/ui/skeleton";

const ProductGrid = ({ products, setPage, page, hasMore }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);

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

    if (!products) {
        return <Skeleton className="h-64 w-full" />;
    }

    if (!products.length) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />

    }

    return (
        <div className="w-full h-full"> 

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">              
                    {products.map((producto, index) => (
                        <Card
                            key={index}
                            className="cursor-pointer"
                            onClick={() => handleProductClick(producto.id)}
                        >
                            <CardHeader>
                                <img
                                    className="w-full h-24 sm:h-64 object-cover"
                                    alt={producto.nombre}
                                    src={producto.photo}
                                />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-lg font-bold text-white">{producto.nombre}</CardTitle>
                                <CardDescription className="text-gray-300">{`$${producto.precio}`}</CardDescription>
                                <CardDescription className="text-blue-300">{producto.lugar}</CardDescription>
                                <a href={producto.urlproducto} target="_blank" rel="noopener noreferrer">
                                    <Button className="py-1 px-2 text-sm">Ver producto</Button>
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <PriceHistoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    historyData={historyData}
                    similarProducts={similarProducts}
                />

                <div className="flex justify-between mt-4">
                    <Button variant="default" size="default" onClick={() => setPage(page => Math.max(1, page - 1))} disabled={page <= 1}>
                        Anterior
                    </Button>
                    <Button variant="default" size="default" onClick={() => hasMore && setPage(page => page + 1)} disabled={!hasMore}>
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;