let conversaties= [];
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
            console.log(conversaties)


            data.forEach((convo)=>{
                const partner = convo[0].partnerId;
                const laatsteBericht = convo[convo.length-1].bericht;
                laatsteBericht.replace("<br>", " ");

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
                        if (laatsteBericht.length > 100 ){
                            const previewBericht = laatsteBericht.slice(0,100) + "..."
                            afzenderLaatsteBericht.innerText = previewBericht;
                        }else{
                            afzenderLaatsteBericht.innerText = laatsteBericht;
                        }
                        cardBody.appendChild(afzenderFoto)
                        cardBody.appendChild(afzenderNaam)
                        cardBody.appendChild(afzenderLaatsteBericht)
                        card.appendChild(cardBody);
                        document.getElementById('berichtenZenders').appendChild(card);
                            card.addEventListener('click',()=>{
                                const myNode = document.getElementById("berichtContent");
                                while (myNode.firstChild) {
                                    myNode.removeChild(myNode.firstChild);
                                }
                                console.log(convo)
                                convo.forEach((bericht)=>{

                                    const berichtje = document.createElement('p')
                                    if (bericht.vanId === sessionStorage.getItem('id')){
                                        berichtje.className="berichtIk"
                                    }else{
                                        berichtje.className =  "berichtJij"
                                    }
                                    console.log(bericht)
                                    berichtje.innerText = bericht.bericht;
                                    document.querySelector("#berichtContent").appendChild(berichtje)
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
