const url = "Boeken.json";
//keuze voorsorteer opties
let kenmerk = document.getElementById('kenmerk');
kenmerk.addEventListener('change', (e) =>{
    shopBoekenObj.kenmerk = e.target.value;
    shopBoekenObj.sorteren();
});

// JSON importeren
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState===4 && this.status===200){
        shopBoekenObj.data = JSON.parse(this.responseText);
        shopBoekenObj.sorteren();
    }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();

// Een tabelkop in markup uitvoeren uit een array
const maakTabelKop = (arr) => {
    let kop = "<table class='boekSelectie'><tr>";
    arr.forEach((item) => {
        kop += "<th>" + item + "</th>";
    });
    kop += "</tr>";
    return kop;
};
const maakTabelRij = (arr, accent) => {
    let rij = "";
    if (accent == true) {
       rij = "<tr class='boekSelectie__rij--accent'>";
    } else {
       rij = "<tr class='boekSelectie__rij'>";
    }

    arr.forEach((item) => {
        rij += "<td class='boekSelectie__data-cel'>" + item + "</td>";
    });
    rij += "</tr>";
    return rij;
};


// object dat de boeken uitvoert en ook sorteert en data bevat.
// eigenschappen: data, (sorteer)kenmerk
// methods: sorteren(), uitvoeren()
let shopBoekenObj =  {
    data: "",  // komt van xmlhttp.onreadystatechange

    kenmerk: "uitgave",

    //data sorteren
    sorteren: function(){
        this.data.sort( (a,b) => a[this.kenmerk] > b[this.kenmerk] ? 1 : -1);
        this.uitvoeren(this.data);
    },

    // De data in een tabel weergeven
    uitvoeren: function (data) {
        let uitvoer = maakTabelKop(
            ["titel",
                "auteur(s)",
                "cover",
                "uitgave",
                "bladzijden",
                "taal",
                "EAN", ]);
        for (let i=0; i<this.data.length; i++) {
            // geeft rijen afwisselend een accent mee.
            let accent = false;
            i%2 == 1 ? accent = true : accent = false;
            let imgElement =
                "<img src='"+
                data[i].cover +
                "' class='boekSelectie__cover' alt='" +
                data[i].titel +
                "'>";
            uitvoer += maakTabelRij(
                [data[i].titel,
                    data[i].auteur[0],
                    imgElement,
                    data[i].uitgave,
                    data[i].paginas,
                    data[i].taal,
                    data[i].ean],
                     accent);
        }
        uitvoer+= "</table>";
        document.getElementById('uitvoer').innerHTML = uitvoer;
    }

};