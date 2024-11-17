import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Rating,
  Divider,
  IconButton,
  Chip,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { fetchProductById, addReview, toggleFavorite } from '../../slice/productSlice';
import { addToCart } from '../../slice/cartSlice';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: '' });
  
  const product = useSelector(state => state.products.selectedProduct);
  const loading = useSelector(state => state.products.loading);
  const user = useSelector(state => state.auth.user);
  
  const isFavorite = product?.favorites?.includes(user?._id);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ productId, quantity })).unwrap();
      setSnackbar({
        open: true,
        message: 'Product added to cart successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error || 'Failed to add product to cart',
        severity: 'error'
      });
    }
  };

  const handleAddReview = async () => {
    if (!reviewData.rating || !reviewData.comment) {
      setSnackbar({
        open: true,
        message: 'Please provide both rating and comment',
        severity: 'error'
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      console.log('Submitting review:', { productId, ...reviewData }); // للتتبع

      await dispatch(addReview({ 
        productId, 
        rating: reviewData.rating,
        comment: reviewData.comment 
      })).unwrap();
      
      setOpenReviewDialog(false);
      setReviewData({ rating: 0, comment: '' });
      setSnackbar({
        open: true,
        message: 'Review added successfully',
        severity: 'success'
      });

      // تحديث تفاصيل المنتج بعد إضافة المراجعة
      dispatch(fetchProductById(productId));
    } catch (error) {
      console.error('Error adding review:', error);
      setSnackbar({
        open: true,
        message: error || 'Failed to add review',
        severity: 'error'
      });
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await dispatch(toggleFavorite(productId)).unwrap();
      setSnackbar({
        open: true,
        message: isFavorite ? 'تمت إزالة المنتج من المفضلة' : 'تمت إضافة المنتج إلى المفضلة',
        severity: 'success'
      });
      
      // تحديث تفاصيل المنتج بعد تغيير المفضلة
      dispatch(fetchProductById(productId));
    } catch (error) {
      setSnackbar({
        open: true,
        message: error || 'فشل تحديث المفضلة',
        severity: 'error'
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Product not found</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/shop')}
        sx={{ mb: 3 }}
      >
        Back to Shop
      </Button>

      <Paper elevation={0} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Grid container spacing={4}>
          {/* Product Images Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2
                }}
              />
              {product.images && product.images.length > 1 && (
                <ImageList sx={{ height: 100 }} cols={4} rowHeight={100}>
                  {product.images.map((img, index) => (
                    <ImageListItem 
                      key={index}
                      sx={{ 
                        cursor: 'pointer',
                        border: selectedImage === index ? '2px solid primary.main' : 'none'
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        loading="lazy"
                        style={{ objectFit: 'cover' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Box>
          </Grid>

          {/* Product Info Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" sx={{ color: 'white' }} gutterBottom>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating || 0} readOnly precision={0.5} />
                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                  ({product.reviews?.length || 0} reviews)
                </Typography>
              </Box>

              <Chip 
                label={product.category} 
                color="primary" 
                variant="outlined" 
                sx={{ alignSelf: 'flex-start', mb: 2 }}
              />

              <Typography variant="h5" sx={{ color: 'white' }} gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>

              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }} paragraph>
                {product.description}
              </Typography>

              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Quantity:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleQuantityChange(-1)}>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={quantity}
                    inputProps={{ readOnly: true }}
                    sx={{ width: 60, mx: 1 }}
                  />
                  <IconButton onClick={() => handleQuantityChange(1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  fullWidth
                >
                  Add to Cart
                </Button>
                <IconButton 
                  onClick={handleToggleFavorite}
                  color={isFavorite ? "secondary" : "default"}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton color="primary">
                  <ShareIcon />
                </IconButton>
              </Box>

              {product.specifications && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Specifications
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 200, color: 'text.secondary' }}>
                        {key}:
                      </Typography>
                      <Typography variant="body2">
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews Section */}
      <Paper elevation={0} sx={{ p: 3, mt: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white' }} gutterBottom>
            Reviews ({product.reviews?.length || 0})
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setOpenReviewDialog(true)}
          >
            Write a Review
          </Button>
        </Box>

        <List>
          {product.reviews?.map((review, index) => (
            <React.Fragment key={review._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{review.userName?.[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography component="span" variant="subtitle1">
                        {review.userName}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                      {" — "}{review.comment}
                    </>
                  }
                />
              </ListItem>
              {index < product.reviews.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Review Dialog */}
      <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Rating
              value={reviewData.rating}
              onChange={(_, newValue) => {
                setReviewData(prev => ({ ...prev, rating: newValue }));
              }}
            />
            <TextField
              multiline
              rows={4}
              variant="outlined"
              label="Your Review"
              value={reviewData.comment}
              onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReviewDialog(false)}>Cancel</Button>
          <Button onClick={handleAddReview} variant="contained">
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails; 