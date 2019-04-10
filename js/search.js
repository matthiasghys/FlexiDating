window.onload = function () {

    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read.php';


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
            invullenProfiel(data);

        })
        .catch(function (error) {
            console.log(error);
        });


        function invullenProfiel(data){
            var eContainerprofielen = document.getElementById("containerprofielen");
            var ePar = eContainerprofielen.getElementsByTagName("p")[0];
            maakTabel();
            data.forEach(element => {
                var eTabel = document.getElementById("profieltabel");

                var eRow = eTabel.insertRow(0); // voeg een nieuwe rij toe aan de tabel
                var cell0 = eRow.insertCell(0); // voeg een nieuwe cell toe aan de rij
                var cell1 = eRow.insertCell(1);
                var cell2 = eRow.insertCell(2);
                var cell3 = eRow.insertCell(3);
                var cell4 = eRow.insertCell(4);
                var cell5 = eRow.insertCell(5);
            
                cell1.innerHTML = element.voornaam;
                cell2.innerHTML = element.familienaam;
/*                document.getElementById('p_naam').innerText = data.voornaam + " " +data.familienaam;
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
                document.getElementById('p_sterrenbeeld').innerText = sterrenbeeld(data.geboortedatum);*/
                    
            });
        }
    
        function maakTabel() {
            // create table
            var eTable = document.createElement("table");
            eTable.setAttribute("id", "profieltabel");
            eTable.setAttribute("class", "item");
        
            var header = eTable.createTHead();
            var row = header.insertRow(0);
            var cell = row.insertCell(0);
            cell.innerHTML = "<b>foto</b>";
        
            var cell1 = row.insertCell(1);
            cell1.innerHTML = "<b>familienaam</b>";
        
            var cell2 = row.insertCell(2);
            cell2.innerHTML = "<b>voornaam</b>";
        
            var cell3 = row.insertCell(3);
            cell3.innerHTML = "<b>geboortedatum</b>";
        
            var cell4 = row.insertCell(4);
            cell4.innerHTML = "<b>email</b>";
        
            var cell5 = row.insertCell(5);
            cell5.innerHTML = "<b>nickname</b>";
        
        
            var eWinkelmandje = document.getElementById("containerprofielen");
            eWinkelmandje.appendChild(eTable);
        }  

};

document.getElementById('uitloggen').addEventListener('click', function(e){
    e.preventDefault();
    sessionStorage.clear();
    location.replace('login.html')
})
