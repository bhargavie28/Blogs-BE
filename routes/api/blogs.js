const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Blogs = require("../../models/Blogs");

//@route    GET api/blogs
//@desc     Test route
//@access   Public
router.get("/", async (req, res) => {
  try {
    const blogs = await Blogs.find().sort({createdAt: 'desc'});
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Serve Error");
  }
});

//@router POST api/blogs

router.post(
  "/blog",
  [check("title", "Title is reqired").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newBlog = new Blogs({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
      });

      const blog = await newBlog.save();
      res.send(blog);
    } catch (err) {
      console.error(err);
    }
  }
);
//@route    PUT api/blogs
router.put(
  "/blog/:id",
  [
    check("title", "Title is reqired").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const blog = await Blogs.findById(req.params.id);
      blog.title = req.body.title;
      blog.description = req.body.description;
      blog.content = req.body.content;
      await blog.save();
      res.send(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route Delete api/blogs

router.delete("/blog/:id", async(req,res)=> {
    try{
        const blog = await Blogs.findById(req.params.id);
        if(!blog){
            return res.status(404).json({msg: 'Blog not found'})
        }
        await blog.deleteOne();
        res.send('Blog Removed')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
});
// @route GET/:id api/blogs

router.get("/:id", async(req,res)=> {
    try{
        const blog = await Blogs.findById(req.params.id);
        if(!blog){
            return res.status(404).json({msg: 'Blog not found'})
        }
        res.send(blog)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})

module.exports = router;
