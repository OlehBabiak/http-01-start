const {PostDB} = require("../dataBase");
module.exports = {

  getPosts: async ( req, res, next ) => {
    try {
      const posts = await PostDB.find();
      return res.status(200).json({
        posts
      })
    } catch (e) {
      next(e)
    }
  },

  deletePosts: async ( req, res, next ) => {
    try {
      await PostDB.remove();
      return res.status(200).json({
        message: 'Post were deleted',
      });
    } catch (e) {
      next(e)
    }
  },

  createPost: async ( req, res, next ) => {
    try {
      const postData = req.body;
      await PostDB.create(postData)
      res.status(200).json({
        message: 'Post created successfully',
      });
    } catch (e) {
      next(e)
    }
  },

  getPostById: async ( req, res, next ) => {
    try {

    } catch (e) {
      next(e)
    }
  },

  updatePostById: async ( req, res, next ) => {
    try {

    } catch (e) {
      next(e)
    }
  },

  deletePostById: async ( req, res, next ) => {
    try {

    } catch (e) {
      next(e)
    }
  }
}
