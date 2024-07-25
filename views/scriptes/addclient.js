

document.getElementById("submit").addEventListener("click", () => {
  const Nom = document.getElementById("Nom").value;
  const Prenom = document.getElementById("prenom").value;
  const d_nais = document.getElementById("Datenaissance").value;
  const l_nais = document.getElementById("Lieunaissance").value;
  const email = document.getElementById("Emailstudent").value;
  const tel = document.getElementById("Telephonestudent").value;
  const filier = document.getElementById("filiere").value;
  const destination = document.getElementById("destination").value;
  const nom_par = document.getElementById("Nomparent").value;
  const prenom_par = document.getElementById("Prenomparent").value;
  const cin_par = document.getElementById("Cinparent").value;
  const res_parent = document.getElementById("lieuresparent").value;
  var services = [];
  var checkboxes = [
    { id: 'PaiementCheckbox', text: 'Paiement et signature d\'engagement' },
    { id: 'FournirCheckbox', text: 'Fournir le LOGIN ET LE MDP au candidat' },
    { id: 'recuperationCheckbox', text: 'Récupération des documents d\'inscription' },
    { id: 'EffectuerCheckbox', text: 'Effectuer l\'inscription et demande d\'admission conditionnelle' },
    { id: 'ReceptionCheckbox', text: 'Réception d\'admission conditionnelle' },
    { id: 'DemanderecuCheckbox', text: 'Demander le reçu de paiement ou le Swift de la transaction et l\'envoyer a l\'université' },
    { id: 'RecevoirCheckbox', text: 'Recevoir l\'acceptation finale après confirmation de réception de virement par l\'université' },
    { id: 'PriseCheckbox', text: 'Prise de RDV visa' },
    { id: 'MontageCheckbox', text: 'Montage de dossier visa' },
    { id: 'DepotCheckbox', text: 'Dépôt de demande de visa' },
    { id: 'RetraitCheckbox', text: 'Retrait de décision' },
    { id: 'PreparationCheckbox', text: 'Préparation des documents de voyage' },
    { id: 'ReservationCheckbox', text: 'Réservation de billet d\'avion' },
    { id: 'PickupCheckbox', text: 'Pick-up aéroport' },
    { id: 'DeposerCheckbox', text: ' Déposer l\'étudiant a l\'hôtel ou à la cite universitaire' },
    { id: 'finalCheckbox', text: ' Finalisation d\'inscription a l\'université' },
    { id: 'RechercheCheckbox', text: 'Recherche des offres de location' },
    { id: 'OuvertsCheckbox', text: 'Ouverture du compte bancaire' },
    { id: 'TourCheckbox', text: 'Tour de villet' },
    { id: 'FinCheckbox', text: 'Fin de service' },
  ];

  checkboxes.forEach(function(checkbox) {
    var element = document.getElementById(checkbox.id);
    if (element && element.checked) {
      services.push({ name: checkbox.text});
    }
  });

  const postData = {
    nom: Nom,
    email: email,
    prenom: Prenom,
    filier:filier,
    destination: destination,
    telephone:tel,
    lieu_nai:l_nais,
    date_nai:d_nais,
    services: services,
    parent:{
      nom: nom_par,
      prenom:prenom_par,
      cin:cin_par,
      adress:res_parent
    }
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