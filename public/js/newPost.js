const newPost = async (event) => {
	event.preventDefault();

	const title = document.getElementById("createPostTitle").value.trim();
	const contents = document.getElementById("createPostContent").value.trim();

	const response = await fetch("/api/posts", {
		method: "POST",
		body: JSON.stringify({ title, contents }),
		headers: { "Content-Type": "application/json" },
	});

	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		alert("You have failed to create a post.");
	}
};

document.querySelector(".createPost").addEventListener("submit", newPost);
