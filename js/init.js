//** Constantes initialisation canvas **
const canvas = document.getElementById('plateau');
const ctx = canvas.getContext('2d');

//** Définition des constantes globales **
//Largeur du canvas
const widthMax = canvas.width;
//Hauteur du canvas
const heightMax = canvas.height;
//Taille d'un bloc
const sizeBloc = 60;
//Nombre de blocs sur la largeur (largeur du canvas divisé par la taille d'un bloc)
const numberBlocWidth = widthMax / sizeBloc;
//Nombre de blocs sur la hauteur (hauteur du canvas divisé par la taille d'un bloc)
const numberBlocHeight = heightMax / sizeBloc;
//Nombre de blocs total (nombres de blocs sur la largeur multiplié par le nombre de blocs sur la hauteur)
const numberBloc = numberBlocWidth * numberBlocHeight;
//Tableau list blocs
const listBloc = [];

//** Fonction création map (création des blocs) **
function createMap() {
    ctx.fillStyle = "#ecf0f1";
    ctx.fillRect(0, 0, widthMax, heightMax);
    let column = 0;
    let line = 0;

    //On parcours chaque bloc
    for (let i = 0; i < numberBloc; i++) {
        //Création du style du bloc
        ctx.strokeStyle = 'grey';
        ctx.strokeRect(sizeBloc * column, sizeBloc * line, sizeBloc, sizeBloc);

        //On ajoute un objet à chaque bloc
        listBloc[i] = {
            numerocase: i,
            id: "casevide",
            positionX: sizeBloc * column + 1,
            positionY: sizeBloc * line + 1
        };
        
        column++;

        //On passe à la ligne suivante une fois arrivé à 10 cases
        if (column === numberBlocWidth) {
            column = 0;
            line++;
        }
    }
}

createMap()