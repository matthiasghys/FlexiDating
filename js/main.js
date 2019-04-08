function validateLogin(email, wachtwoord){
    const respons = scrumlib.login(email,wachtwoord);
    if (!respons){
        alert("Foutieve logingegevens, probeer opnieuw");
    }else{
    sessionStorage.setItem("id", respons);
    window.location.replace("dashboard.html")};
}


function validateRegister(id,familienaam,voornaam,geboortedatum,email,nickname,foto,beroep,sexe,haarkleur, oogkleur,grootte, gewicht, seksvoorkeur, wachtwoord){
    
    const persoon = {
        "_id" : id,
        "familienaam" : familienaam,
        "voornaam" : voornaam,
        "geboortedatum" : geboortedatum,
        "email" : email,
        "nickname" : nickname,
        "foto" : foto,
        "beroep" : beroep,
        "sexe" : sexe,
        "haarkleur" : haarkleur,
        "oogkleur" : oogkleur,
        "grootte" : grootte,
        "gewicht" : gewicht,
        "seksvoorkeur" : seksvoorkeur,
        "wachtwoord" : wachtwoord
    }
    scrumlib.createProfile(persoon);
    
}
