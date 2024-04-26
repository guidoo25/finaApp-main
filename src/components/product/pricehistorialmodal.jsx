import React, { useState } from 'react';
import EChartsReact from 'echarts-for-react'; // Importa el componente
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Modal from './modal';
import ProductCardModal from "./productcardmodal";
import ProductGrid from './card';
import { useTheme } from '@/hooks/themeprovider';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PriceHistoryModal = ({ isOpen, onClose, historyData ,similarProducts}) => {
    const [activeTab, setActiveTab] = useState('tab1'); // Estado para manejar la pestaña activa
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const data = {
        labels: historyData.map(d => new Date(d.fecha).toLocaleDateString()),
        datasets: [
            {
                label: 'Precio',
                
                data: historyData.map(d => d.precio),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        title: {
            text: 'Precio'
        },
        tooltip: {},
        xAxis: {
            data: historyData.map(d => new Date(d.fecha).toLocaleDateString()),
            type: 'category'
        },
        yAxis: {
            type: 'value',
            min: 0
        },
        series: [{
            data: historyData.map(d => d.precio),
            type: 'line', // Cambia 'bar' a 'line'
            itemStyle: {
                color: 'rgba(53, 162, 235, 0.5)'
            }
        }]
    };
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
{/* Header del modal con botones para cambiar de tab */}
<div className={`modal-header ${isDark ? 'shadcn' : ''}`}>
    <ul className="tablist" role="tablist">
        <li role="presentation">
            <button 
                onClick={() => handleTabChange('tab1')} 
                className={`tab-button shadcn ${activeTab === 'tab1' ? 'active' : ''}`}>
                Historial de precios
            </button>
        </li>
        <li role="presentation">
            <button 
                onClick={() => handleTabChange('tab2')} 
                className={`tab-button shadcn ${activeTab === 'tab2' ? 'active' : ''}`}>
                Productos Relacionados
            </button>
        </li>
    </ul>
    <button onClick={onClose} className="close-button shadcn">
        &times;
    </button>
</div>
<div className={`modal-body ${isDark ? 'shadcn' : ''}`}>
    {/* Tab del Historial de Precios */}
    <div className={activeTab === 'tab1' ? 'block' : 'hidden'}>
        <EChartsReact
            option={options}
            style={{height: '350px', width: '100%'}}
        />
    </div>

    {/* Tab de Productos Similares */}
    <div className={activeTab === 'tab2' ? 'block' : 'hidden'}>
        <div className="product-grid-container">
            <ProductGrid products={similarProducts} />
        </div>
    </div>
</div>
</Modal>
    );
};

export default PriceHistoryModal;