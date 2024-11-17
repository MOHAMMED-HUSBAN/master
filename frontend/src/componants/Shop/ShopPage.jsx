import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Pagination, Slider, Box, Drawer, FormControl, InputLabel, Select, MenuItem, List, ListItem, Divider, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchProducts, fetchProductsByCategory } from '../../slice/productSlice';
import { addToCart } from '../../slice/cartSlice';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../../utils/tokenUtils';

const ProductGrid = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const cart = useSelector(state => state.cart.items);
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [category, setCategory] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

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

  
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      console.log('Adding product to cart:', productId);
      await dispatch(addToCart({ productId: productId.toString(), quantity: 1 })).unwrap();
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-800 to-gray-900">
      {/* Spacing for header */}
      <div className="h-20"></div>

      <Box sx={{ display: 'flex', paddingTop: '20px' }}>
        {/* Filter Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              backgroundColor: 'rgba(31, 41, 55, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white'
            }
          }}
        >
          <Box sx={{ width: 240, padding: 2 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>Filters</Typography>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <List>
              <ListItem>
                <Typography gutterBottom sx={{ color: 'white' }}>Filter by Price</Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  step={5}
                  marks
                  sx={{
                    color: 'white',
                    '& .MuiSlider-thumb': {
                      backgroundColor: 'white',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: 'white',
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    }
                  }}
                />
              </ListItem>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: 'white' }}>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                    sx={{
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      }
                    }}
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

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <IconButton 
            onClick={toggleDrawer} 
            sx={{ 
              mb: 2, 
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            <FilterListIcon />
            <Typography variant="button" sx={{ ml: 1, color: 'white' }}>
              Filters
            </Typography>
          </IconButton>

          <Grid container spacing={2}>
            {paginatedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(128,128,128,0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                    width: '100%',
                    maxWidth: 300,
                    margin: 'auto',
                  }}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="140"
                    image={product.image}
                    title={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ 
                    padding: 2,
                    color: 'white'
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }} paragraph>
                      {product.description}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Button 
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product._id);
                      }}
                      startIcon={<ShoppingCartIcon />}
                      sx={{
                        mt: 2,
                        background: 'linear-gradient(to right, rgba(128,128,128,0.3), rgba(64,64,64,0.3))',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          background: 'linear-gradient(to right, rgba(128,128,128,0.4), rgba(64,64,64,0.4))'
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4,
            '& .MuiPaginationItem-root': {
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              '&.Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white',
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ProductGrid;