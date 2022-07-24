const deletePost = async (event) => {
	event.preventDefault();

	const id = document.querySelector("input[name='editPostId']").value.trim();

	const response = await fetch(`/api/posts/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});

	if (response.ok) {
		document.location.replace("/dashboard");
	} else alert("You did not delete the post.");
};

document.querySelector(".deletePost").addEventListener("click", deletePost);
