window.onload = function () {
    var resultdata = [];
    var indexresultdata = 1;
    var MAX_ROWS = 20;

    var filterbtn = document.getElementById("applyFilter");
    filterbtn.addEventListener("click", ophalendata);
    
    document.getElementById('searchBar').addEventListener('keypress', ophalendata);

    document.getElementById("previous").addEventListener("click", ophalendataprevious);
    document.getElementById("next").addEventListener("click", ophalendatanext);

    ophalendata();

    function ophalendatanext() {
        console.log("ophalendatanext");
        cleanTabel();
        maakTabel();

        console.log(resultdata);

        var i = 1;
        var ifrom = indexresultdata + 1;
        var ito = ifrom + (MAX_ROWS - 1);
        console.log(ifrom);
        console.log(ito);
        resultdata.forEach(element => {
            if ((i >= ifrom) && (i <= ito)) {
                addrow(element);
            }
            i++;
        });

        indexresultdata = ito;
        console.log(indexresultdata);
        console.log(resultdata.length);
        if (indexresultdata >= resultdata.length) {
            console.log("remove ev next")
            document.getElementById("next").removeEventListener("click", ophalendatanext);

        } else {
            document.getElementById("next").addEventListener("click", ophalendatanext);

        }
        document.getElementById("previous").addEventListener("click", ophalendataprevious);
    }

    function ophalendataprevious() {
        console.log("ophalendataprevious");
        cleanTabel();
        maakTabel();

        console.log(resultdata);

        var ifrom = indexresultdata - (MAX_ROWS * 2) + 1;
        var ito = ifrom + (MAX_ROWS - 1);
        var i = 1;
        console.log(ifrom);
        console.log(ito);
        resultdata.forEach(element => {
            if ((i >= ifrom) && (i <= ito)) {
                addrow(element);
            }
            i++;
        });
        indexresultdata = ito;
        if (indexresultdata <= MAX_ROWS) {
            console.log("remove ev previous")
            document.getElementById("previous").removeEventListener("click", ophalendataprevious);

        } else {
            document.getElementById("previous").addEventListener("click", ophalendataprevious);

        }
        document.getElementById("next").addEventListener("click", ophalendatanext);

    }

    function ophalendata() {
        cleanTabel();

        let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/search.php';

        url += "?" + document.getElementById('changeSearch').value + "=" + document.getElementById('searchBar').value;
        url += "&sexe=" + document.getElementById('changeGender').value;
        url += "&geboortedatum="+ document.getElementById('idgeboortedatum').value + '&geboortedatumOperator='+ 
                document.getElementById('idgeboortedatumoperator').value;
        url += "&oogkleur=" + document.getElementById('filterEyeColor').value;
        url += "&haarkleur=" + document.getElementById('filterHairColor').value;
        url += '&grootteOperator=range&rangeMinGrootte='+ document.getElementById('height_min').value +'&rangeMaxGrootte='+ 
                 document.getElementById('height_max').value ;
        url += '&gewichtOperator=range&rangeMinGewicht='+ document.getElementById('weight_min').value +'&rangeMaxGewicht='+ 
                 document.getElementById('weight_max').value ;
        url += '&orderBy='+ document.getElementById('changeSearch').value; 

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
                if (data.message != "Geen profielen gevonden.") {
                    resultdata = data;
                    invullenProfiel(resultdata);
                    if (resultdata.length <= 10) {
                        document.getElementById("next").removeEventListener("click", ophalendatanext);
                        document.getElementById("previous").removeEventListener("click", ophalendataprevious);
                    } else {
                        document.getElementById("next").addEventListener("click", ophalendatanext);
                        document.getElementById("previous").addEventListener("click", ophalendataprevious);
                    }
                } else {
                    var eTable = document.getElementById("containerprofielen");
                    var eP = document.createElement("p");
                    eP.innerHTML = data.message;
                    eTable.appendChild(eP);
                }

            })
            .catch(function (error) {
                console.log(error);
            });


        function invullenProfiel(data) {
            var eContainerprofielen = document.getElementById("containerprofielen");
            var ePar = eContainerprofielen.getElementsByTagName("p")[0];
            maakTabel();
            var i = 0;
            data.forEach(element => {
                if (i < MAX_ROWS) {
                    addrow(element);
                    i++;
                }
                indexresultdata = MAX_ROWS;
            });
            document.getElementById("aantalresult").innerHTML = data.length;
        }


    }

    function addrow(element) {
        var eTabel = document.getElementById("profieltabel");

        var eRow = eTabel.insertRow(); // voeg een nieuwe rij toe aan de tabel
        var cell0 = eRow.insertCell(0); // voeg een nieuwe cell toe aan de rij
        var cell1 = eRow.insertCell(1);
        var cell2 = eRow.insertCell(2);
        var cell3 = eRow.insertCell(3);
        var cell4 = eRow.insertCell(4);
        var cell5 = eRow.insertCell(5);

        cell1.innerHTML = element.voornaam;
        cell2.innerHTML = element.familienaam;
        cell3.innerHTML = element.geboortedatum;
        cell4.innerHTML = element.beroep;
        cell5.innerHTML = element.nickname;

    }

    function maakTabel() {
        // create table
        var eTable = document.createElement("table");

        eTable.setAttribute("id", "profieltabel");
        eTable.setAttribute("class", "item");

        var header = eTable.createTHead();
        var row = header.insertRow();
        var cell = row.insertCell(0);
        cell.innerHTML = "<b>foto</b>";

        var cell1 = row.insertCell(1);
        cell1.innerHTML = "<b>voornaam</b>";

        var cell2 = row.insertCell(2);
        cell2.innerHTML = "<b>familienaam</b>";

        var cell3 = row.insertCell(3);
        cell3.innerHTML = "<b>geboortedatum</b>";

        var cell4 = row.insertCell(4);
        cell4.innerHTML = "<b>beroep</b>";

        var cell5 = row.insertCell(5);
        cell5.innerHTML = "<b>nickname</b>";


        var eWinkelmandje = document.getElementById("containerprofielen");
        eWinkelmandje.appendChild(eTable);
    }

    function cleanTabel() {
        var eTable = document.getElementById("containerprofielen");
        console.log(eTable);
        if (eTable != null) {
            var eChildNodes = eTable.childNodes;
            for (var i = eChildNodes.length - 1; i > 0; i--) {
                eTable.removeChild(eTable.childNodes[i]);
            }
        }
    }



};

document.getElementById('uitloggen').addEventListener('click', function (e) {
    e.preventDefault();
    sessionStorage.clear();
    location.replace('login.html')
})
