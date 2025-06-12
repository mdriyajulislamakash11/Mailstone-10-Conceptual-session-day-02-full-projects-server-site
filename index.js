const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//Midleware
app.use(cors());            //cors()    বাইরের ডোমেইন থেকে API রিকোয়েস্টের অনুমতি দেয়
app.use(express.json());    //express.json()    JSON ডেটাকে বুঝে ফেলে এবং JavaScript object-এ রূপান্তর করে

//Mongo DB conneted code:


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
