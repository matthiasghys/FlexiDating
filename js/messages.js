let conversaties = [];
let welkeOntvanger = 0;
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    console.log(query)
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return (false);
}
window.onload = () => {
    console.log(getQueryVariable('id'))

    if(getQueryVariable('new')&&getQueryVariable('id')){

        let url = "https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + getQueryVariable('id');
        let request = new Request(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "JSON"
            })
        })
        fetch(request)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {

        const card2 = document.createElement('div');
        card2.className = "card";
        card2.id = "convo" + data.id
        if (data.id === getQueryVariable('id')) {
            card2.className = "card highlighted"

        }
        const cardBody = document.createElement('div');
        cardBody.className = "card-body";
        const afzenderFoto = document.createElement('img')
        afzenderFoto.setAttribute('src', data.foto)
        const afzenderNaam = document.createElement('h6')
        afzenderNaam.innerText = data.voornaam + " " + data.familienaam;

        cardBody.appendChild(afzenderFoto)
        cardBody.appendChild(afzenderNaam)
        card2.appendChild(cardBody);

        document.getElementById('berichtenZenders').appendChild(card2);

    })}
    else if (getQueryVariable('id')) {
        let url = "https://scrumserver.tenobe.org/scrum/api/bericht/read.php?profielId=" + sessionStorage.getItem('id');

        let request = new Request(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        fetch(request)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                data.forEach((convo) => {
                    if (convo[0].vanId === getQueryVariable('id') || convo[0].naarId === getQueryVariable('id')) {
                        convo.forEach((bericht) => {

                            const berichtje = document.createElement('div')
                            if (bericht.vanId === sessionStorage.getItem('id')) {
                                berichtje.className = "mine messages message "
                                berichtje.innerText = bericht.bericht;
                                document.querySelector("#berichtContent").appendChild(berichtje)
                            } else {
                                berichtje.className = " yours messages message "

                                berichtje.innerText = bericht.bericht;
                                document.querySelector("#berichtContent").appendChild(berichtje)
                            }
                        })

                    }
                })
            })
        let url2 = "https://scrumserver.tenobe.org/scrum/api/bericht/read.php?profielId=" + sessionStorage.getItem('id');

        let request2 = new Request(url2, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        fetch(request2)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {

                conversaties = data;


                data.forEach((convo) => {
                    const partner = convo[0].partnerId;
                    const laatsteBericht = convo[convo.length - 1];
                    laatsteBericht.bericht.replace("<br>", " ");

                    let url = "https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + partner;
                    let request = new Request(url, {
                        method: "GET",
                        headers: new Headers({
                            "Content-Type": "JSON"
                        })
                    })
                    fetch(request)
                        .then((resp) => {
                            return resp.json()
                        })
                        .then((data) => {
                            const card = document.createElement('div');
                            card.className = "card";
                            card.id = "convo" + data.id
                            if (data.id === getQueryVariable('id')) {
                                card.className = "card highlighted"

                            }
                            const cardBody = document.createElement('div');
                            cardBody.className = "card-body";
                            const afzenderFoto = document.createElement('img')
                            afzenderFoto.setAttribute('src', data.foto)
                            const afzenderNaam = document.createElement('h6')
                            afzenderNaam.innerText = data.voornaam + " " + data.familienaam;
                            const afzenderLaatsteBericht = document.createElement('p')
                            afzenderLaatsteBericht.className = "messageContent";
                            let jij = ""
                            if (laatsteBericht.vanId === sessionStorage.getItem('id')) {
                                jij = "You: "
                            } else {
                                jij = "";
                            }
                            if (laatsteBericht.length > 100) {
                                afzenderLaatsteBericht.innerText = jij + laatsteBericht.bericht.slice(0, 100) + "...";
                            } else {
                                afzenderLaatsteBericht.innerText = jij + laatsteBericht.bericht;
                            }
                            cardBody.appendChild(afzenderFoto)
                            cardBody.appendChild(afzenderNaam)
                            cardBody.appendChild(afzenderLaatsteBericht)
                            card.appendChild(cardBody);

                            document.getElementById('berichtenZenders').appendChild(card);
                            card.addEventListener('click', () => {

                                welkeOntvanger = card.id.slice(5, card.length);
                                location.replace("berichten.html?id=" + welkeOntvanger)


                            })


                        })


                })


            })
    }




    else {
        let url = "https://scrumserver.tenobe.org/scrum/api/bericht/read.php?profielId=" + sessionStorage.getItem('id');

        let request = new Request(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        fetch(request)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {

                conversaties = data;


                data.forEach((convo) => {
                    const partner = convo[0].partnerId;
                    const laatsteBericht = convo[convo.length - 1];
                    laatsteBericht.bericht.replace("<br>", " ");

                    let url = "https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + partner;
                    let request = new Request(url, {
                        method: "GET",
                        headers: new Headers({
                            "Content-Type": "JSON"
                        })
                    })
                    fetch(request)
                        .then((resp) => {
                            return resp.json()
                        })
                        .then((data) => {
                            const card = document.createElement('div');
                            card.className = "card";
                            card.id = "convo" + data.id
                            const cardBody = document.createElement('div');
                            cardBody.className = "card-body";
                            const afzenderFoto = document.createElement('img')
                            afzenderFoto.setAttribute('src', data.foto)
                            const afzenderNaam = document.createElement('h6')
                            afzenderNaam.innerText = data.voornaam + " " + data.familienaam;
                            const afzenderLaatsteBericht = document.createElement('p')
                            afzenderLaatsteBericht.className = "messageContent";
                            let jij = ""
                            if (laatsteBericht.vanId === sessionStorage.getItem('id')) {
                                jij = "jij: "
                            } else {
                                jij = "";
                            }
                            if (laatsteBericht.length > 100) {
                                afzenderLaatsteBericht.innerText = jij + laatsteBericht.bericht.slice(0, 100) + "...";
                            } else {
                                afzenderLaatsteBericht.innerText = jij + laatsteBericht.bericht;
                            }
                            cardBody.appendChild(afzenderFoto)
                            cardBody.appendChild(afzenderNaam)
                            cardBody.appendChild(afzenderLaatsteBericht)
                            card.appendChild(cardBody);
                            document.getElementById('berichtenZenders').appendChild(card);
                            document.querySelector('.chat').style.display = "none"
                            document.querySelector('.mb-3').style.display = "none";
                            card.addEventListener('click', () => {

                                welkeOntvanger = card.id.slice(5, card.length);
                                location.replace("berichten.html?id=" + welkeOntvanger)


                            })
                                .catch((error) => {
                                    console.log(error)
                                })


                        })


                })
                    .catch((error) => {
                        console.log(error)
                    })


            })
    }
    let element = document.getElementById("berichtContent");
    element.scrollTop = element.scrollHeight;
}


const berichtSturen = document.getElementById('sendBericht')
berichtSturen.addEventListener('click', () => {
    const bericht = document.querySelector('#inputBericht').value
    let url = "https://scrumserver.tenobe.org/scrum/api/bericht/post.php"
    let data = {
        "vanId": sessionStorage.getItem('id'),
        "naarId": getQueryVariable('id'),
        "bericht": bericht
    }

    let request = new Request(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "text"
        })
    })

    fetch(request)
        .then((resp) => {
            return resp;
        })
        .then((data) => {
            if (getQueryVariable('new')){
               location.replace('berichten.html?id='+ getQueryVariable('id'))
            }else {
                location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        })
})

