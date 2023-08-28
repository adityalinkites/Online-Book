const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/backend/upload/comicImage", express.static("backend/upload/comicImage"));

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server running on post ${PORT}`);
});