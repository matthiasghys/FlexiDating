document.querySelector('#form').addEventListener('submit', function (e) {
    e.preventDefault();

    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/create.php';

    const dag = document.getElementById('inputDateDay').value;
    const maand = document.getElementById('inputDateMonth').value;
    const year = document.getElementById('inputDateYear').value;

    const datum = year + "-" + maand + "-" + dag;
    let foto = "";
    if (document.getElementById('inputGender').value === "m") {
        foto = 'https://scrumserver.tenobe.org/scrum/img/man_7.png'
    } else {
        foto = 'https://scrumserver.tenobe.org/scrum/img/woman_8.png'
    }

    let data = {
        familienaam: document.getElementById('inputLastName').value,
        voornaam: document.getElementById('inputFirstName').value,
        geboortedatum: datum,
        email: document.getElementById('inputEmail').value,
        nickname: document.getElementById('inputUsername').value,
        foto: foto,
        beroep: document.getElementById('inputProfession').value,
        sexe: document.getElementById('inputGender').value,
        haarkleur: document.getElementById('inputHairColor').value,
        oogkleur: document.getElementById('inputEyeColor').value,
        grootte: document.getElementById('inputHeight').value,
        gewicht: document.getElementById('inputWeight').value,
        wachtwoord: document.getElementById('inputPassword1').value,
        lovecoins: 3

    };


    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            location.replace('login.html')
        })
        .catch(function (error) {
            console.log(error);
        });

});