import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';


import '@/css/app.css'
import { fetchProducts } from '@/store/slices/productsSlice';

function Products() {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state:RootState) => state.products.collection);

  // Load data on component mount
  useEffect(() => {
    // Load initial data with default filters and fixed filter options
    dispatch(fetchProducts({}));
  }, []);

  return (
    <>
      <ul>
      {products.map(a => <li>{a.id}</li>)}
      </ul>
    </>
  )
}

export default Products
