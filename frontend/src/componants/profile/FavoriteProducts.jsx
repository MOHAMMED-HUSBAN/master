import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  CircularProgress,
  Chip,
  Rating,
  Stack,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { fetchFavorites, toggleFavorite } from '../../slice/productSlice';
import { addToCart } from '../../slice/cartSlice';
import { useNavigate } from 'react-router-dom';

const FavoriteProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(state => state.products.favorites);
  const loading = useSelector(state => state.products.loading);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemoveFromFavorites = async (productId, event) => {
    event.stopPropagation();
    try {
      await dispatch(toggleFavorite(productId)).unwrap();
      dispatch(fetchFavorites());
      setSnackbar({
        open: true,
        message: 'تم إزالة المنتج من المفضلة',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
      setSnackbar({
        open: true,
        message: 'فشل في إزالة المنتج من المفضلة',
        severity: 'error'
      });
    }
  };

  const handleAddToCart = async (productId, event) => {
    event.stopPropagation();
    try {
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
      setSnackbar({
        open: true,
        message: 'تمت إضافة المنتج إلى السلة',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbar({
        open: true,
        message: 'فشل في إضافة المنتج إلى السلة',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!favorites?.length) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        borderRadius: 2,
        p: 3
      }}>
        <StorefrontIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          لا توجد منتجات في المفضلة
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/shop')}
          sx={{ mt: 2 }}
          startIcon={<ShoppingCartIcon />}
        >
          تصفح المتجر
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        {favorites.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                cursor: 'pointer',
                borderRadius: 2
              }}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <Tooltip title="إزالة من المفضلة">
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' }
                      }}
                      onClick={(e) => handleRemoveFromFavorites(product._id, e)}
                    >
                      <FavoriteIcon color="error" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="إضافة إلى السلة">
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' }
                      }}
                      onClick={(e) => handleAddToCart(product._id, e)}
                    >
                      <ShoppingCartIcon color="primary" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Rating 
                    value={product.averageRating || 0} 
                    readOnly 
                    size="small"
                    precision={0.5}
                  />
                  {product.category && (
                    <Chip 
                      label={product.category}
                      size="small"
                      sx={{ alignSelf: 'flex-start' }}
                    />
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavoriteProducts; 