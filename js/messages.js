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
            console.log(data)
            data.forEach((convo)=>{
                const partner = convo[0].partnerId;
                console.log(partner);



            })
        })
        .catch((error)=>{
            console.log(error)
        })

}