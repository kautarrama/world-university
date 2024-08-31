import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FilterProvider } from './utils/FilterContext';
import Search from './Search';
import Detail from './Detail';
import About from './About';
import { PaginationProvider } from './utils/PaginationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/search', element: <Search /> },
  { path: '/country/:name', element: <Detail /> },
  { path: '/about', element: <About /> },
])
root.render(
  <React.StrictMode>
    <FilterProvider>
      <PaginationProvider>
        <RouterProvider router={router} />
      </PaginationProvider>
    </FilterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
