class Player {

    constructor(name, playerCurrentWeapon) {
        this.name = name;
        this.playerCurrentWeapon = playerCurrentWeapon;
        this.previousWeapon = "";

        this.level = 10;
        this.currentId = -1;
    }

    //CreatePlayer
    createPlayer(playerNumber, length, ctx) {

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
        randomElement.drawBlock(`player${playerNumber}`, `assets/img/player-${playerNumber}.jpg`, ctx);
    }

    //MovePlayer
    // movePlayer(length, ctx, designPlayers) {
    //     let canvas = new Image();

    //     canvas.src = "assets/img/tiles-1.jpg";
    //     ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

    //     this.currentId += length;
    //     console.log("Déplacement ",length, this.currentId);

    //     canvas.src = designPlayers;
    //     ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);
    // }




    //MovePlayerUp
    movePlayerUp(length, ctx, designPlayers, recupNewWeapon) {

        //Si currentId < 0 alors on bloque l'avancé du joueur
        if (this.currentId - length < 0 || listBloc[this.currentId - length].type === "obstacle") {
            console.log("STOP");
            return;
        }

        //Vérification arme
        if(listBloc[this.currentId - length].type.includes("weapon")) {
            // console.log("CASE ARME UP");

            this.previousWeapon = this.playerCurrentWeapon;

            if(listBloc[this.currentId - length].type === "weapon1") {
                console.log("LANCE-PIERRE");
                this.playerCurrentWeapon = recupNewWeapon;
            }

            if(listBloc[this.currentId - length].type === "weapon2") {
                console.log("MASSE");
                // this.playerCurrentWeapon = newWeapon;
            }


            if(listBloc[this.currentId - length].type === "weapon3") {
                console.log("ARC");
                // this.playerCurrentWeapon = newWeapon;

            }

            if(listBloc[this.currentId - length].type === "weapon4") {
                console.log("PISTOLET LASER");
                // this.playerCurrentWeapon = newWeapon;

            }

        }

        let canvas = new Image();
    
        canvas.src = "assets/img/tiles-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

        this.currentId -= length;
        console.log("Déplacement vers le haut", this.currentId);

        canvas.src = designPlayers;
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

    }

    //MovePlayerRight
    movePlayerRight(ctx, designPlayers) {

        //Si currentId % 10 == 0 alors on bloque l'avancé du joueur
        if ((this.currentId + 1) % 10 === 0 || listBloc[this.currentId + 1].type === "obstacle") {
            console.log("STOP");
            return;
        }

        //Vérification arme
        if(listBloc[this.currentId + 1].type.includes("weapon")) {
            console.log("CASE ARME RIGHT");
        }

        let canvas = new Image();

        canvas.src = "assets/img/tiles-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

        this.currentId += 1;
        console.log("Déplacement vers la droite", this.currentId);

        canvas.src = designPlayers;
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);
    }

    //MovePlayerDown
    movePlayerDown(length, ctx, designPlayers) {

        //Si currentId > length * length (total des cases du plateau) alors on bloque l'avancé du joueur
        if (this.currentId + length > length * length || listBloc[this.currentId + length].type === "obstacle") {
            console.log("STOP");
            return;
        }

        //Vérification arme
        if(listBloc[this.currentId + length].type.includes("weapon")) {
            console.log("CASE ARME DOWN");
        }

        let canvas = new Image();

        canvas.src = "assets/img/tiles-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

        this.currentId += length;
        console.log("Déplacement vers le bas", this.currentId);


        canvas.src = designPlayers;
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);
    }

    //MovePlayerLeft
    movePlayerLeft(ctx, designPlayers) {

        //currentId % 10 == 9 alors on bloque l'avancé du joueur
        if (this.currentId === 0 || (this.currentId - 1) % 10 === 9 || listBloc[this.currentId - 1].type === "obstacle") {
            console.log("STOP");
            return;
        }

        //Vérification arme
        if(listBloc[this.currentId - 1].type.includes("weapon")) {
            console.log("CASE ARME LEFT");
        }

        let canvas = new Image();

        canvas.src = "assets/img/tiles-1.jpg";
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);

        this.currentId -= 1;
        console.log("Déplacement vers la gauche", this.currentId);

        canvas.src = designPlayers;
        ctx.drawImage(canvas, listBloc[this.currentId].positionX, listBloc[this.currentId].positionY);
    }
}