
import React, { useState } from 'react';

const initialCart = [
  {
    id: 1,
    name: "'Tempo' Taekwondo Training Shoes - White/Black",
    price: 20.00,
    quantity: 1,
    image: "https://www.2tuf2tap.com/cdn/shop/products/36_1160x_crop_center.jpg?v=1671120738"
  },
  {
    id: 2,
    name: "'Vintage' Taekwondo Dobok Uniform - Black/Yellow",
    price: 30.00,
    quantity: 2,
    image: "https://www.2tuf2tap.com/cdn/shop/products/15kD_UVMS8N2cUrL_SpUm3Iiivsj_Sw2g_1160x_crop_center.jpg?v=1666996309"
  }
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);

  const increaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-24">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cart.map(item => (
        <div key={item.id} className="bg-white p-4 mb-4 shadow-sm rounded-md flex items-center">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
            <div className="flex items-center mt-2">
              <button 
                onClick={() => decreaseQuantity(item.id)} 
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button 
                onClick={() => increaseQuantity(item.id)} 
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
              <button 
                onClick={() => removeItem(item.id)} 
                className="ml-4 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}
      <div className="text-right font-semibold text-xl mt-4">
        Total: ${totalPrice.toFixed(2)}
      </div>
      <button 
        className="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
      >
        Place Order
      </button>
    </div>
  );
};

export default Cart;
