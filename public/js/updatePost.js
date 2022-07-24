const updatePost = async (event) => {
	event.preventDefault();

	const id = document.querySelector("input[name='editPostId']").value.trim();
	const title = document.getElementById("editPostTitle").value.trim();
	const contents = document.getElementById("editPostContent").value.trim();

	const response = await fetch(`/api/posts/${id}`, {
		method: "PUT",
		body: JSON.stringify({ title, contents }),
		headers: { "Content-Type": "application/json" },
	});

	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		alert("You did not update anything.");
	}
};

document.querySelector(".editPost").addEventListener("submit", updatePost);
