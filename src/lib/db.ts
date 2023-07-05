import mongoose from "mongoose";
let connection: any = null;
const poolsize = 10;
export const connectToDatabase = async () => {
  if (!process.env.MONGO)
    throw new Error("MongoDB connection string not found");
  if (
    connection === null ||
    (connection.connection.readyState !== 1 &&
      connection.connection.readyState !== 2)
    // readystate 1 === connected, 2 === connecting, I don't want to start new connection if it's already connecting.
  ) {
    // mongoose = require("mongoose");
    console.log("[MONGOOSE] Creating New Connection");

    mongoose.connection.on("open", () => {
      console.log("[ MONGOOSE] Connected with poolSize " + poolsize);
    });

    try {
      mongoose.connect(process.env.MONGO);
    } catch (err) {
      console.log("Mongoose connection error", err);
    }
    connection = mongoose; //save it to the cache variable
    return;
  } else {
    return;
  }
};
