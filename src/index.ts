import express from "express";
import cors from "cors";
import campaignRoutes from "./routes/campaign";

const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

console.log("Client URL:", CLIENT_URL);

app.use(express.json());

// app.use("/", (_req, res) => {
//   res.send("API is running");
// });
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/campaign", campaignRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
