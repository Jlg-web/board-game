class Map {

    constructor(length, ctx, widthMax, heightMax, sizeBloc, numberBlocWidth) {

        this.length = length;
        this.ctx = ctx;
        this.widthMax = widthMax;
        this.heightMax = heightMax;
        this.sizeBloc = sizeBloc;
        this.numberBlocWidth = numberBlocWidth;
        this.column = 0;
        this.line = 0;
        
    }

    //Création MAP
    createMap() {
        //utilisation du contexte canvas
        this.ctx.fillStyle = "#2c3334";
        this.ctx.fillRect(0, 0, this.widthMax, this.heightMax);
        
        //On parcours chaque bloc
        for (let i = 0; i < this.length * this.length; i++) {

            let self = this;
            let img = new Image();
            img.src = "assets/img/tiles-1.jpg";

            img.onload = function() {
                self.ctx.drawImage(img, listBloc[i].positionX, listBloc[i].positionY);
            };

            //On ajoute un objet à chaque bloc
            listBloc[i] = {
                id: i,
                type: "casevide",
                positionX: this.sizeBloc * this.column + 1,
                positionY: this.sizeBloc * this.line + 1
            };
            this.column++;

            //On passe à la ligne suivante une fois arrivé à 10 cases
            if (this.column === this.numberBlocWidth) {
                this.column = 0;
                this.line++;
            }
        }
    }
}