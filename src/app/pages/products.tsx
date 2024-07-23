import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import Grid from '@mui/material/Grid';
import ProductCard from '@/components/ProductCard';

import { fetchProducts } from '@/store/slices/productsSlice';

/**
 * The `Products` component is responsible for fetching and displaying a list of products.
 * 
 * It uses React hooks to manage side effects and state:
 * - `useEffect` to dispatch the action to fetch products when the component mounts.
 * - `useDispatch` to access the Redux dispatch function.
 * - `useSelector` to access the Redux state and select the products collection.
 * 
 * It renders a grid of `ProductCard` components, each representing an individual product.
 * 
 */
function Products() {
  // Access the Redux dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // Access the products collection from the Redux state
  const products = useSelector((state: RootState) => state.products.collection);

  // Fetch products when the component mounts
  useEffect(() => {
    // Dispatch the action to fetch products with default filters and fixed filter options
    dispatch(fetchProducts({}));
  }, [dispatch]); // Adding dispatch to the dependency array ensures the effect runs correctly

  return (
      <Grid container spacing={3} style={{paddingTop: '20px'}} >
          {products.map(product => 
            <Grid item 
              key={product.id} 
              xs={12} 
              sm={6} 
              md={4}
            >
              <ProductCard key={product.id} product={product} />
            </Grid>
          )}
      </Grid>
  );
}

export default Products;
