// const testForm = document.getElementById("testForm");
// testForm.addEventListener("click", (e)=>{
//     e.preventDefault();
// })
//
// const button= document.getElementById("inloggen");
//
// button.addEventListener("click", ()=>{
//     window.location.replace("C:/FlexiDating/js/dashboard.html");
// });

function validateLogin(){
    let nickname =  document.getElementById('input10_1').value;
    let wachtwoord =  document.getElementById('input10_2').value;

    let url = 'http://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php"'

    let data = {
        nickname: nickname,
        wachtwoord: wachtwoord
    }

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then( function (resp)  { return resp.json(); })
        .then( function (data)  { console.log(data);  })
        .catch(function (error) { console.log(error); });

//     const options = {
//         method: "POST",
//         body: JSON.stringify(JSON),
//         headers: new Headers({
//             'Content-Type': 'application/json'
//         })
//     }
//     return fetch('https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php', options)
//         .then(res=> res.json())
//         .then(res=>console.log(res))
//         .catch(error=> console.error('Error: ${error}'))
//
 }


function validateRegister(id,familienaam,voornaam,geboortedatum,email,nickname,foto,beroep,sexe,haarkleur, oogkleur,grootte, gewicht, seksvoorkeur, wachtwoord){
    
    const persoon = {
        "_id" : id,
        "familienaam" : familienaam,
        "voornaam" : voornaam,
        "geboortedatum" : geboortedatum,
        "email" : email,
        "nickname" : nickname,
        "foto" : foto,
        "beroep" : beroep,
        "sexe" : sexe,
        "haarkleur" : haarkleur,
        "oogkleur" : oogkleur,
        "grootte" : grootte,
        "gewicht" : gewicht,
        "seksvoorkeur" : seksvoorkeur,
        "wachtwoord" : wachtwoord
    }

}
