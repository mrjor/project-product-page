import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { fetchProductById } from '@/store/slices/productsSlice';

/**
 * The `ProductDetail` component displays detailed information about a single product.
 * 
 * It fetches the product data based on the product ID obtained from the URL parameters and displays
 * the product's image, name, brand, category, and specifications.
 * 
 * It uses React hooks for side effects and state management:
 * - `useEffect` to fetch the product data when the component mounts.
 * - `useDispatch` to dispatch actions to the Redux store.
 * - `useSelector` to access the product data from the Redux state.
 * - `useParams` to retrieve the product ID from the URL parameters.
 * 
 * @returns {JSX.Element} The rendered `ProductDetail` component.
 */
function ProductDetail() {
  // Access the Redux dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // Retrieve the product ID from the URL parameters
  const { id } = useParams<{ id: string }>();

  // Access the selected product from the Redux state
  const product = useSelector((state: RootState) => state.products.selectedProduct);

  // Fetch the product details when the component mounts or the product ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, dispatch]); // Adding id and dispatch to the dependency array

  // Render the product details
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        width: '100vw', 
      }}
    >
      <Box sx={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          {/* Product image */}
          <CardMedia
            component="img"
            height="140"
            image={product.image + '?random=' + product.id} // Appends a random query parameter to the image URL
            title={product.name}
          />
          <CardContent>
            {/* Product name */}
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            {/* Product brand */}
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {product.brand}
            </Typography>
            {/* Product category */}
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {product.category}
            </Typography>
            {/* Product specifications */}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {Object.keys(product.specifications).map((key) => (
                <ListItem key={key} disableGutters>
                  {key}: {product.specifications[key]}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ProductDetail;
