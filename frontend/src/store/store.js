import { configureStore } from '@reduxjs/toolkit';
import programReducer from '../slice/programsSlice';
import newsReducer from '../slice/newsSlice';
import offeringsReducer from '../slice/offeringsSlice';
import WhatWeOffer2Reducer from '../slice/WhatWeOffer2Slice';
import registrationReducer from '../slice/registrationSlice';
import authReducer from '../slice/authSlice';
import profileReducer from '../slice/profileSlice';
import productReducer from '../slice/productSlice';
import cartReducer from '../slice/cartSlice';
import eventReducer from '../slice/eventSlice';

const store = configureStore({
  reducer: {
    programs: programReducer,
    news: newsReducer,
    offerings: offeringsReducer,
    offer: WhatWeOffer2Reducer,
    registration: registrationReducer,
    auth: authReducer,
    profile: profileReducer,
    products: productReducer,
    cart: cartReducer,
    events: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

