import { create } from 'zustand';

const useStore = create((set) => ({
    filteredProducts: [],
    searchResults: [],
    lastUpdated: 'products', // 'products', 'filtered', 'search'
    setFilteredProducts: (filteredProducts) => set({ filteredProducts, lastUpdated: 'filtered' }),
    setSearchResults: (searchResults) => set({ searchResults, lastUpdated: 'search' }),
}));

export default useStore ;