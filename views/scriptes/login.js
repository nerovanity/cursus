const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
fetch(`http://127.0.0.1:8000/api/v1/users/check`, options).then((res) => {
  if (res.ok) {
    window.location.replace("http://127.0.0.1:8000/homepage");
  }
});

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error_field = document.querySelector(".error-field");
  const errormsg = document.createElement("p");

  error_field.innerHTML = "";

  const postData = {
    email: email,
    password: password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };

  fetch(`http://127.0.0.1:8000/api/v1/users/login`, options)
    .then((response) => {
      if (response.ok) {
        window.location.replace("http://127.0.0.1:8000/homepage");
      } else {
        return response.json().then((error) => {
          error_field.innerHTML = "";
          errormsg.textContent = error.message;
          error_field.appendChild(errormsg);
        });
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
});

//toggle password visibility
// document.addEventListener("DOMContentLoaded", function() {
//   var passwordField = document.getElementById("password");
//   var toggleButton = document.getElementById("pass_toggle");

//   toggleButton.addEventListener("click", function() {
//       if (passwordField.type === "password") {
//           passwordField.type = "text";
//       } else {
//           passwordField.type = "password";
//       }
//   });
// });
