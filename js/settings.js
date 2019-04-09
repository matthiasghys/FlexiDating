window.onload = function () {
    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + sessionStorage.getItem('id');

    const request = new Request(url, {
        method: 'GET',
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
            console.log(data.voornaam);
            invullenData(data);




            const buttonsChange = document.querySelectorAll('button.change')
            buttonsChange.forEach((button) => {
                button.addEventListener('click', () => {
                    document.getElementById("change" + button.id).innerHTML =
                        "<input type='text' id = 'nieuw" + button.id + "' value ='" + document.getElementById('show' + button.id).textContent + "'>"
                    document.getElementById('buttonColumn' + button.id).innerHTML = "<button id='save%" + button.id + "' class='btn btn-sm btn-success save'>Save</button>" +
                        "<button id='cancel" + button.id + "' class='btn btn-sm btn-danger cancel'>Cancel</button>"
                    const buttonsSave = document.querySelectorAll('button.save');
                    buttonsSave.forEach((button) => {
                        button.addEventListener('click', () => {
                            const keySave = button.id.split("%")[1];


                            let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + sessionStorage.getItem('id');

                            const request = new Request(url, {
                                method: 'GET',
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                })
                            });

                            fetch(request)
                                .then(function (resp) {
                                    return resp.json();
                                })
                                .then(function (data) {
                                    data[keySave] = document.getElementById('nieuw' + keySave).value
                                    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/update.php';
                                    const request = new Request(url, {
                                        method: 'PUT',
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
                                            location.replace('settings.html')
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });

                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                        })

                    });
                    const buttonCancel = document.querySelectorAll('button.cancel')
                    buttonCancel.forEach((button) =>{
                        button.addEventListener('click', ()=>{
                            location.replace('settings.html')
                        })
                    })
                });
            })

        })

        .catch(function (error) {
            console.log(error);
        });


    function invullenData(data) {
        document.getElementById('showvoornaam').innerText = data.voornaam;
        document.getElementById('showfamilienaam').innerText = data.familienaam;
        document.getElementById('shownickname').innerText = data.nickname;
        // document.getElementById('profo').setAttribute('src', data.foto);
        document.getElementById('showgeboortedatum').innerText = data.geboortedatum;
        document.getElementById('showemail').innerText = data.email;
        document.getElementById('showberoep').innerText = data.beroep;
        document.getElementById('showsexe').innerText = data.sexe;
        document.getElementById('showhaarkleur').innerText = data.haarkleur;
        document.getElementById('showoogkleur').innerText = data.oogkleur;
        document.getElementById('showgrootte').innerText = data.grootte;
        document.getElementById('showgewicht').innerText = data.gewicht;
        document.getElementById('showwachtwoord').innerText = data.wachtwoord;
    }

    document.querySelector('#deleteAccount').addEventListener('click', ()=>{
        if (window.confirm("Are you sure you want to delete your account? all data will be lost, including your precious favourites.")){
            let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/delete.php';

            let data = {
                "id": sessionStorage.getItem('id')
            };

            const request = new Request(url, {
                method: 'DELETE',
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

                        location.replace('login.html')

                })
                .catch(function (error) {
                    console.log(error);
                });
        };

    })


}
