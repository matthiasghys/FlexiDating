
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
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
            toegevoegd();
        })
        .catch(function (error) {
            console.log(error);
        });





})
function toegevoegd(){
    document.querySelector('#p_favoriet').style.color = "red";
    document.querySelector('#p_favoriet').innerHTML = "toegevoegd";
    document.querySelector('#p_favoriet').disabled=true;
}
window.onload = function () {

    let url5= "https://scrumserver.tenobe.org/scrum/api/bericht/read.php?profielId="+sessionStorage.getItem('id')
    let request5 = new Request(url5,{
        method:"GET",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
    fetch(request5)
        .then((resp)=>{
            return resp.json();
        })
        .then((data)=>{
            data.forEach((convo)=>{
              if(convo[0].vanId === getQueryVariable('id') || convo[0].naarId === getQueryVariable('id')){
                  const btn= document.getElementById('messageClick')
                  btn.addEventListener('click', (e)=>{
                      e.preventDefault();
                      location.replace("berichten.html?id="+getQueryVariable('id'))
                  })
              }
            })
        })


    let url3 ="https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id="+sessionStorage.getItem('id')

    let request3= new Request(url3,{
        method: "GET",
        headers: new Headers({
            "Content-Type": "JSON"
        })
    })
    fetch(request3)
        .then((resp)=>{
            return resp.json();
        })
        .then((data)=>{
            console.log(data.lovecoins)

            if (data.lovecoins < 0) {
                buttonChange();
            }else{
                const button = document.getElementById('sendMessage')
                button.className = "btn btn-primary"
                button.innerText = "Use lovecoin"
                document.getElementById('modalDescr').innerText = "Do you want to send a message ? We'll deduct one Lovecoin from your account. You have " + data.lovecoins + " lovecoins left."


            }

        })




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
        document.getElementById('p_beroep').innerText = data.beroep;
        document.getElementById('p_geslacht').innerText = data.sexe;
        document.getElementById('p_haarkleur').innerText = data.haarkleur;
        document.getElementById('p_oogkleur').innerText = data.oogkleur;
        document.getElementById('p_grootte').innerText = data.grootte;
        document.getElementById('p_gewicht').innerText = data.gewicht;
        document.getElementById('p_sterrenbeeld').innerText = sterrenbeeld(data.geboortedatum);

        function sterrenbeeld(geboortedatum){
            let date = new Date(geboortedatum);
            let day = date.getDate();
            let month = date.getMonth() + 1;
    

            document.getElementById('p_horoscoop').title = "Onbekend";
    
            if ((month == 3) && (day >= 21) || (month == 4) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9800;";
                document.getElementById('p_horoscoop').title = "Ram";
            }
            else if ((month == 4) && (day >= 21) || (month == 5) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9801;";
                document.getElementById('p_horoscoop').title = "Stier";
            }
            else if ((month == 5) && (day >= 21) || (month == 6) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9802;";
                document.getElementById('p_horoscoop').title = "Tweeling";
            }
            else if ((month == 6) && (day >= 21) || (month == 7) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9803;";
                document.getElementById('p_horoscoop').title = "Kreeft";
            }
            else if ((month == 7) && (day >= 21) || (month == 8) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9804;"; //ok
                document.getElementById('p_horoscoop').title = "Leeuw";
            }
            else if ((month == 8) && (day >= 21) || (month == 9) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9805;"; //ok
                document.getElementById('p_horoscoop').title = "Maagd";
            }
            else if ((month == 9) && (day >= 21) || (month == 10) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9806;"; //ok
                document.getElementById('p_horoscoop').title = "Weegschaal";
            }
            else if ((month == 10) && (day >= 21) || (month == 11) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9807;";
                document.getElementById('p_horoscoop').title = "Schorpioen";
            }
            else if ((month == 11) && (day >= 21) || (month == 12) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9808;";
                document.getElementById('p_horoscoop').title = "Boogschutter";
            }
            else if ((month == 12) && (day >= 21) || (month == 1) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9809;";
                document.getElementById('p_horoscoop').title = "Steenbok";
            }
            else if ((month == 1) && (day >= 21) || (month == 2) && (day <= 18)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9810;";
                document.getElementById('p_horoscoop').title = "Waterman";
            }
            else if ((month == 2) && (day >= 19) || (month = 3) && (day <= 20)) {
                document.getElementById('p_horoscoop').innerHTML = "&#9811;";
                document.getElementById('p_horoscoop').title = "Vis";
            }
            return document.getElementById('p_horoscoop').title;
        }
    }


    let url2 = "https://scrumserver.tenobe.org/scrum/api/favoriet/read.php?profielId=" + sessionStorage.getItem("id") ;

    const request2 = new Request(url2, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request2)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            data.forEach((data)=>{

                if(data.anderId === getQueryVariable('id') ){
                    if(data.statusCode === "1" || data.statusCode==="2"){
                        toegevoegd();
                    }

                }
            })

        })
        .catch(function (error) {
            console.log(error);
        });



        if (getQueryVariable('id') === sessionStorage.getItem('id')){
            document.getElementById('p_favoriet').hidden=true;
        }


};

    document.getElementById('uitloggen').addEventListener('click', function(e){
        e.preventDefault();
        sessionStorage.clear();
        location.replace('login.html')
    });

    function buttonChange(){
        const button =document.querySelector('#sendMessage')
        button.className = "btn btn-warning"
        button.innerHTML = "Purchase lovecoins"
        console.log(button)
        document.getElementById('modalDescr').innerText = "You have no lovecoins left to chat. Buy more"}





        document.querySelector('#sendMessage').addEventListener('click',()=>{
            let url2= "https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id="+sessionStorage.getItem('id')

            let request= new Request(url2,{
                method: "GET",
                headers: new Headers({
                    "Content-Type": "JSON"
                })
            })
            fetch(request)
                .then((resp)=>{
                    return resp.json();
                })
                .then((data)=>{
                    const button = document.getElementById('sendMessage')
                    if(button.innerText === "Use lovecoin"){
                        data.lovecoins= data.lovecoins-1;
                        let url ="https://scrumserver.tenobe.org/scrum/api/profiel/update.php"

                        let data2 = JSON.stringify(data);
                        let request= new Request(url,{
                            method: "PUT",
                            body: data2,
                            headers: new Headers({
                                "Content-Type": "JSON"
                            })
                        })
                        fetch(request)
                            .then((resp)=>{
                                return resp.json();
                            })
                            .then((data)=>{


                            })
                        location.replace("berichten.html?id="+getQueryVariable('id') + "&new=" + true)
                    }
                    else{
                        location.replace('settings.html#showcoins')
                    }

                })
        })













