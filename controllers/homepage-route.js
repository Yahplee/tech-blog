const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// get all of the posts
router.get("/", async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [{ model: User, attribute: { exclude: ["password"] } }],
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render("homepage", {
			posts,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// get single post, give me POST, comment, and comment user
router.get("/posts/:id", async (req, res) => {
	try {
		const postData = await Post.findByPK({
			include: [
				{
					model: User,
					attribute: { exclude: ["password"] },
				},
				{
					model: Comment,
					include: [{ model: User, attribute: { exclude: ["password"] } }],
				},
			],
		});

		const singlePost = postData.get({ plain: true });

		res.render("postpage", {
			singlePost,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// dashboard: get all posts of user through user id

// dashbaord: can edit user's post

// dashboard: can add new posts

// login page
router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	res.render("login");
});

// signup page
router.get("/signup", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	res.render("signup");
});

module.exports = router;
