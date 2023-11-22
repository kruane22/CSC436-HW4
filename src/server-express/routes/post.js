//REMOVE PRIVATE KEY BEFORE COMMITTING!!!
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const privateKey = "";

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.post("/", async function (req, res) {
console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateSet: req.body.dateSet,
    complete: req.body.complete,
    dateComplete: req.body.dateComplete
  });
  console.log(post)
  post
    .save()
    .then((savedPost) => {
      console.log(savedPost)
      return res.status(201).json({
        id: savedPost._id,
        title: savedPost.title,
        description: savedPost.description,
        author: savedPost.author,
        dateSet: savedPost.dateSet,
        complete: savedPost.complete,
        dateComplete: savedPost.dateComplete
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {
  Post.find()
    .where("author")
    .equals(req.payload.id)
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.patch("/:id", async function (req, res) {
  console.log(req.body)
  console.log(req.params.id)
  try{

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    
    return res.status(200).json(post);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async function (req, res) {
  try{
    const post = await Post.findByIdAndDelete(req.params.id)
    return res.status(200).json(post)
  }
   catch (error) {
    return res.status(500).json({ error: error.message }); 
}});
// router.delete("/:id", async function (req, res) {}
// //   Post.findByIdAndDelete(req.params.id)
// //     .where("author")
// //     .equals(req.payload.id)
// //     .then((post) => {
// //       if (post) {
// //         return res.status(200).json({
// //           id: post._id,
// //           title: post.title,
// //           content: post.content,});
// //         }}).catch((error) => {

module.exports = router;