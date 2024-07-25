const userId = localStorage.getItem('userId');

let services;

document.addEventListener('DOMContentLoaded', async() => {
    let loader = document.getElementById("loader");
    let toBeReplaced = document.querySelector("tbody");
    let html = `<tr>
    <td>{name}</td>
    <td class="status">
        <p class="ter">Terminé</p>
        <input type="radio" name="{id}-action" value="Terminé" data-id="{id}" {termine}>
    </td>
    <td class="status">
        <p class="Enc">En cours</p>
        <input type="radio" name="{id}-action" value="En cours" data-id="{id}" {en_cours}>
    </td>
    <td class="status">
        <p class="Ech">Échec</p>
        <input type="radio" name="{id}-action" value="Échec" data-id="{id}" {echec}>
    </td>
</tr> <tr><td>{service}</td></tr>`;
        const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };


    try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`, options);
        if (!res.ok) {
          throw new Error("something was off" + res.statusText);
        }
        const data = await res.json();
        const user = data.data.user;
        services = data.data.user.services;
        
        document.getElementById('name').innerHTML = `${user.nom} ${user.prenom}`

        for (const service of services) {
            let htmltemp = html
            .replace('{name}',service.name)
            .replace(/{id}/g,service._id)
            .replace('{en_cours}', service.status === "En cours" ? 'checked' : '')
            .replace('{termine}', service.status === 'Terminé' ? 'checked' : '')
            .replace('{echec}', service.status === 'Échec' ? 'checked' : '');

            toBeReplaced.innerHTML = toBeReplaced.innerHTML.replace(
                "<tr><td>{service}</td></tr>",
                htmltemp
            );
        }
        toBeReplaced.innerHTML = toBeReplaced.innerHTML.replace(
            "<tr><td>{service}</td></tr>",
            ""
        );
        loader.style.display = "none";
        }catch (err) {
            console.error("Fetch error:", err);
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
  
  document.getElementById('ManageButton').addEventListener('click', () =>{
    location.assign(`http://127.0.0.1:8000/homepage`);
  });

  
  function getCheckedStatus(id) {
    const radios = document.querySelectorAll(`input[name="${id}-action"]`);
    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null; 
}


document.getElementById('submit').addEventListener('click',()=> {

        for (const service of services) {
            const status = getCheckedStatus(service._id);
            if (status) {
                service.status = status;
            }
        }

        const postData = {
            services: services,
          };
          const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          };
        
            fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`,options)
            .then((response) => {
              if (response.ok) {
                alert('modiefier avec succès.');
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