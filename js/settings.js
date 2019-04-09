window.onload = function(){
    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id='+sessionStorage.getItem('id');

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
            const  buttons =  document.querySelectorAll('button')
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    const juisteData= "data." + button.id ;

                    document.getElementById("change"+button.id).innerHTML =
                        "<input type='text' value ='"+document.getElementById('show'+ button.id).textContent + "'>"
                    document.getElementById('buttonColumn'+button.id).innerHTML = "<button id='save' class='btn btn-sm btn-success'>Save</button>" +
                        "<button id='cancel' class='btn btn-sm btn-danger'>Cancel</button>"
                });
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    function invullenData(data){
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




}