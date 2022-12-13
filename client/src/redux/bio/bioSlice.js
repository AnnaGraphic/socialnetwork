import { createSlice } from "@reduxjs/toolkit";

const bioSlice = createSlice({
    name: "bio",
    initialState: {
        value: "",
    },
});
export default bioSlice;
