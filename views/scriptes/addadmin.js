document.getElementById('submit').addEventListener('click', () => {
    const nom = document.getElementById('Adminnom').value;
    const prenom = document.getElementById('Adminprenom').value;
    const email =  document.getElementById('email').value;

    var radios = document.getElementsByName('role');
    var role;
  
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      role = radios[i].value;
      break;
    }
  }

  if (!role) {
    return alert('Veuillez sélectionner un rôle.');
  }

    const postData = {
        nom,
        prenom,
        email,
        role
      };
    
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };

      fetch(`http://127.0.0.1:8000/api/v1/users/adduser`,options)
      .then((response) => {
        if (response.ok) {
          alert(' l\'utilisateur a été créé avec succès.');
          location.reload();
        } else {
          return response.json().then((error) => {
            alert(error.message);
          });
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
});
document.getElementById('adminlist').addEventListener('click', () =>{
  location.assign(`http://127.0.0.1:8000/liste_admin`);
});
document.getElementById('ManageButtone').addEventListener('click', () =>{
  location.assign(`http://127.0.0.1:8000/homepage`);
});
document.getElementById("logout").addEventListener("click", function () {
  const options_logout = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`http://127.0.0.1:8000/api/v1/users/logout`, options_logout).then(
    (response) => {
      if (response.ok) {
        window.location.assign("http://127.0.0.1:8000/overview");
      } else {
        return response.json().then((error) => {
          console.log(error.message);
        });
      }
    }
  );
  ////////////////////////////////////////////////////////////////////////////////
});