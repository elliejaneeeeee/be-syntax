import dotenv from "dotenv";
import app from "./app.mjs";

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log("Server listening...")
})