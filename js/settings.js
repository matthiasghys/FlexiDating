var picURL = "";
window.onload = function () {
    var profiel = {};

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
            profiel = data;
            console.log(data.voornaam);
            invullenData(data);


            /**/
            // event op btn Uploaden, roept upload.php op met POST
            document.getElementById('uploadBtn').addEventListener('click', function (e) {

                // font awesome toevoegen:


                document.getElementById("uploadBtn").disabled = true;

                document.getElementById("uploadBtn").innerHTML = '<div class="fa-spin"><i class="fas fa-spinner fa-spin"></i> </div>Busy. . . '

                let naam = document.getElementById('fotoString').value;
                let afbeelding = document.getElementById('base64textarea').value;

                // 
                let url = 'https://scrumserver.tenobe.org/scrum/api/image/upload.php';


                let data = {
                    naam: naam,
                    afbeelding: afbeelding
                }

                var request = new Request(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })

                });

                fetch(request)
                    .then(function (resp) { return resp.json(); })
                    .then(function (data) {

                        var profilepicURL = data.fileURL;
                        console.log(data);
                        document.getElementById("dateId").innerHTML = data.fileName + "\n" + data.fileURL;
                        document.getElementById("displayFoto").src = data.fileURL;

                        console.log("voor update:" + profiel.foto);

                        /* Begin function() + update.php */

                        let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/update.php';

                        profiel.foto = profilepicURL;

                        var request = new Request(url, {
                            method: 'PUT',                  //request methode
                            body: JSON.stringify(profiel),     //body waar de data aan meegegeven wordt
                            headers: new Headers({          //onze API verwacht application/json
                                'Content-Type': 'application/json'
                            })
                        });

                        fetch(request)
                            .then(function (response) { return response.json(); })
                            .then(function (profiel) {
                                console.log(profiel);
                                location.replace('settings.html');
                            })
                            .catch(function (error) { console.log(error); });



                        console.log("na update:" + profiel.foto);
                    })
                    .catch(function (error) { console.log(error); });




            });

            // script image name & base64 picker
            var handleFileSelect = function (evt) {
                var files = evt.target.files;
                var file = files[0];

                if (files && file) {
                    var reader = new FileReader();
                    document.getElementById("uploadBtn").disabled = true;
                    document.getElementById("uploadBtn").innerHTML = "Busy. . ."
                    reader.onload = function (readerEvt) {

                        var binaryString = readerEvt.target.result;


                        document.getElementById("base64textarea").value = "data:image/png;base64," + btoa(binaryString);
                        document.getElementById("uploadBtn").innerHTML = '<i class="fas fa-file-upload"></i> ' + "Upload"
                        document.getElementById("uploadBtn").disabled = false;
                    };


                    reader.readAsBinaryString(file);
                    document.getElementById("fotoString").innerHTML = document.getElementById("filePicker").value.split('\\').pop();

                }
            };

            if (window.File && window.FileReader && window.FileList && window.Blob) {
                document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);


            }

            else {
                alert('The File APIs are not fully supported in this browser.');
            }

            /**/

            const buttonsChange = document.querySelectorAll('button.change')
            buttonsChange.forEach((button) => {
                button.addEventListener('click', () => {
                    document.getElementById("change" + button.id).innerHTML =
                        "<input type='text' id = 'nieuw" + button.id + "' value ='" + document.getElementById('show' + button.id).textContent + "'>"
                    document.getElementById('buttonColumn' + button.id).innerHTML = "<button id='save%" + button.id + "' class='btn btn-sm btn-success save'><i class='fas fa-check'></i></button>" +
                        "<button id='cancel" + button.id + "' class='btn btn-sm btn-danger cancel'><i class='fas fa-times'></i></button>"
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
                    buttonCancel.forEach((button) => {
                        button.addEventListener('click', () => {
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
        let passwordHidden = "";
        for (let x = 0; x < data.wachtwoord.length; x++) {
            passwordHidden += '*';
        }

        document.getElementById('showvoornaam').innerText = data.voornaam;
        document.getElementById('showfamilienaam').innerText = data.familienaam;
        document.getElementById('shownickname').innerText = data.nickname;
        document.getElementById('displayFoto').setAttribute('src', data.foto);
        document.getElementById('showgeboortedatum').innerText = data.geboortedatum;
        document.getElementById('showemail').innerText = data.email;
        document.getElementById('showberoep').innerText = data.beroep;
        document.getElementById('showsexe').innerText = data.sexe;
        document.getElementById('showhaarkleur').innerText = data.haarkleur;
        document.getElementById('showoogkleur').innerText = data.oogkleur;
        document.getElementById('showgrootte').innerText = data.grootte;
        document.getElementById('showgewicht').innerText = data.gewicht;
        document.getElementById('showwachtwoord').innerText = passwordHidden;
        document.getElementById('showcoins').innerText = data.lovecoins;
    }

    document.querySelector('#deleteAccount').addEventListener('click', () => {
        if (window.confirm("Are you sure you want to delete your account? all data will be lost, including your precious favourites.")) {
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
    let purchaseDiv = document.getElementById("purchase")
    purchaseDiv.style.display = "none";
    
    document.getElementById("coins").addEventListener("click", function () {
        
        if (purchaseDiv.style.display === "none") {
            purchaseDiv.style.display = "block"
        }
        else
        {
            purchaseDiv.style.display = "none"
        }
    });
}



document.getElementById("love1").addEventListener("click", function () {

    if (confirm("Would you like to purchase 1 lovecoin for €0.79?")) {
        updateLovecoins(1)
    }
});
document.getElementById("love10").addEventListener("click", function () {
    if (confirm("Would you like to purchase 10 lovecoins for €5.99?")) {
        updateLovecoins(10)
    }
});
document.getElementById("love20").addEventListener("click", function () {
    if (confirm("Would you like to purchase 20 lovecoins for €9.99?")) {
        updateLovecoins(20)
    }
});
document.getElementById("love50").addEventListener("click", function () {
    if (confirm("Would you like to purchase 50 lovecoins for €19.99?")) {
        updateLovecoins(50)
    }
});
document.getElementById("love100").addEventListener("click", function () {
    if (confirm("Would you like to purchase 100 lovecoins for €34.99?")) {
        updateLovecoins(100)
    }
});



function updateLovecoins(lovecoins){
    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + sessionStorage.getItem('id');

    let request = new Request(url,{
        method: "GET",
        headers:new Headers({
            "Content-Type": "application/json"
        })
    })
    fetch(request)
    .then((resp)=>{
        return resp.json();
    })
    .then((data)=>{
        console.log(data)
        data.lovecoins = parseInt(data.lovecoins) + lovecoins;

        let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/update.php'
        let data2 = data;
        let request = new Request(url,{
            method:"PUT",
            body: JSON.stringify(data2),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        fetch(request)
        .then((resp)=>{
            return resp.json();
        })
        .then((data2)=>{
            console.log(data2)
            location.replace('settings.html');
        })
    })
}


