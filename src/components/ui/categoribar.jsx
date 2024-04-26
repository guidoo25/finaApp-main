import classNames from 'classnames';
import { useSideBarToggle } from '@/hooks/toogle';
import { useState } from 'react';
import { ButtonIcon } from './iconbuton';


const Categiribar = () => {
    const { toggleCollapse } = useSideBarToggle();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);


    const categoryOptions = [
        { value: 'computadoras', label: 'Computadoras' },
        {value: 'Celulares', label: 'Celulares'},
        {value: 'consolas', label: 'Consolas'},
        {value: 'deportes-y-fitness', label: 'Fitness'},
        {value: 'televisores', label: 'Televisores'},
        {value: 'aires-acondicionados', label: 'Aires '},
        {value: 'audio', label: 'audio'},
        { value: 'salud', label: 'Salud' },
        { value: 'hogar', label: 'Hogar' },
        { value: 'electrodomesticos', label: 'Electrodomésticos' },
        { value: 'relojes-smartwatchs-y-smartbands', label: 'Smartwatchs' },
        {value: 'bebes', label: 'Bebes'},
    ];

    const fetchFilteredProducts = async (category) => {
        const fetchUrl = `${import.meta.env.VITE_API_URL}/categoria/${category.value}`;
    
        try {
          const response = await fetch(fetchUrl);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setFilteredProducts(data);
          if (onFilteredProductsChange) {
            onFilteredProductsChange(data); // Actualiza el estado en el componente padre
          }
        } catch (error) {
          console.error('Error fetching filtered products:', error);
        }
      };


    const asideStyle = classNames("sidebar overflow-y-auto overflow-x-auto fixed bg-sidebar h-full shadow-sm shadow-slate-500/40 transition duration-300 ease-in-out z-[99999]",
    {
        ["w-[20rem]"]: !toggleCollapse,
        ["sm:w-[5.4rem] sm:left-0 left-[-100%]"]: toggleCollapse,
    });

    return (
        <aside className={asideStyle}>
            <div className="flex items-center justify-between h-16 bg-sidebar-foreground shadow-slate-500/40">
                <h3 className={classNames("pl-2 font-bold text-2xl min-w-max text-white",
                    { hidden: toggleCollapse })}>
                    Dashboard</h3>
            </div>
            <nav className="flex flex-col gap-2 transition duration-300 ease-in-out">
            {categoryOptions.map((option) => (
    <button 
        key={option.value} 
        className={classNames("flex items-center justify-between px-4 py-2 text-sm font-medium text-sidebar-foreground bg-sidebar-foreground hover:bg-sidebar-foreground-hover shadow-slate-500/40", 
        { 'bg-sidebar-foreground-hover': selectedCategory === option.value })}
        onClick={() => setSelectedCategory(option.value)}
    >
        {option.label}
    </button>
))}
            </nav>
        </aside>
    );
    
}

export default Categiribar;