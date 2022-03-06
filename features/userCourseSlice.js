import {createSlice} from "@reduxjs/toolkit";

export const userCourseSlice = createSlice({
    name: "userCourse", 
    initialState: {
        userCourse:null
    },
    reducers:{
        chooseCourses: (state, action) => {
            state.userCourse = action.payload;
        },
    },
});

export const { chooseCourses } = userCourseSlice.actions;

export const selectUserCourse = (state) => state.userCourse.userCourse;

export default userCourseSlice.reducer
