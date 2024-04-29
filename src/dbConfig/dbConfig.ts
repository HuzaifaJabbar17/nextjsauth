import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URi!);
    const connection = mongoose.connection;
    // console.log(connection.on);

    // connection.on takes arguement as an event and a callback
    // connection.on("predefined_event",callback_function)

    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });
    connection.on("error", (error) => {
      console.log(
        "MongoDb connection error,please ensure db is up and running : " + error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting to db");
    console.log(error);
  }
}
