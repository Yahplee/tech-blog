const signin = async (event) => {
	event.preventDefault();

	const email = document.querySelector("#loginEmail").value;
	const password = document.querySelector("#loginPassword").value;

	const response = await fetch("/api/users/login", {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: { "Content-Type": "application/json" },
	});

	console.log(response);
	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		alert(`You have entered an incorrect email or password.
Please try again.`);
	}
};

document.querySelector(".login").addEventListener("submit", signin);
