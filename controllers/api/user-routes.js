const router = require("express").Router();
const { User } = require("../../models");

// sign up and create credentials in the database
router.post("/", async (req, res) => {
	try {
		const userData = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		req.session.save(() => {
			req.session.loggedIn = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// create the logged in session ()
router.post("/login", async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { email: req.body.email },
		});
		if (!userData) {
			res.status(400).json({ message: "The email or password is invalid." });
			return;
		}
		// match the email with db

		const userPass = await userData.checkPassword(req.body.password);
		if (!userPass) {
			res.status(400).json({ message: "The email or password is invalid." });
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.loggedIn = true;
			res.json({ user: userData, message: "Login successful." });
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// destroy the session
router.post("/logout", async (req, res) => {
	try {
		if (req.session.loggedIn) {
			req.session.destroy(() => {
				res.status(204).end();
			});
		}

		res.status(404).end();
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
