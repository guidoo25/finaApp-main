
import ProductGrid from '../product/card';
import useStore from '../store/listsearch';
import React, { useEffect, useState } from 'react';
import classNames from "classnames";
import { Skeleton } from './skeleton';
import Widget from './widget';





 
const Wrappercontent = () => {
    const [productos, setProductos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [productssale, setProductssale] = useState([]); // Inicializa el estado de productos como un arreglo vacío
    const [selectedCategory, setSelectedCategory] = useState(null);
    const {  filteredProducts, searchResults, lastUpdated, setProducts, setFilteredProducts, setSearchResults } = useStore();
  
    let displayProducts;
    switch (lastUpdated) {
      case 'filtered':
        displayProducts = filteredProducts;
        break;
      case 'search':
        displayProducts = searchResults;
        break;
      default:
        displayProducts = productos;
    
    }
    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          // Fetch productos normales
          const response = await fetch(`${import.meta.env.VITE_API_URL}?page=${page}`);
          const data = await response.json();
          const newProducts = data.data.filter(
            (newProduct) => !productos.find((existingProduct) => existingProduct.id === newProduct.id)
          );
          setProductos((prev) => [...prev, ...newProducts]);
  
          // Fetch productos en venta
          const saleResponse = await fetch(`${import.meta.env.VITE_API_URL}/mayor-baja`); // Ajusta este URL según sea necesario
          const saleData = await saleResponse.json();
          setProductssale(saleData); // Actualiza el estado con los productos en venta obtenidos
  
          setLoading(false);
        } catch (error) {
          console.error("Error al cargar productos:", error);
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, [page]);
  
  
    const handleFilteredProductsChange = (products) => {
      setFilteredProducts(products);
      setIsFiltered(products.length > 0);
    };
    const handleFilter = (filter) => {
      const newFilteredProducts = productos.filter(/* tu lógica de filtrado aquí */);
      setFilteredProducts(newFilteredProducts);
    };
    const handleFilterReset = () => {
      setFilteredProducts(null);
    };
    const bodyStyle = classNames("bg-background flex flex-col items-center justify-center mt-16 py-4 p-4 h-full overflow-y-auto",
        {

        });
  

  return (
    <div className={bodyStyle}>



            <ProductGrid 
                products={displayProducts} 
                setPage={setPage} 
                page={page} 
                hasMore={hasMore} 
            />

  
        
    </div>
  );
}
export default Wrappercontent;