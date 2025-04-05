document.addEventListener("DOMContentLoaded", displayDonorDetails);

function displayDonorDetails() {
  fetch("http://localhost:8080/donorData")
    .then((res) => res.json())
    .then((data) => {
      const donorTable = document.getElementById("donorTable");

      // Preserve the table headers
      donorTable.innerHTML = `
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Blood Group</th>
          <th>Contact</th>
          <th>Remove Details</th>
        </tr>
      `;

      data.forEach((donor) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${donor.id}</td>
          <td>${donor.donorName}</td>
          <td>${donor.donorAge}</td>
          <td>${donor.bloodGroup}</td>
          <td>${donor.contact}</td>
          <td>
            ${
              token
                ? `<button onclick="deleteDonor(${donor.id})">Delete</button>`
                : `<button disabled>Delete</button>`
            }
          </td>
        `;
        donorTable.appendChild(row);
      });
    })
    .catch((err) => console.log(err));
}

function deleteDonor(donorId) {
  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    alert("Unauthorized! Please log in first.");
    return;
  }

  fetch(`http://localhost:8080/donorData/${donorId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Assuming token is used for authentication
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Donor deleted successfully.");
        displayDonorDetails(); // Refresh the donor list after deletion
      } else {
        console.error("Failed to delete donor");
      }
    })
    .catch((err) => console.log(err));
}

// Handle login/logout button behavior
const token = JSON.parse(localStorage.getItem("token"));
const loginlogout = document.getElementById("login_heading");

if (token) {
  loginlogout.innerText = "Log Out";
  loginlogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  });
} else {
  loginlogout.innerText = "Log In";
  loginlogout.addEventListener("click", () => {
    window.location.href = "./login.html";
  });
}

// Redirect to data entry page
function newData() {
  window.location.href = "dataEntry.html";
}
