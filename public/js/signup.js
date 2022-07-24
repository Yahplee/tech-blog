const signUp = async (event) => {
	event.preventDefault();

	const username = document.getElementById("signUpUsername").value.trim();
	const email = document.getElementById("signUpEmail").value.trim();
	const password = document.getElementById("signUpPassword").value.trim();

	if (username && email && password) {
		const response = await fetch("/api/users", {
			method: "POST",
			body: JSON.stringify({ username, email, password }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			document.location.replace("/dashboard");
		} else {
			alert(`You have entered an invalid input.
            Please check to see the following requirement:
            Password must be at least 4 characters long.`);
		}
	}
};

document.querySelector(".signUp").addEventListener("submit", signUp);
