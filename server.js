require('dotenv').config();
const express = require('express');
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const frontRoutes = require("./routes/frontRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/front", frontRoutes);

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));