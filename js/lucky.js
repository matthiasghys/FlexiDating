var url= "https://scrumserver.tenobe.org/scrum/api/profiel/read.php"
var request = new Request(url,{
    headers: new Headers({
        "Content-type": "application/json"
    })

})
fetch(request)
    .then((resp)=>{
        return resp.json()
    })
    .then((data)=>{
        var id = Math.floor((Math.random() * data.length) + 1);
        location.replace("anderprofiel.html?id=" + id)
    })
