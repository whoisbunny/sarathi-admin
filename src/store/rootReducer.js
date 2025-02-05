import layout from "./layout";
import todo from "../pages/app/todo/store";
import email from "../pages/app/email/store";
import chat from "../pages/app/chat/store";
import project from "../pages/app/projects/store";
import kanban from "../pages/app/kanban/store";
import calendar from "../pages/app/calender/store";
import auth from "./auth/auth.reducer";
import user from "./user/user.reducer";
import socket from "./socketSlice";
import vehicle from "./vehicle/vehicle.reducer";
import ride from "./ride/ride.reducer";

const rootReducer = {
  layout,
  todo,
  email,
  chat,
  project,
  kanban,
  calendar,
  auth,
  user,
  vehicle,
  ride,
  socket,
};
export default rootReducer;
