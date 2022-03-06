import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../features/userSlice";
import userCourseReducer from "../features/userCourseSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    userCourse: userCourseReducer,
  },
});
 