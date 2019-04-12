document.querySelector('#form').addEventListener('submit', function (e) {
    e.preventDefault();

    var url= "https://scrumserver.tenobe.org/scrum/api/profiel/read.php"
    var request2 = new Request(url,{
        headers: new Headers({
            "Content-type": "application/json"
        })

    })
    fetch(request2)
        .then((resp)=>{
            return resp.json()
        })
        .then((data)=>{

            if(emailCheck(data)|| usernameCheck(data)){
                toevoegen(data);
            }else{

            }

        })

    function usernameCheck(data){
        data.forEach((acc)=>{
            if(document.getElementById('inputUsername').value === acc.nickname){
                document.getElementById('errorMsg').innerText="Username bestaat al"
                document.getElementById('errorMsg').style.display="block"

                return false;
            }else{return true}
        })
    }
    function emailCheck(data){
        data.forEach((acc)=>{
            if(document.getElementById('inputEmail').value === acc.email){
                document.getElementById('errorMsg2').innerText="e-mailadres bestaat al"
                document.getElementById('errorMsg2').style.display="block"
                return false;
            }else{return true}
        })
    }

function toevoegen(data){
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

    let data2 = {
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
        body: JSON.stringify(data2),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data2) {
            console.log(data);
            location.replace('login.html?register=true')
        })
        .catch(function (error) {
            console.log(error);
        });
}



});