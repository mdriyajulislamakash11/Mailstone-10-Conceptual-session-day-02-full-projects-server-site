const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//Midleware
app.use(cors()); //cors()    বাইরের ডোমেইন থেকে API রিকোয়েস্টের অনুমতি দেয়
app.use(express.json()); //express.json()    JSON ডেটাকে বুঝে ফেলে এবং JavaScript object-এ রূপান্তর করে

//Mongo DB conneted code:

// M-10-Con-Sess-day-2
// ZxHzRvg9KvlAruqL

const uri =
  "mongodb+srv://M-10-Con-Sess-day-2:ZxHzRvg9KvlAruqL@cluster0.zchez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const gymCollection = client.db("gym-schedule").collection("schedule");

    // Post man test purpose: ==>
    // app.post("/data", (req, res) =>{
    //     const data = req.body;
    //     res.json({
    //         status: true,
    //         data : data,
    //     })
    // })

    // get methods:
    app.get("/schedule", async (req, res) => {
      const cursor = gymCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // dynamic id:
    app.get("/schedule/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await gymCollection.findOne(query);
      res.send(result);
    });

    // Post Methods:
    app.post("/schedule", async (req, res) => {
      const data = req.body;
      const result = await gymCollection.insertOne(data);
      res.send(result);
    });

    // Update (PUT) API
    app.put("/schedule/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedData = req.body;
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          title: updatedData.title,
          dayNumber: updatedData.dayNumber,
          date: updatedData.date,
          dayName: updatedData.dayName,
          time: updatedData.time,
        },
      };

      const result = await gymCollection.updateOne(filter, updateDoc, option);
      res.send(result);
    });

    // Delete Methods:
    app.delete("/schedule/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await gymCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
