const {postValidator} = require("../validators");
module.exports = {
  isPostValid: async ( req, res, next ) => {
    try {
      const {error} = await postValidator.createPost.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: `${error.details[0].message}`
        })
      }
      next();
    } catch (e) {
      next(e);
    }
  },
}
