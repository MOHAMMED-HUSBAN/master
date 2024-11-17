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
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    );
  }

  if (!favorites?.length) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        p: 3
      }}>
        <StorefrontIcon sx={{ fontSize: 60, color: 'rgba(255, 255, 255, 0.5)', mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'white' }} gutterBottom>
          No favorite products yet
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/shop')}
          sx={{ 
            mt: 2,
            background: 'linear-gradient(to right, rgba(128,128,128,0.3), rgba(64,64,64,0.3))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': {
              background: 'linear-gradient(to right, rgba(128,128,128,0.4), rgba(64,64,64,0.4))'
            }
          }}
          startIcon={<ShoppingCartIcon />}
        >
          Browse Shop
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
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
                background: 'linear-gradient(to bottom, rgba(128,128,128,0.1), rgba(64,64,64,0.1))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
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
                  <Tooltip title="Remove from favorites">
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                      }}
                      onClick={(e) => handleRemoveFromFavorites(product._id, e)}
                    >
                      <FavoriteIcon sx={{ color: 'white' }} fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add to cart">
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                      }}
                      onClick={(e) => handleAddToCart(product._id, e)}
                    >
                      <ShoppingCartIcon sx={{ color: 'white' }} fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" sx={{ color: 'white' }} noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Rating 
                    value={product.averageRating || 0} 
                    readOnly 
                    size="small"
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                  />
                  {product.category && (
                    <Chip 
                      label={product.category}
                      size="small"
                      sx={{ 
                        alignSelf: 'flex-start',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
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
          sx={{ 
            bgcolor: snackbar.severity === 'success' ? 'rgba(46, 125, 50, 0.9)' : 'rgba(211, 47, 47, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavoriteProducts; 