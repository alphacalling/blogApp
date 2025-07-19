const express = require('express');
const { fetchOne, fetchAll, updateBlog, addBlog, deleteBlog } = require('../controllers/blog.controller');
const { auth, isUser } = require('../middlewares/auth');

const router = express.Router();

router.post('/create', addBlog);
router.get('/fetchOne/:id', fetchOne);
router.get('/fetchAll', fetchAll);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);


module.exports = router;