const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
// let loader = document.getElementById("loader");
let toBeReplaced = document.querySelector("body");
 let html = `<tr>
              <td>{nom}</td>
              <td>{prenom}</td>
              <td>
                  <form>
                      <label>
                          <input type="radio" name="role" value="admin" disabled {employ}> employ
                      </label>
                      <label>
                          <input type="radio" name="role" value="superadmin" disabled {admin}> Admin
                      </label>
                  </form>
              </td>
              <td class="action-buttons">
                  <button class="modifier-button" data-id="{id}">Modifier</button>
                  <button class="enregistrer-button hidden" onclick="enregistrer(this)">Enregistrer</button>
                  <button class="delete-button" data-id="{id}">Delete</button>
              </td>
          </tr>
<tr><td>{users}</td></tr>`

document.addEventListener("DOMContentLoaded", async () => {
    try{
        const res = await fetch(`http://127.0.0.1:8000/api/v1/users`, options);
        if (!res.ok) {
        throw new Error("something was off" + res.statusText);
        }
        const data = await res.json();
        const users = data.data.users;
        for (const user of users) {
            if (user.role === 'user') {
                continue;
              }
              let htmltemp = html
              .replace('{nom}',user.nom)
              .replace('{prenom}',user.prenom)
              .replace(/{id}/g, user._id);
              if(user.role === 'admin'){
                htmltemp = htmltemp.replace('{admin}','checked');
              }else{
                htmltemp = htmltemp.replace('{employ}','checked');
              }
              toBeReplaced.innerHTML = toBeReplaced.innerHTML.replace(
                "<tr><td>{users}</td></tr>",
                htmltemp
              );
            }
              toBeReplaced.innerHTML = toBeReplaced.innerHTML.replace(
                "<tr><td>{users}</td></tr>",
                ""
              );
              loader.style.display = "none";
        
    }catch(error){
        console.log(error);
    }
});

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
  if (event.target.classList.contains("delete-button")) {
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