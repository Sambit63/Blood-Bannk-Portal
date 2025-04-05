const donorName = document.getElementById("dname");
const donorAge = document.getElementById("dage");
const bloodGroup = document.getElementById("bgroup");
const contact = document.getElementById("contact");

function submitDetails() {
  if (
    donorName.value !== "" &&
    donorAge.value !== "" &&
    bloodGroup.value !== "" &&
    contact.value !== "" &&
    donorAge.value >= 18
  ) {
    const obj1 = {
      id: Date.now(),
      donorName: donorName.value,
      donorAge: donorAge.value,
      bloodGroup: bloodGroup.value,
      contact: contact.value,
    };
    fetch("http://localhost:8080/donorData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj1),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Details Added");
      })
      .catch((err) => console.log(err));
  } else {
    alert("Fill in all the fields or Check the age of the donor");
    return;
  }
  window.location.href = "/login.html";
}
