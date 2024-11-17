import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  Pagination
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ordersPerPage = 5; // عدد الطلبات في كل صفحة

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/user-orders', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        console.log('Fetched orders:', response.data); // للتتبع
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // حساب الطلبات التي يجب عرضها في الصفحة الحالية
  const getCurrentPageOrders = () => {
    const startIndex = (page - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    return orders.slice(startIndex, endIndex);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'pending':
        return <AccessTimeIcon color="warning" />;
      case 'shipped':
        return <LocalShippingIcon color="info" />;
      default:
        return null;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <Typography>Loading orders...</Typography>;
  }

  if (!orders.length) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No orders found
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Stack spacing={2}>
        {getCurrentPageOrders().map((order) => (
          <Accordion key={order._id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  {getStatusIcon(order.status)}
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">
                    Order #{order._id.slice(-6)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(order.createdAt)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip
                    label={order.status.toUpperCase()}
                    color={
                      order.status === 'completed' ? 'success' :
                      order.status === 'shipped' ? 'primary' : 'warning'
                    }
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" color="primary">
                    ${order.amount.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {order.items.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          {item.name}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Shipping Information
                    </Typography>
                    <Typography variant="body2">
                      Name: {order.username}
                    </Typography>
                    <Typography variant="body2">
                      Phone: {order.phonenumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Order Summary
                    </Typography>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Subtotal:</Typography>
                        <Typography variant="body2">${order.amount.toFixed(2)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Shipping:</Typography>
                        <Typography variant="body2">Free</Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2">Total:</Typography>
                        <Typography variant="subtitle2" color="primary">
                          ${order.amount.toFixed(2)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      {/* إضافة Pagination */}
      {orders.length > ordersPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '1rem',
              },
              '& .Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrderHistory; 