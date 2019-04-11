let conversaties= [];
let welkeOntvanger=0;
window.onload = ()=>{
    let url = "https://scrumserver.tenobe.org/scrum/api/bericht/read.php?profielId="+sessionStorage.getItem('id');

    let request = new Request (url, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })

    fetch(request)
        .then((resp)=>{
            return resp.json()
        })
        .then((data)=>{

            conversaties = data;


            data.forEach((convo)=>{
                const partner = convo[0].partnerId;
                const laatsteBericht = convo[convo.length-1];
                laatsteBericht.bericht.replace("<br>", " ");

                let url = "https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id="+partner;
                let request = new Request(url,{
                    method: "GET",
                    headers: new Headers({
                        "Content-Type": "JSON"
                    })
                })
                fetch(request)
                    .then((resp)=>{
                       return resp.json()
                    })
                    .then((data)=>{
                        const card = document.createElement('div');
                        card.className ="card";
                        card.id = "convo" + data.id
                        const cardBody = document.createElement('div');
                            cardBody.className ="card-body";
                        const afzenderFoto = document.createElement('img')
                            afzenderFoto.setAttribute('src', data.foto)
                        const afzenderNaam = document.createElement('h6')
                            afzenderNaam.innerText= data.voornaam + " " + data.familienaam;
                        const afzenderLaatsteBericht = document.createElement('p')
                        afzenderLaatsteBericht.className= "messageContent";
                        let jij =""
                        if(laatsteBericht.vanId === sessionStorage.getItem('id')){
                            jij = "jij: "
                        }else{
                            jij = "";
                        }
                        if (laatsteBericht.length > 100 ){
                            afzenderLaatsteBericht.innerText = jij + laatsteBericht.bericht.slice(0, 100) + "...";
                        }else{
                            afzenderLaatsteBericht.innerText = jij + laatsteBericht.bericht;
                        }
                        cardBody.appendChild(afzenderFoto)
                        cardBody.appendChild(afzenderNaam)
                        cardBody.appendChild(afzenderLaatsteBericht)
                        card.appendChild(cardBody);
                        document.getElementById('berichtenZenders').appendChild(card);
                            card.addEventListener('click',()=>{
                                welkeOntvanger=card.id.slice(5,6);
                                const myNode = document.getElementById("berichtContent");
                                while (myNode.firstChild) {
                                    myNode.removeChild(myNode.firstChild);
                                }
                                convo.forEach((bericht)=>{

                                    const berichtje = document.createElement('div')
                                    if (bericht.vanId === sessionStorage.getItem('id')){
                                        berichtje.className="mine messages message "
                                        berichtje.innerText = bericht.bericht;
                                        document.querySelector("#berichtContent").appendChild(berichtje)
                                    }else{
                                        berichtje.className=" yours messages message "

                                        berichtje.innerText = bericht.bericht;
                                        document.querySelector("#berichtContent").appendChild(berichtje)
                                    }
                                })
                            })



                    })
                    .catch((error)=>{
                        console.log(error)
                    })


                })



        })
        .catch((error)=>{
            console.log(error)
        })





}

const berichtSturen = document.getElementById('sendBericht')
berichtSturen.addEventListener('click', ()=>{
    const bericht = document.querySelector('#inputBericht').value
    let url = "https://scrumserver.tenobe.org/scrum/api/bericht/post.php"
    let data = {
        "vanId": sessionStorage.getItem('id'),
        "naarId": welkeOntvanger,
        "bericht":bericht
    }

    let request = new Request(url, {
        method:"POST",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "text"
        })
    })

    fetch(request)
        .then((resp)=>{
            return resp;
        })
        .then((data)=>{
            location.reload();
        })
        .catch((error)=>{
            console.log(error);
        })
})
