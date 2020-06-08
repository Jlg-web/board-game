class Map {

    createMap(length, ctx, widthMax, heightMax, sizeBloc, numberBlocWidth, listBloc) {

        ctx.fillStyle = "#2c3334";
        ctx.fillRect(0, 0, widthMax, heightMax);
        let column = 0;
        let line = 0;

        //On parcours chaque bloc
        for (let i = 0; i < length * length; i++) {
            let canvas = new Image();
            canvas.src = "assets/img/tiles-1.jpg";
            canvas.addEventListener('load', function () {
                ctx.drawImage(canvas, listBloc[i].positionX, listBloc[i].positionY);
            }, false);

            //On ajoute un objet à chaque bloc
            listBloc[i] = {
                id: i,
                type: "casevide",
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

}