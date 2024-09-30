import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Pagination, Slider, Box, Drawer, FormControl, InputLabel, Select, MenuItem, List, ListItem, Divider, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Header from '../Header';

const products = [
  {
    id: 1,
    name: "'Tempo' Taekwondo Training Shoes - White/Black",
    price: 20.00,
    description: "High-quality training shoes for taekwondo practitioners",
    image: "https://www.2tuf2tap.com/cdn/shop/products/36_1160x_crop_center.jpg?v=1671120738",
    category: 'Shoes'
  },
  {
    id: 2,
    name: "'Vintage' Taekwondo Dobok Uniform - Black/Yellow",
    price: 30.00,
    description: "Classic dobok uniform for taekwondo enthusiasts",
    image: "https://www.2tuf2tap.com/cdn/shop/products/15kD_UVMS8N2cUrL_SpUm3Iiivsj_Sw2g_1160x_crop_center.jpg?v=1666996309",
    category: 'Uniforms'
  },
  {
    id: 3,
    name: "'Shield-11' Taekwondo Groin Guard - Male - White/Black",
    price: 15.00,
    description: "Protective groin guard for taekwondo training and competition",
    image: "https://www.2tuf2tap.com/cdn/shop/products/10rNaR47CiRgfA-af_XMA7aLMSb7TJVmc_1160x_crop_center.jpg?v=1666997843",
    category: 'Protective Gear'
  },
  {
    id: 4,
    name: "'Shield-11' Taekwondo Foot Guards - White/Black",
    price: 15.00,
    description: "Protective foot guards for taekwondo training and competition",
    image: "https://www.2tuf2tap.com/cdn/shop/products/10Z7ANB54arPjTGagRj-saRNgEF2HimKL_1160x_crop_center.jpg?v=1666997795",
    category: 'Protective Gear'
  },
  {
    id: 5,
    name: "'Shield-11' Taekwondo Gloves - White/Black",
    price: 15.00,
    description: "Durable gloves for taekwondo training and competition",
    image: "https://www.2tuf2tap.com/cdn/shop/files/85_8ab7442a-6a16-4bd4-a18a-adfe45f684c2_1160x_crop_center.jpg?v=1704831687",
    category: 'Protective Gear'
  },
  {
    id: 6,
    name: "'Fighter' Taekwondo Dobok Uniform - White/Black",
    price: 45.00,
    description: "High-quality dobok uniform for taekwondo practitioners",
    image: "https://www.2tuf2tap.com/cdn/shop/products/15X2OWELQ8TyGOqgE7Gld9pJxa7sQ9n8H_1160x_crop_center.jpg?v=1666996179",
    category: 'Uniforms'
  },
  {
    id: 7,
    name: "'Velocity' Taekwondo Training Shoes - White/Black",
    price: 35.00,
    description: "High-performance training shoes for taekwondo practitioners",
    image: "https://www.2tuf2tap.com/cdn/shop/products/26_1160x_crop_center.jpg?v=1671120717",
    category: 'Shoes'
  },
  {
    id: 8,
    name: "'Vintage' Taekwondo Dobok Uniform - White/Black",
    price: 30.00,
    description: "Classic dobok uniform for taekwondo enthusiasts",
    image: "https://www.2tuf2tap.com/cdn/shop/products/15aXmvLXw-xtAll1ppE2JIexeuAjGgATU_1160x_crop_center.jpg?v=1666996284",
    category: 'Uniforms'
  },
  {
    id: 9,
    name: "'Champion' Taekwondo Dobok Uniform - White/Black",
    price: 20.00,
    description: "High-quality dobok uniform for taekwondo practitioners",
    image: "https://www.2tuf2tap.com/cdn/shop/products/15HSrwo6BRWHVtv3RSXeXWDT2kBrt9auz_1160x_crop_center.jpg?v=1666996155",
    category: 'Uniforms'
  },
  {
    id: 10,
    name: "'Start' Taekwondo Dobok Uniform - White/Black",
    price: 15.00,
    description: "Entry-level dobok uniform for taekwondo beginners",
    image: "https://www.2tuf2tap.com/cdn/shop/files/88_1160x_crop_center.jpg?v=1715764986",
    category: 'Uniforms'
  },
  {
    id: 11,
    name: "'Jikida' Taekwondo Headguard - Red/White",
    price: 25.00,
    description: "High-quality headguard for taekwondo training and competition",
    image: "https://www.2tuf2tap.com/cdn/shop/products/14mginuRJnHBricBfMesYPMy-lGkh0rG3_1160x_crop_center.jpg?v=1666998184",
    category: 'Protective Gear'
  },
  {
    id: 12,
    name: "'Flash' Taekwondo Training Shoes - White/Silver",
    price: 15.00,
    description: "High-performance training shoes for taekwondo practitioners",
    image: "https://www.2tuf2tap.com/cdn/shop/products/Flash--Taekwondo-Training-Shoes---White-Silver-2TUF2TAP-1669037489_1160x_crop_center.jpg?v=1669037490",
    category: 'Shoes'
  },
  {
    id: 13,
    name: "'Poomsae Pro' Taekwondo Dobok Uniform - Male - White/Navy",
    price: 30.00,
    description: "High-quality dobok uniform for taekwondo practitioners",
    image: "https://www.2tuf2tap.com/cdn/shop/products/15Yfeo1ct5dPklWU45mjeopvDOszBenrM_1160x_crop_center.jpg?v=1666996257",
    category: 'Uniforms'
  },
  {
    id: 14,
    name: "'Jikida' Taekwondo Headguard - White/Black",
    price: 25.00,
    description: "High-quality headguard for taekwondo training and competition",
    image: "https://www.2tuf2tap.com/cdn/shop/products/14P4JudpiukdHU1WD0s7tIZATdvNEgB2z_1160x_crop_center.jpg?v=1666998208",
    category: 'Protective Gear'
  }
];

const ProductGrid = () => {
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [category, setCategory] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
      <Header />
      <Box sx={{ display: 'flex' , paddingTop:'80px' }}>
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
                    <Button variant="contained"color="secondary" sx={{ mt: 2 }}>
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
