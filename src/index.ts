import express from "express";
import cors from "cors";
import campaignRoutes from "./routes/campaign";

const app = express();

app.use(express.json());

// app.use("/", (_req, res) => {
//   res.send("API is running");
// });
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/campaign", campaignRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
