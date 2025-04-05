const email = document.getElementById("email");
const pass = document.getElementById("password");

function fetchUser1() {
  fetch("http://localhost:8080/myData", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const user = data.find(
        (el) => el.email === email.value && el.password === pass.value
      );
      console.log(user);
      if (user) {
        alert("Logged in sucessfully");
        window.location.href = "dataEntry.html";
      } else {
        alert("You have entered the wrong credentials");
        window.location.href = "account.html";
      }
    });
}

function signUP() {
  window.location.href = "account.html";
}
