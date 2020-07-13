class Map {

    createMap(ctx, listBloc, length, widthMax, heightMax, sizeBloc, numberBlocWidth) {

        //canvas - Spécifie la couleur ou le style à l'intérieur des formes
        ctx.fillStyle = "#f1f1f1";
        //canvas -  Dessine un rectangle plein (x, y, largeur, hauteur)
        ctx.fillRect(0, 0, widthMax, heightMax);
        let column = 0;
        let line = 0;

        //- On parcours la totalité du plateau de jeu (100 cases)
        //- On crée un objet de type "casevide" pour chaque case du plateau
        //- On incrémente
        for (let i = 0; i < length * length; i++) {

            listBloc[i] = {
                id: i,
                type: "casevide",
                positionX: sizeBloc * column + 1,
                positionY: sizeBloc * line + 1
            };
            column++;

            //- On vérifie si column est strictemet égal à la largeur du plateau de jeu
            //- true : on passe la valeur de column à 0 puis on incrémente pour passer à la ligne suivante et continuer la création des objets "casevide"
            if (column === numberBlocWidth) {
                column = 0;
                line++;
            }
        }
    
    }

}