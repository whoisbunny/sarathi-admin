import { io } from "socket.io-client";
import { setConnected, addMessage, setActiveUsers } from "./socketSlice";

let socket;

const socketMiddleware = (storeAPI) => (next) => (action) => {
  if (!socket) {
     const token = localStorage.getItem("TOKEN"); // Retrieve token from storage
     socket = io(`${import.meta.env.VITE_BASE_URL}`, {
       withCredentials: true,
       query: { token }, // Pass token in the query
     });
  

    // Handle connection events
    socket.on("connect", () => {
      storeAPI.dispatch(setConnected({ flag: true, id: socket.id }));
    });

     socket.on("activeUsers", (users) => {
       console.log("Active users from server:", users);
       storeAPI.dispatch(setActiveUsers(users));
     });
    socket.on("receiveMessage", (message) => {
      storeAPI.dispatch(addMessage(message));
    });

    socket.on("disconnect", () => {
      storeAPI.dispatch(setConnected({ flag: false, id: null }));
      console.log("Disconnected from Socket.IO server");
    });

    // Listen for messages
  }

  // Handle custom actions
  if (action.type === "socket/sendMessage") {
    socket.emit("sendMessage", action.payload);
  }
  if (action.type === "socket/joinRoom") {
    socket.emit("joinRoom", action.payload);
  }
  // if (action.type === "socket/activeUsers") {
  //   socket.on("activeUsers", (users) => {
  //     console.log("users", users);
      
  //     storeAPI.dispatch(setActiveUsers(users));
  //   });
  // }

  return next(action);
};

export default socketMiddleware;
