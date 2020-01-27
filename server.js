const express = require("express");
// const fs = require("fs");
const apiR = require("./routes/apiR");
const htmlR = require("./routes/htmlR");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("db"));

app.use("/api", apiR);
app.use("/", htmlR);

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});