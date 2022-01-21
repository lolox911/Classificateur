// Author Loïc Nirlo
// 21/01/2022

let nbChecked = 0;
let matieresSelectionne = new Array();
let tableauPersonnes = new Array();
let tableau = document.getElementById('tableau');

let verif = document.getElementById("verifDonnees");

let allEleves = document.getElementById("allStudent");
let matieresS = document.getElementById("MatiereSelect");

function getMatieres(){

    for(let i=0; i<Object.keys(Object.values(votes)[0]).length; i++){
        // Recupère toutes les checkbox
        let checkboxes = document.getElementById(Object.keys(Object.values(votes)[0])[i]);
        
        // si la checkbox n'est pas null et qu'elle est bien cochée
        if(checkboxes != null && checkboxes.checked) {
            matieresSelectionne.push(Object.keys(Object.values(votes)[0])[i]);
            nbChecked++;
        }
    }

    verifData();

    calculVotes();

    matieresSelectionne = [];
}

function calculVotes(){

    tableauPersonnes = [];
    matieresS.innerHTML = "";
    matieresS.innerHTML = "Matière(s) sélectionées :";

    //Tableau stockant les etudiants(pseudo + nom) ainsi qu une variable score qui sera incrémenté grâce a/aux matière(s) séléctionnées
    for(let i=0; i<Object.keys(logins).length; i++){
        let pseudo = Object.keys(logins)[i];
        let nom = Object.values(logins)[i];
        let personne = {pseudo: pseudo, nom: nom, score: 0};
        tableauPersonnes.push(personne);
    }
    // => on va stocker chaque élèves voté par les élèves
    let elevesVotes = new Array();

    for(let o = 0; o<tableauPersonnes.length; o++){
        tableauPersonnes[o].score = 0;
    }
    //Parcours des matières sélectionnées
    for(let nMatiere = 0; nMatiere < matieresSelectionne.length; nMatiere++){

        elevesVotes = [];
        //affichage des matières sélectionner
        matieresS.innerHTML += " "+matieresSelectionne[nMatiere];

        //parcours des élèves
        for(etudiant in votes){
            
            for(let i=0; i<votes[etudiant][matieresSelectionne[nMatiere]].length; i++){

                //stockage des élèves ayant reçu des votes dans la matière sélectionnée en cours
                elevesVotes.push(votes[etudiant][matieresSelectionne[nMatiere]][i]);
            }    
        }
        // Incrémente le score de l'élève en cours grâce au tableau précédent stockant les élèves ayant reçu des elevesVotes
        // => chaque fois que leurs nom apparait = + 1
        for(let i = 0; i< elevesVotes.length; i++){
            for(let l = 0; l<tableauPersonnes.length; l++){
                if(elevesVotes[i] == tableauPersonnes[l].pseudo){
                    tableauPersonnes[l].score += 1;
                }
            }
        }
    }

    //Affichage
    //Vide l'affichage
    tableau.innerHTML = "";

    //Création de l'affichage du tableau
    // => Header
    tableau.innerHTML += "<tr class='headTab'>"+
    "<td>"+
    "Classement"+
    "</td>"+
    "<td>"+
    "Pseudo"+
    "</td>"+
    "<td>"+
    "Nom"+
    "</td>"+
    "<td>"+
    "Nombre de votes"+
    "</td>";

    for(let v=0; v<tableauPersonnes.length; v++){

        //Tri du tableau contenant les personnes grâce aux scores
        tableauPersonnes.sort((a,b) => {
            if(b.score >= a.score){
                return 1;
            }else{
                if(a.score >= b.score){
                    return -1;
                }else{
                    return 0;
                }
            }
        });

        //Affichage de tous les élèves (meme si score = 0) ou affichage des élèves ayant reçu au moins 1 vote
        if(allEleves.checked){
            tableau.innerHTML += "<tr>"+
            "<td>"+
            (v+1)+
            "</td>"+
            "<td>"+
            tableauPersonnes[v].pseudo+
            "</td>"+
            "<td>"+
            tableauPersonnes[v].nom+
            "</td>"+
            "<td>"+
            tableauPersonnes[v].score+
            "</td>";
        }else{
            if(tableauPersonnes[v].score > 0){
                tableau.innerHTML += "<tr>"+
            "<td>"+
            (v+1)+
            "</td>"+
            "<td>"+
            tableauPersonnes[v].pseudo+
            "</td>"+
            "<td>"+
            tableauPersonnes[v].nom+
            "</td>"+
            "<td>"+
            tableauPersonnes[v].score+
            "</td>";
            }
        } 
    }
    
}

function resetForm(){
    document.getElementById("form").reset();

    //Vide l'affichage
    tableau.innerHTML = "";
    matieresS.innerHTML = "";

    verif.innerHTML = "";
}

function verifData(){
    if(nbChecked > 0) {
        verif.innerHTML = "Matière(s) bien sélectionnée(s)";
        nbChecked = 0;
    } else {
        verif.innerHTML = "Veuillez selectionner au moins une matière";
    }
}