function adminLogin(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const adminUser = document.getElementById("admin-user").value.trim();
  const adminPass = document.getElementById("admin-pass").value.trim();

  if (adminUser === "" || adminPass === "") {
    alert("Please fill in all fields");
    return;
  }

  // Fetch admin credentials from the JSON server
  fetch("http://localhost:8080/admin")
    .then((response) => response.json())
    .then((admins) => {
      const validAdmin = admins.find(
        (admin) => admin.name === adminUser && admin.pass === adminPass
      );

      if (validAdmin) {
        alert("Login Successful!");
        localStorage.setItem("token", JSON.stringify(Date.now()));
        window.location.href = "../displayData.html"; // Redirect to admin dashboard
      } else {
        alert("Invalid Username or Password!");
        document.getElementById("admin-user").focus();
      }
    })
    .catch((error) => {
      console.error("Error fetching admin data:", error);
      alert("Server error! Please try again later.");
    });
}
