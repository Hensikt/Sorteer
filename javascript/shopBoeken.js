 const url = "Boeken.json";
//keuze voorsorteer opties
let kenmerk = document.getElementById('kenmerk');
kenmerk.addEventListener('change', (e) =>{
    sorteerBoekObj.kenmerk = e.target.value;
    sorteerBoekObj.sorteren();
});

// JSON importeren
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState===4 && this.status===200){
        sorteerBoekObj.data = JSON.parse(this.responseText);
        sorteerBoekObj.sorteren();
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
let sorteerBoekObj =  {
    data: "",  // komt van xmlhttp.onreadystatechange

    kenmerk: "uitgave",

    //data sorteren
    sorteren: function(){
        this.data.sort( (a,b) => a[this.kenmerk] > b[this.kenmerk] ? 1 : -1);
        this.uitvoeren(this.data);
    },

    // De data in een tabel weergeven
    uitvoeren: function (data) {
        data.forEach( boek =>{
            let sectie = document.createElement('section');
            sectie.className = 'boek';

            // cover maken (met afbeelding)
            let afbeelding = document.createElement('img');
            afbeelding.className = 'boekSelectie__cover';
            afbeelding.setAttribute('src', boek.cover);
            afbeelding.setAttribute('alt', boek.titel);

            //titel maken
            let titel = document.createElement('h3');
            titel.className = 'boek__titel';
            titel.textContent = boek.titel;

            // Hoofd element
            sectie.appendChild(afbeelding);
            sectie.appendChild(titel);
            document.getElementById('uitvoer')
        })


    }
};