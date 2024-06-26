import "dotenv/config";
import connectDB from "./db/db.js";
import app from "./app.js";
connectDB().then(() => {
  app.on("error", (err) => {
    console.log("BASE ERROR", err);
  });
  app.listen(process.env.PORT, () => {
    console.log(`app is listeing on port ${process.env.PORT}`);
  });
});
