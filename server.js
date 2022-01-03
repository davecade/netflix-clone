const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require('./routes/routes')

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

//-- Middleware --//
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//-- Routes --//
app.use('/movies', router)

//-- Production Route--//
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

//-- Runs Server
app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Server runnning on port ${port}`);
});
