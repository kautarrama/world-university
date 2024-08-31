import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 16;

  return (
    <PaginationContext.Provider value={{
      sortOrder, setSortOrder,
      currentPage, setCurrentPage,
      countriesPerPage
    }}>
      {children}
    </PaginationContext.Provider>
  );
};

PaginationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
