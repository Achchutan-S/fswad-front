const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// mongoose connection
mongoose
  .connect("mongodb://localhost:27017/sampleQP")
  .then(() => {
    console.log("Connected qp dp");
  })
  .catch((error) => {
    console.log(error);
  });

// SCHEMA AND MODEL

const postSchema = mongoose.Schema({
  name: String,
  cNum: {
    type: String,
    unique: true,
    required: true,
  },
  city: String,
  state: String,
  pincode: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
  },
});

const Post = mongoose.model("Post", postSchema);

//the database part gets over here

app.get("/", (req, res) => {
  res.send("Express comes here");
});

app.post("/create", (req, res) => {
  //   console.log(req.body);
  Post.create({
    cNum: req.body.cNum,

    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
  })
    .then((doc) => {
      console.log("created");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => {
      res.json(items);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => {
      console.log("deleted: ");
      console.log(doc);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put("/update/:id", (req, res) => {
  // console.log(req.params);
  // console.log(req.body);

  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      cNum: req.body.cNum,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    }
  )
    .then((doc) => {
      console.log(doc);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/search/:id", (req, res) => {
  console.log(req.params);
  // console.log(req.body);
  const searchId = req.params.id;

  Post.findOne({ cNum: searchId })
    .then((post) => {
      if (!post) {
        res.status(404).json({ message: "Post not found" });
      } else {
        res.json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(3001, () => {
  console.log("Server on 3001");
});
