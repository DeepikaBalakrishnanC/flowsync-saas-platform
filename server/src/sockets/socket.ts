import { Server } from "socket.io";

let io: Server;

export const initSocket = (
  server: any
) => {

  io = new Server(server, {

    cors: {
      origin: "*",
    },

  });


  io.on("connection", (socket) => {

    console.log(
      `User Connected: ${socket.id}`
    );


    // Join Project Room
    socket.on(
      "join-project",
      (projectId) => {

        socket.join(projectId);

        console.log(
          `Joined Project: ${projectId}`
        );

      }
    );


    // Task Update Event
    socket.on(
      "task-updated",
      (data) => {

        io.to(data.projectId).emit(
          "task-updated",
          data
        );

      }
    );


    // Disconnect
    socket.on(
      "disconnect",
      () => {

        console.log(
          `Disconnected: ${socket.id}`
        );

      }
    );

  });

};


export const getIO = () => {

  if (!io) {

    throw new Error(
      "Socket.io not initialized"
    );

  }

  return io;

};