const blogSchema = require("../models/blog.model");

// add blog
exports.addBlog = async (req, res) => {
  try {
    let payload = req.body;
    let newBlog = await blogSchema.create(payload);
    return res.status(201).json({
      success: true,
      message: "blog created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// fetch all
exports.fetchAll = async (req, res) => {
  try {
    let blogs = await blogSchema.find().populate("user");
    if (blogs.length == 0) {
      throw new Error("no blog found");
    }
    res.status(200).json({
      success: true,
      message: "all blogs fetched",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// fetch one
exports.fetchOne = async (req, res) => {
  // let {id} = req.params
  try {
    let findBlog = await blogSchema.findById(req.params.id);
    if (!findBlog) {
      throw new Error("no blog found.....");
    }
    res.status(200).json({
      success: true,
      message: "blog fetched",
      findBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update blog
exports.updateBlog = async (req, res) => {
  try {
    let findBlog = await blogSchema.findById(req.params.id);
    if (!findBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    

    let updatedBlog = await blogSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "blog updated",
      updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// delete blog
exports.deleteBlog = async (req, res) => {
  try {
    let findBlog = await blogSchema.findById(req.params.id);

    if (!findBlog) {
      throw new Error("no blog found");
    }

    let deletedBlog = await blogSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "blog deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
