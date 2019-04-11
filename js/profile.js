window.onload = function () {

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
                console.log(sessionStorage)
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
        document.getElementById('p_beroep').innerText = data.beroep;
        document.getElementById('p_geslacht').innerText = data.sexe;
        document.getElementById('p_haarkleur').innerText = data.haarkleur;
        document.getElementById('p_oogkleur').innerText = data.oogkleur;
        document.getElementById('p_grootte').innerText = data.grootte;
        document.getElementById('p_gewicht').innerText = data.gewicht;
        document.getElementById('p_sterrenbeeld').innerText = sterrenbeeld(data.geboortedatum);
    }

    function sterrenbeeld(geboortedatum){
        let date = new Date(geboortedatum);
        let day = date.getDay();
        let month = date.getMonth() + 1;

        document.getElementById('p_horoscoop').title = "Onbekend";

        if ((month == 3) && (day >= 21) || (month == 4) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9800;";
            document.getElementById('p_horoscoop').title = "Ram";
        }
        if ((month == 4) && (day >= 21) || (month == 5) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9801;";
            document.getElementById('p_horoscoop').title = "Stier";
        }
        if ((month == 5) && (day >= 21) || (month == 6) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9802;";
            document.getElementById('p_horoscoop').title = "Tweeling";
        }
        if ((month == 6) && (day >= 21) || (month == 7) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9803;";
            document.getElementById('p_horoscoop').title = "Kreeft";
        }
        if ((month == 7) && (day >= 21) || (month == 8) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9804;"; //ok
            document.getElementById('p_horoscoop').title = "Leeuw";
        }
        if ((month == 8) && (day >= 21) || (month == 9) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9805;"; //ok
            document.getElementById('p_horoscoop').title = "Maagd";
        }
        if ((month == 9) && (day >= 21) || (month == 10) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9806;"; //ok
            document.getElementById('p_horoscoop').title = "Weegschaal";
        }
        if ((month == 10) && (day >= 21) || (month == 11) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9807;";
            document.getElementById('p_horoscoop').title = "Schorpioen";
        }
        if ((month == 11) && (day >= 21) || (month == 12) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9808;";
            document.getElementById('p_horoscoop').title = "Boogschutter";
        }
        if ((month == 12) && (day >= 21) || (month == 1) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9809;";
            document.getElementById('p_horoscoop').title = "Steenbok";
        }
        if ((month == 1) && (day >= 21) || (month == 2) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9810;";
            document.getElementById('p_horoscoop').title = "Waterman";
        }
        if ((month == 2) && (day >= 21) || (month = 3) && (day <= 20)) {
            document.getElementById('p_horoscoop').innerHTML = "&#9811;";
            document.getElementById('p_horoscoop').title = "Vis";
        }
        return document.getElementById('p_horoscoop').title;
    }




    };

    document.getElementById('uitloggen').addEventListener('click', function(e){
        e.preventDefault();
        sessionStorage.clear();
        location.replace('login.html')
    })


