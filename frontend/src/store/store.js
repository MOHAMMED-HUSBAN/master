import { configureStore } from '@reduxjs/toolkit';
import programReducer from '../slice/programsSlice';
import newsReducer from '../slice/newsSlice';

import offeringsReducer from '../slice/offeringsSlice';
import WhatWeOffer2Reducer from '../slice/WhatWeOffer2Slice';
import registrationReducer from '../slice/registrationSlice';
import authReducer from '../slice/authSlice';
import profileReducer from '../slice/profileSlice';


export const store = configureStore({
  reducer: {
    programs: programReducer,
    news: newsReducer,
    offerings: offeringsReducer,
    offer : WhatWeOffer2Reducer,
    registration: registrationReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});
