const newComment = async (event) => {
	event.preventDefault();

	const contents = document.querySelector("#updatePostContent").value.trim();
	const post_id = document.querySelector("input[name='postid']").value.trim();

	console.log(contents);
	console.log(post_id);
	if (contents) {
		const response = await fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify({ contents, post_id }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert("Please enter an appropriate comment.");
		}
	}
};

document.querySelector(".commentSubmit").addEventListener("submit", newComment);
