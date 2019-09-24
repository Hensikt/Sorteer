const url = "Boeken.json";

// JSON importeren
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState==4 && this.status==200){
        sorteerBoekObj.data = JSON.parse(this.responseText);
        sorteerBoekObj.uitvoeren();
    }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();

// Een tabelkop in markup uitvoeren uit een array
const maakTableKop = (arr) => {
    let kop = "<tabel><tr>";
    arr.forEach((item) => {
        kop += "<th>" + item + "</th>"
    });
    kop += "<tr>";
    return kop;
}


// object dat de boeken uitvoert en ook sorteert en data bevat.
let sorteerBoekObj =  {
    data: "",  // komt van xmlhttp.onreadystatechange

    //data sorteren
    sorteren: function(){
        this.data.sort( (a,b) => a.titel > b.titel ? 1 : -1);
        this.uitvoeren();
    },

    // De data in een tabel weergeven
    uitvoeren: function () {
        let uitvoer = maakTableKop(["titel", "auteur(s)", "cover", "uitgave", ]);
        for (let i=0; i<this.data.length; i++) {
            uitvoer += this.data[i].titel + "<br>";
        }
        document.getElementById('uitvoer').innerHTML = uitvoer;
    }

}