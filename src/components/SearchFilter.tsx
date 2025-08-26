'use client';

import { useEffect, useState } from 'react';

interface SearchFilterProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onFilter?: (filter: string) => void;
  filterOptions?: { value: string; label: string }[];
  showFilter?: boolean;
  className?: string;
}

export default function SearchFilter({
  placeholder = "Buscar...",
  onSearch,
  onFilter,
  filterOptions = [],
  showFilter = false,
  className = ""
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(true);
  };

  // Debounce para búsqueda en tiempo real
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== '') {
        onSearch(searchQuery);
      } else {
        onSearch(''); // Limpiar filtros si no hay búsqueda
      }
      setIsSearching(false);
    }, 300); // 300ms de delay

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedFilter(value);
    if (onFilter) {
      onFilter(value);
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Búsqueda */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 hover:bg-white transition-all duration-200"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500">
                {isSearching ? '⏳' : '🔍'}
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                {searchQuery && 'Búsqueda en tiempo real'}
              </div>
            </div>
          </form>

          {/* Filtro */}
          {showFilter && filterOptions.length > 0 && (
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 hover:bg-white transition-all duration-200 min-w-[200px]"
            >
              <option value="">Filtrar por...</option>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
        
        {/* Mensaje de ayuda */}
        <div className="mt-3 text-xs text-gray-500 text-center">
          💡 Escribe para buscar en tiempo real • Los filtros se aplican automáticamente
        </div>
      </div>
    </div>
  );
}
