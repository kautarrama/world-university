import { useState } from 'react';

export const usePagination = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 16;

  return {
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    countriesPerPage,
  };
};