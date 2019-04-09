

window.onload = function () {
    document.querySelector('#inloggen').addEventListener('click', function(e){
        let nickname = document.getElementById('inputNickname').value;
        let wachtwoord = document.getElementById('inputPassword').value;

        let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php';

        let data = {
            nickname: nickname,
            wachtwoord: wachtwoord
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
                sessionStorage.setItem('id', data.id);

            })
            .catch(function (error) {
                console.log(error);
            });






    });



    function validateRegister(id, familienaam, voornaam, geboortedatum, email, nickname, foto, beroep, sexe, haarkleur, oogkleur, grootte, gewicht, seksvoorkeur, wachtwoord) {

        const persoon = {
            "_id": id,
            "familienaam": familienaam,
            "voornaam": voornaam,
            "geboortedatum": geboortedatum,
            "email": email,
            "nickname": nickname,
            "foto": foto,
            "beroep": beroep,
            "sexe": sexe,
            "haarkleur": haarkleur,
            "oogkleur": oogkleur,
            "grootte": grootte,
            "gewicht": gewicht,
            "seksvoorkeur": seksvoorkeur,
            "wachtwoord": wachtwoord
        }

    }
}
