const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
let loader = document.getElementById("loader");
let toBeReplaced = document.querySelector(".tbody");
let html = `<tr>
<td>{prenom}</td>
<td>{nom}</td>
<td>{filier}</td>
<td>{destination}</td>
<td><span class="bg-{status_class}">{status}</span></td>
<td>
  <button class="btn-cursus" data-id="{id}">Cursus</button>
  <button class="btn-modifier" data-id="{id}">Modifier</button>
  <button class="btn-delete" data-id="{id}">Suprimer</button>
</td>
</tr><tr><td>{clients}</td></tr>`;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/users`, options);
    if (!res.ok) {
      throw new Error("something was off" + res.statusText);
    }
    const data = await res.json();
    const users = data.data.users;
    for (const user of users) {
      if (user.role === 'employ' || user.role === 'admin') {
        continue;
      }
      let htmltemp = html
        .replace("{nom}", user.nom)
        .replace("{prenom}", user.prenom)
        .replace("{destination}", user.destination)
        .replace(/{id}/g, user._id)
        .replace("{filier}", user.filier)
        .replace("{status}", user.status);
        if(user.status == "En cours"){
          htmltemp=htmltemp.replace("{status_class}","cour");
        }else if(user.status == "Échec"){
          htmltemp = htmltemp.replace("{status_class}","echec");
        }else if(user.status == "Terminé"){
          htmltemp = htmltemp.replace("{status_class}","termine");
        }
      toBeReplaced.innerHTML = toBeReplaced.innerHTML.replace(
        "<tr><td>{clients}</td></tr>",
        htmltemp
      );
    }
    toBeReplaced.innerHTML = toBeReplaced.innerHTML.replace(
      "<tr><td>{clients}</td></tr>",
      ""
    );
    loader.style.display = "none";
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
});
  ///////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////////////
  document.getElementById("add_client").addEventListener("click", function () {
    window.location.assign("http://127.0.0.1:8000/add_client");
  });
  document.getElementById("add-client-button").addEventListener("click", function () {
    window.location.assign("http://127.0.0.1:8000/add_client");
  });
/////////////////////////////////////////////////////////////////
const sup = async (id) => {
  try {
    await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  } catch (err) {
    console.log(err);
  }
};
// Event listener for delete buttons (delegation for dynamically added buttons)
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-delete")) {
    const userId = event.target.dataset.id;
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await sup(userId);
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  }
});

/////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-modifier")) {
    const userId = event.target.dataset.id;
    localStorage.setItem('userId', userId);
    document.location.assign(`http://127.0.0.1:8000/edit`);
  }
});

/////////////////////////////////////////////////////////////////////////////////////
//sreach
document.getElementById("searchInput").addEventListener("keyup", function () {
  var input, filter, table, tr, td, i, txtValuePrénom, txtValueNom;
  input = document.getElementById("searchInput");
  filter = input.value.toLowerCase().split(' ');
  table = document.querySelector(".table tbody");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    tdPrénom = tr[i].getElementsByTagName("td")[0];
    tdNom = tr[i].getElementsByTagName("td")[1];
    if (tdPrénom && tdNom) {
      txtValuePrénom = tdPrénom.textContent || tdPrénom.innerText;
      txtValueNom = tdNom.textContent || tdNom.innerText;
      var match = true;
      filter.forEach(function (term) {
        if (txtValuePrénom.toLowerCase().indexOf(term) === -1 && txtValueNom.toLowerCase().indexOf(term) === -1) {
          match = false;
        }
      });
      if (match) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});
