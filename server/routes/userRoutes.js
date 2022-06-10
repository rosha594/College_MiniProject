const express = require('express');
const { registerUser, authUser, userData, userUpdate,createBlog,getTrendingBlogs,getBloggerBlogs } = require('../controllers/userControllers');


const router = express.Router();

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/home/profile').post(userData)
router.route('/home/profile/update').post(userUpdate)
router.route('/home/create_blog').post(createBlog)
router.route('/trendingBlogs').get(getTrendingBlogs)
router.route('/blogger_Blogs').post(getBloggerBlogs)

module.exports = router;