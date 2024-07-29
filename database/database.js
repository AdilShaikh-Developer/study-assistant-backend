import mongoose from "mongoose";

export const DatabaseConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => console.log("Databse Connect"));
};
