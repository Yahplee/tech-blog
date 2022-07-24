const updatePost = async (event) => {
	event.preventDefault();

	const response = await fetch("/api/posts/:id", {
		method: "PUT",
	});
};
