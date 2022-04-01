const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();

const serviceAccount = require("./permissions.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://e-commerce-24233-default-rtdb.firebaseio.com"
});

app.get("/hello-world", (req, res) => {
    return res.status(200).json({ message: "Hello World!" });
});

app.use(cors({ origin: true }));

// Routes
//app.use(require("./routes/products.routes"));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/producto', require('./routes/products'));

exports.app = functions.https.onRequest(app);
