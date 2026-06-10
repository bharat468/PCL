import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/features/global/globalSlice";
import memberReducer from "@/features/member/memberSlice";
import documentReducer from "@/features/document/documentSlice";
import imageReducer from "@/store/imageSlice";
import messageReducer from "@/features/message/messageSlice";

export default configureStore({
  reducer: {
    global: globalReducer,
    member: memberReducer,
    document: documentReducer,
    image: imageReducer,
    message: messageReducer,
  },
});
