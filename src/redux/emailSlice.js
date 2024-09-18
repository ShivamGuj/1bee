import  {createSlice}  from "@reduxjs/toolkit";

const initialState = {
    favArr : [],
};

const emailSlice = createSlice({
    name: "email",
    initialState: initialState,
    reducers: {
        favEmail: (state, action) => {
            state.favArr.push(action.payload);
        },
    },
});

export const {favEmail} = emailSlice.actions;

export default emailSlice.reducer;