class RandomElement {

    // ****** Cette méthode retourne un nombre aléatoire entre 0 et le nombre total de blocs. ******/
    randomNumber() {
        return Math.floor(Math.random() * (numberBloc - 1));
    }

    // ****** Cette méthode permet de gérer le nombre d'éléments à afficher et le type d'élement (arme, obstacle ou joueur) *****/
    typeBlock(numberElement, type) {
        // on instancie une boucle while pour gérer le nombre d'élément
        let counter = 0;
        while (counter < numberElement) {
            // On récupère la méthode randomNumber qu'on stocke dans une constante
            const numberRandomBloc = this.randomNumber();
            // Si l'objet listBloc vaut "casevide" alors la case est vide et le nouvel élément peut être crée
            if (listBloc[numberRandomBloc].type === "casevide") {
                listBloc[numberRandomBloc].type = type;
                counter++;
            }
        }
    }

    drawBlock(type, imageSrc) {
        for (let i = 0; i < numberBloc; i++) {

            if (listBloc[i].type === type) {
                let canvas = new Image();
                canvas.src = imageSrc;
                canvas.addEventListener('load', function () {
                    ctx.drawImage(canvas, listBloc[i].positionX, listBloc[i].positionY);
                }, false);
            }
        }

    }

}