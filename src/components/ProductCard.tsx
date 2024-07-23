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


type ProductCardProps = {
  product: Product;
};

function ProductCard({ product } : ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image+'?random='+product.id}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate('product/'+product.id) }>Details</Button>
        <Button size="small" color="error" onClick={() => dispatch(deleteProductById(product.id))}>Delete</Button>
      </CardActions>
    </Card>
    </Box>
  );
}

export default ProductCard;
