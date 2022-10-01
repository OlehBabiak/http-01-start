const {postController} = require("../controllers/index");
const {postMiddleware} = require("../middlevares");
const router = require('express').Router();


router.get('/', postController.getPosts)
router.post('/', postMiddleware.isPostValid, postController.createPost)
router.delete('/', postController.deletePosts)
router.get('/:id', postController.getPostById)
router.put('/:id', postController.updatePostById)
router.delete('/:id', postController.deletePostById)

module.exports = router
