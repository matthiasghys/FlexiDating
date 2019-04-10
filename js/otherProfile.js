function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    console.log(query)
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
    }
    return(false);
}

document.querySelector('#p_favoriet').addEventListener('click', ()=>{
    let url = 'https://scrumserver.tenobe.org/scrum/api/favoriet/like.php';

        let data = {
            mijnId: sessionStorage.getItem("id"),
            anderId: getQueryVariable("id")
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
        })
        .catch(function (error) {
            console.log(error);
        });

})

window.onload = function () {

        let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id='+getQueryVariable('id');


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

                invullenProfiel(data);

            })
            .catch(function (error) {
                console.log(error);
            });

    function invullenProfiel(data){
        document.getElementById('p_naam').innerText = data.voornaam + " " +data.familienaam;
        document.getElementById('p_nickname').innerText = data.nickname;
        document.getElementById('p_nickname').innerText = data.nickname;
        document.getElementById('p_foto').setAttribute('src', data.foto);
        document.getElementById('p_geboortedatum').innerText = data.geboortedatum;
        document.getElementById('p_email').innerText = data.email;
        document.getElementById('p_beroep').innerText = data.beroep;
        document.getElementById('p_geslacht').innerText = data.sexe;
        document.getElementById('p_haarkleur').innerText = data.haarkleur;
        document.getElementById('p_oogkleur').innerText = data.oogkleur;
        document.getElementById('p_grootte').innerText = data.grootte;
        document.getElementById('p_gewicht').innerText = data.gewicht;
        document.getElementById('p_sterrenbeeld').innerText = sterrenbeeld(data.geboortedatum);
    }

    function sterrenbeeld(geboortedatum){
                return "Boogschutter"
    }




    };

    document.getElementById('uitloggen').addEventListener('click', function(e){
        e.preventDefault();
        sessionStorage.clear();
        location.replace('login.html')
    })


