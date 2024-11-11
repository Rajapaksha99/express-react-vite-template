const express = require('express');
const app = express();
const cors = require("cors");

const corsOption = {
    origin: ["http://localhost:5173"], // Corrected to "localhost"
}


app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "strawberry", "banana"] });
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});
