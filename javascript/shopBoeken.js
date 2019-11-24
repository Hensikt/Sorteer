 const url = "Boeken.json";

// JSON importeren,
 let xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
     if (this.readyState === 4 && this.status === 200) {
         console.log("readyState:" + this.readyState);
         console.log("status:" + this.status);
         shopBoekenObj.data = JSON.parse(this.responseText);
         shopBoekenObj.voegJSdatumIn();

         // Data Zorgt ervoor dat titel niet zichtbaar in kapitalen staat,
         // daarop sorteer de functie.
         shopBoekenObj.data.forEach(boek => {
             boek.titelUpper = boek.titel.toUpperCase();
             // Ook de (achter)naam van de auteur wordt gecorrigeerd.
             boek.sortAuteur = boek.auteur[0];

         });
         shopBoekenObj.sorteren();
     }

 };
 xmlhttp.open('GET', url, true);
 xmlhttp.send();

// Een tabelkop in markup uitvoeren uit een array,
const maakTabelKop = (arr) => {
    let kop = "<table class='boekSelectie'><tr>";
    arr.forEach((item) => {
        kop += "<th>" + item + "</th>";
    });
    kop += "</tr>";
    return kop;
};



 //funcite die vaan een maand-string een nummer maakt,
 //waarbij januari eeen 0 geeft,
 //en december een 11.
 const geeftMaandNummer = (maand) => {
     let nummer;
     switch (maand) {
         case "januari":   nummer = 0; break;
         case "februari":  nummer = 1; break;
         case "maart":     nummer = 2; break;
         case "april":     nummer = 3; break;
         case "mei":       nummer = 4; break;
         case "juni":      nummer = 5; break;
         case "juli":      nummer = 6; break;
         case "augustus":  nummer = 7; break;
         case "september": nummer = 8; break;
         case "oktober":   nummer = 9; break;
         case "november":  nummer = 10;break;
         case "december":  nummer = 11;break;
         default:          nummer = 0

     }
     return nummer;
 };

 //functie die een string van maand jaar omzet in een dat-object,
 const maakJSdatum = (maandJaar) => {
     let mjArray = maandJaar.split(" ");
     let datum = new Date(mjArray[1], geeftMaandNummer(mjArray[0]));
     return datum;
 };

 //functie  maakt van een array een opsomming met ', ' ' en ' ' en '
 const maakOpsomming = (array) => {
     let string = "";
     for(let i=0; i<array.length; i++) {
         switch (i) {
             case array.length-1: string += array[i]; break;
             case array.length-2: string += array[i] + " en "; break;
             default: string += array[i] + ", ";
         }
     }
     return string;
 };

 // Functie die de tekst goed plaatst.
 const keerTekstOm = (string) => {
     if (string.indexOf(',') !== -1 ){
         let array = string.split(',');
         string = array[1] + ' ' + array[0];
     }
     return string;
 };

// object dat de boeken uitvoert en ook sorteert en data bevat.
// eigenschappen: data, (sorteer)kenmerk.
// methods: sorteren(), uitvoeren()
let shopBoekenObj =  {
    data: "",  // komt van xmlhttp.onreadystatechange,

    kenmerk: "titleUpper",

    oplopend: 1,

    voegJSdatumIn: function() {
        this.data.forEach((item) => {
            item.jsDatum = maakJSdatum(item.uitgave);
        })

    },

    //data sorteren,
    sorteren: function(){
        this.data.sort((a, b) => a[this.kenmerk] > b[this.kenmerk] ? 1 * this.oplopend : -1 * this.oplopend);
        this.uitvoeren(this.data);
    },

    // De data in een tabel weergeven,
    uitvoeren: function (data) {
        // Eerst uitvoer leegmaken,
        document.getElementById('uitvoer').innerHTML = "";

        data.forEach( boek =>{
            let sectie = document.createElement('section');
            sectie.className = 'boekSelectie';

            // Main element behalve prijs en afbeelding,
            let main = document.createElement('main');
            main.className = 'boekSelectie__main';

            // cover maken, (met afbeelding),
            let afbeelding = document.createElement('img');
            afbeelding.className = 'boekSelectie__cover';
            afbeelding.setAttribute('src', boek.cover);
            afbeelding.setAttribute('alt', keerTekstOm(boek.titel));

            // titel maken,
            let titel = document.createElement('h3');
            titel.className = 'boekSelectie__titel';
            titel.textContent = keerTekstOm(boek.titel);

            // auterus maken,
            let auteurs = document.createElement('p');
            auteurs.className = 'boekSelectie__auteurs';
            // De voor- en achternaam van de auteur omkeren.
            boek.auteur[0] = keerTekstOm(boek.auteur[0]);
            // Auteurs in array: omzetten naar Nederlandse string.
            auteurs.textContent = maakOpsomming(boek.auteur);

            // Overige benodigdheden maken,
            let overig = document.createElement('p');
            overig.className = 'boekselectie__overig';
            overig.textContent = boek.uitgave +
                                 ' | aantal pagina\'s: ' +
                                 boek.paginas +
                                 ' | taal: ' +
                                 boek.taal +
                                 ' | ean: '
                                 + boek.ean;

            // Prijs toevoegen,
            let prijs = document.createElement('div');
            prijs.className = 'boekSelectie__prijs';
            prijs.textContent = boek.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

            // Knop voor de prijzen
            let knop = document.createElement('button');
            knop.className = 'boekSelectie__knop';
            knop.innerHTML = 'voeg toe aan <br> winkelwagen';

            // Hoofd element,
            sectie.appendChild(afbeelding);
            main.appendChild(titel);
            main.appendChild(auteurs);
            main.appendChild(overig);
            sectie.appendChild(main);
            prijs.appendChild(knop);
            sectie.appendChild(prijs);
            document.getElementById('uitvoer').appendChild(sectie);
        });


    }
};
 // keuze voorsorteer  opties,
 document.getElementById('kenmerk').addEventListener('change', (e) => {
     shopBoekenObj.kenmerk = e.target.value;
     shopBoekenObj.sorteren();
 });

 document.getElementsByName('oplopend').forEach((item) => {
     item.addEventListener('click', (e) => {
         shopBoekenObj.oplopend = parseInt(e.target.value);
         shopBoekenObj.sorteren();
     })
 });