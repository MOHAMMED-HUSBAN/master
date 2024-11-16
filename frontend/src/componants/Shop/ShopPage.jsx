import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Pagination, Slider, Box, Drawer, FormControl, InputLabel, Select, MenuItem, List, ListItem, Divider, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchProducts, fetchProductsByCategory } from '../../slice/productSlice';
import { addToCart } from '../../slice/cartSlice';

const ProductGrid = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const cart = useSelector(state => state.cart.items);
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [category, setCategory] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    if (selectedCategory) {
      dispatch(fetchProductsByCategory(selectedCategory));
    } else {
      dispatch(fetchProducts());
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  
  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const filteredProducts = products.filter((product) => 
    product.price >= priceRange[0] && product.price <= priceRange[1] &&
    (category === '' || product.category === category)
  );

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Box sx={{ display: 'flex', paddingTop: '80px' }}>
        {/* Filter Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{ width: 240, flexShrink: 0 }}
        >
          <Box sx={{ width: 240, padding: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <Divider />
            <List>
              <ListItem>
                <Typography gutterBottom>Filter by Price</Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  step={5}
                  marks
                  sx={{ marginTop: 2 }}
                />
              </ListItem>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Shoes">Shoes</MenuItem>
                    <MenuItem value="Uniforms">Uniforms</MenuItem>
                    <MenuItem value="Protective Gear">Protective Gear</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box
          sx={{ 
            flexGrow: 1,
            padding: 2, 
            display: 'flex', 
            flexDirection: 'column' 
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ mb: 2 }}>
            <FilterListIcon />
            <Typography variant="button">Filters</Typography>
          </IconButton>
          <Grid container spacing={2}>
            {paginatedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ 
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  },
                  width: '100%',
                  maxWidth: 300,
                  margin: 'auto',
                }}>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="140"
                    image={product.image}
                    title={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {product.description}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bold' }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Button 
                      variant="contained"
                      color="secondary" 
                      sx={{ mt: 2 }}
                      onClick={() => handleAddToCart(product.id)}
                      startIcon={<ShoppingCartIcon />}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="secondary"
              siblingCount={1}
              boundaryCount={1}
              shape="rounded"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductGrid;