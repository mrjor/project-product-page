import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import Grid from '@mui/material/Grid';
import ProductCard from '@/components/ProductCard';

import { fetchProducts } from '@/store/slices/productsSlice';


function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state:RootState) => state.products.collection);

  // Load data on component mount
  useEffect(() => {
    // Load initial data with default filters and fixed filter options
    dispatch(fetchProducts({}));

  }, []);

  return (
      <Grid container spacing={3} style={{paddingTop: '20px'}} >
          {products.map(product => 
            <Grid item 
              key={product.id}  xs={12} sm={6} md={4}>
              <ProductCard key={product.id} product={product} />
            </Grid>
            )}
      </Grid>
  )
}

export default Products
