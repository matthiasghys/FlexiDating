
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
    if(getQueryVariable('register')){
        document.getElementById('succesMsg').innerHTML = "U bent succesvol geregistreerd, u kan inloggen"
        document.getElementById('succesMsg').style.display = "block"
    }


    document.querySelector('#inloggen').addEventListener('click', function(e){
        e.preventDefault();
        let nickname = document.getElementById('inputNickname').value;
        let wachtwoord = document.getElementById('inputPassword').value;
        console.log(nickname);

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
                if (data.id){
                    location.replace('profiel.html')
                }else{
                    document.getElementById('error').innerText= "foutieve gegevens,probeer opnieuw"
                }

            })
            .catch(function (error) {
                console.log(error);
            });




    });

