const {postController} = require("../controllers/index");
const router = require('express').Router();


router.get('/', postController.getPosts)
router.post('/', postController.createPost)
router.get('/:id', postController.getPostById)
router.put('/:id', postController.updatePostById)
router.delete('/:id', postController.deletePostById)

module.exports = router
