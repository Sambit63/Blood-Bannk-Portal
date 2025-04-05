const takenemail = document.getElementById("email");
const takenpass = document.getElementById("pass");
const takenname = document.getElementById("name");

function submitData() {
  if (
    takenname.value.trim() !== "" &&
    takenemail.value.trim() !== "" &&
    takenpass.value.trim() !== ""
  ) {
    // Fetch existing users to check for duplicate username
    fetch("http://localhost:8080/myData")
      .then((res) => res.json())
      .then((users) => {
        const usernameExists = users.some(
          (user) => user.name === takenname.value
        );
        const usermailExists = users.some(
          (user) => user.email === takenemail.value
        );
        // Check user name is exist ot not
        if (usernameExists) {
          alert("Username already exists! Please choose a different one.");
          takenname.focus();
        }
        // Check email is already exist or not
        else if (usermailExists) {
          alert("Email already exists! Please choose a different one.");
          takenemail.focus();
        } else {
          // If username is unique, proceed with account creation
          const obj = {
            id: Date.now(),
            name: takenname.value,
            email: takenemail.value,
            password: takenpass.value,
          };

          fetch("http://localhost:8080/myData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              alert("Account Created");
              window.location.href = "login.html";
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log("Error fetching users:", error));
  } else {
    alert("Fill in all the fields");
  }
}

function login() {
  window.location.href = "login.html";
}
