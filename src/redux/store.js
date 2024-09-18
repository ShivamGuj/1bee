import {configureStore} from '@reduxjs/toolkit';
import emailSlice from "./emailSlice";

export const store = configureStore({
    reducer: {
      email : emailSlice,  
    },
});