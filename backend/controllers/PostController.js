import Post from "../models/PostModel.js";

// Create and Save a new Post
export const create = async (req, res) => {
  // Create a Post
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    published: req.body.published ? req.body.published : false,
  });

  // Save Post in the database
  try {
    const createdPost = await post.save();
    res.json(createdPost);
  } catch (error) {
    res.status(400).send({
      message: error.message || "Some error occurred while creating the Post.",
    });
  }
};

// Retrieve all Posts from the database.
export const findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  try {
    const posts = await Post.find(condition);
    res.json(posts);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving posts.",
    });
  }
};

// Find a single Post with an id
export const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);

    if (!post)
      res.status(404).send({ message: "Not found Post with id: " + id });
    else res.send(post);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving Post with id: " + id });
  }
};

// Update a Post by the id in the request
export const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!post) {
      res.status(404).send({
        message: `Cannot update Post with id=${id}. Post cannot be found!`,
      });
    } else res.json({ message: "Post was updated successfully." });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving Post with id=" + id });
  }
};

// Delete a Post with the specified id in the request
export const deleteOne = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findByIdAndRemove(id, { useFindAndModify: false });

    if (!post) {
      res.status(404).send({
        message: `Cannot delete Post with id=${id}. Post cannot be found!`,
      });
    } else {
      res.send({
        message: "Post was deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Could not delete Post with id=" + id,
    });
  }
};

// Find all published Posts
export const findAllPublished = async (req, res) => {
  try {
    const posts = await Post.find({ published: true });
    res.json(posts);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving posts.",
    });
  }
};
