let buttons = {};
window.onload = function(){



    let url = "https://scrumserver.tenobe.org/scrum/api/favoriet/read.php?profielId=" + sessionStorage.getItem("id") ;

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
            createCards(data);
            // invoegen opmaak
            var checkCard = document.getElementsByTagName("img").length;
            console.log("aantalcard: " + checkCard);

            if (checkCard != 0)
            {
                document.getElementById("emptyString").style.display = "none";
            }

        })
        .catch(function (error) {
            console.log(error);
        });


    function createCards(data){
        data.forEach((data)=>{

            if (data.statusCode === "1" || data.statusCode ==="2"){
                
                const card = document.createElement('div');
                
                const img = document.createElement('img');
                img.setAttribute("id", "jsImg");
                const cardbody = document.createElement('div');
                const link = document.createElement('a');
                const naam = document.createElement('p');
                const wederzijds = document.createElement('p');
                const deleteButton = document.createElement('button')
                deleteButton.className="btn btn-sm btn-danger deleteFav";
                deleteButton.id=data.id;
                deleteButton.innerHTML= "<i class='fas fa-trash-alt'></i> Delete"

                if (data.status == "wederzijds")
                {
                    wederzijds.innerHTML = '<i class="fas fa-heart"></i> Wederzijds<br><br>';
                    wederzijds.setAttribute("id", "wederYES");
                }
                else
                {
                    wederzijds.innerHTML = '<i class="fas fa-heart-broken"></i> Niet wederzijds';
                    wederzijds.setAttribute("id", "wederNOT");
                }
            

                let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + data.anderId;
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
                        img.setAttribute('src', data.foto)
                        link.setAttribute('href', 'anderProfiel.html?id=' + data.id)
                        naam.innerHTML = data.voornaam + '<br>' + data.familienaam;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                img.className = 'card-img-top';
                cardbody.className = 'card-body';
                naam.className = 'card-title';
                card.className = 'card col-lg-3';

                card.appendChild(img);
                card.appendChild(cardbody);

                cardbody.appendChild(link);
                cardbody.appendChild(wederzijds);
                link.appendChild(naam)
                cardbody.appendChild(deleteButton);

                document.querySelector('#favourites').appendChild(card);
            }

        })
        buttons = document.querySelectorAll("button");
        console.log(buttons);
        buttons.forEach((button)=>{
            button.addEventListener('click', ()=>{
                
                let url = "https://scrumserver.tenobe.org/scrum/api/favoriet/delete.php";
                let data = {
                    "id": button.id
                }
                let request = new Request(url, {
                    method: "DELETE",
                    body:JSON.stringify(data),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })

                })
                fetch(request)
                    .then((resp)=>{
                        return resp.json()
                    })
                    .then((data)=>{

                        location.reload();
                    })
            })

        })

    }
}


