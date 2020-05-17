class Player {

    constructor(name, level) {
        this.name = name;
        this.level = level;
        this.currentId = -1;
    }

    createPlayer(playerNumber, length) {

        let randomElement = new RandomElement(length);
        randomElement.typeBlock(1, `player${playerNumber}`);

        this.currentId = randomElement.idElement(`player${playerNumber}`);
        console.log("idPlayer in createPlayer", this.currentId);

        /* Création de la variable playerIsValid */
        let playerIdIsValid = false;

        /* Vérification des jouerus côte à côte */
        while (!playerIdIsValid) {

            /* On assigne la variable playerIdIsValid à true */
            playerIdIsValid = true;

            /* 
            - SI idPlayer est suppérieur à 10 (true) 
            - On entre dans la deuxième condition et la valeur de playerIsValid vaut false seulement SI le joueur se trouve 10 cases avant la position de l'autre joueur
            - SINON playerIsValid vaut true
            */
            if (this.currentId > length) {
                if (listBloc[this.currentId - length].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (this.currentId < length * length - length) {
                if (listBloc[this.currentId + length].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (this.currentId % length !== 0) {
                if (listBloc[this.currentId - 1].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (this.currentId % length !== length - 1) {
                if (listBloc[this.currentId + 1].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            /* Si différent de playerIdIsValid, on crée le joueur */
            if (!playerIdIsValid) {
                listBloc[this.currentId].type = "casevide";
                randomElement.typeBlock(1, `player${playerNumber}`);
                this.currentId = randomElement.idElement(`player${playerNumber}`);
            }
        }

        // On dessine le joueur
        randomElement.drawBlock(`player${playerNumber}`, `assets/img/player-${playerNumber}.jpg`);
    }

    movePlayerUp(length) {
        let canvas = new Image();

        canvas.src = "assets/img/tiles-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

        this.currentId -= length;
        console.log("Déplacement vers le haut", this.currentId);

        canvas.src = "assets/img/player-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);
    }

    movePlayerRight() {
        let canvas = new Image();

        canvas.src = "assets/img/tiles-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

        this.currentId += 1;
        console.log("Déplacement vers la droite", this.currentId);

        canvas.src = "assets/img/player-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);
    }

    movePlayerDown(length) {
        let canvas = new Image();

        canvas.src = "assets/img/tiles-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

        this.currentId += length;
        console.log("Déplacement vers le bas", this.currentId);

        canvas.src = "assets/img/player-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);
    }

    movePlayerLeft() {
        let canvas = new Image();

        canvas.src = "assets/img/tiles-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

        this.currentId -= 1;
        console.log("Déplacement vers la gauche", this.currentId);

        canvas.src = "assets/img/player-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);
    }
}