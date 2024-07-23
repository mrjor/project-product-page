import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { deleteProductById } from '@/store/slices/productsSlice';
import { Product } from "@/store/types";

/**
 * Props for the `ProductCard` component.
 * 
 * @property {Product} product - The product object to be displayed in the card.
 */
type ProductCardProps = {
  product: Product;
};

/**
 * The `ProductCard` component displays information about a single product in a card format.
 * 
 * It includes:
 * - An image of the product
 * - The product name
 * - Buttons to view details and delete the product
 * 
 * The component also handles the navigation to the product details page and dispatches an action to delete the product.
 * 
 * @param {ProductCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered `ProductCard` component.
 */
function ProductCard({ product }: ProductCardProps) {
  // Access the Redux dispatch function
  const dispatch = useDispatch<AppDispatch>();
  
  // Access the navigation function for programmatic navigation
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
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
        </CardContent>
        <CardActions>
          {/* Button to navigate to product details */}
          <Button 
            size="small" 
            onClick={() => navigate('product/' + product.id)}
          >
            Details
          </Button>
          
          {/* Button to delete the product */}
          <Button 
            size="small" 
            color="error" 
            onClick={() => dispatch(deleteProductById(product.id))}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ProductCard;
