"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const campaign_1 = __importDefault(require("./routes/campaign"));
const app = (0, express_1.default)();
const CLIENT_URL = process.env.CLIENT_URL;
app.use(express_1.default.json());
// app.use("/", (_req, res) => {
//   res.send("API is running");
// });
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use("/campaign", campaign_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
