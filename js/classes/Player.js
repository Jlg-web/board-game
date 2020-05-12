class Player {

    constructor(name, level) {
        this.name = name;
        this.level = level;
        this.currentId = -1;
    }

    createPlayer(playerNumber) {

        const length = 10;

        let randomElement = new RandomElement();
        randomElement.typeBlock(1, `player${playerNumber}`);

        //this.currentId
        let idPLayer = randomElement.idElement(`player${playerNumber}`);
        console.log("idPlayer in createPlayer", idPLayer);

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
            if (idPLayer > length) {
                if (listBloc[idPLayer - length].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (idPLayer < length * length - length) {
                if (listBloc[idPLayer + length].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (idPLayer % length !== 0) {
                if (listBloc[idPLayer - 1].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (idPLayer % length !== length - 1) {
                if (listBloc[idPLayer + 1].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            /* Si différent de playerIdIsValid, on crée le joueur */
            if (!playerIdIsValid) {
                listBloc[idPLayer].type = "casevide";
                randomElement.typeBlock(1, `player${playerNumber}`);
                idPLayer = randomElement.idElement(`player${playerNumber}`);
            }
        }

        // On dessine le joueur
        randomElement.drawBlock(`player${playerNumber}`, `assets/img/player-${playerNumber}.jpg`);
        
        //Déplacement du joueur
        let btnUp = document.getElementById("btn-up");
        let btnRight = document.getElementById("btn-right");
        let btnDown = document.getElementById("btn-down");
        let btnLeft = document.getElementById("btn-left");

        //On écoute chaque bouton puis on leur applique une fonction
        //haut
        btnUp.addEventListener("click", function () {

            let canvas = new Image();

            canvas.src = "assets/img/tiles-1.jpg";
            ctx.drawImage(canvas, listBloc[idPLayer].positionX, listBloc[idPLayer].positionY);

            idPLayer = listBloc[idPLayer].id -= length;
            console.log("Déplacement vers le haut", idPLayer);

            canvas.src = "assets/img/player-1.jpg";
            ctx.drawImage(canvas, listBloc[idPLayer].positionX, listBloc[idPLayer].positionY);
        })

        //droit
        btnRight.addEventListener("click", function () {

            let canvas = new Image();

            canvas.src = "assets/img/tiles-1.jpg";
            ctx.drawImage(canvas, listBloc[idPLayer].positionX, listBloc[idPLayer].positionY);

            idPLayer = listBloc[idPLayer].id += 1;
            console.log("Déplacement vers la droite", idPLayer);

            canvas.src = "assets/img/player-1.jpg";
            canvas.addEventListener('load', function () {
                ctx.drawImage(canvas, listBloc[idPLayer].positionX, listBloc[idPLayer].positionY);
            }, false);

        })

        //bas
        btnDown.addEventListener("click", function () {

            let canvas = new Image();

            canvas.src = "assets/img/tiles-1.jpg";
            ctx.drawImage(canvas, listBloc[idPLayer].positionX, listBloc[idPLayer].positionY);

            idPLayer = listBloc[idPLayer].id  += length;
            console.log("Déplacement vers le bas", idPLayer);

            canvas.src = "assets/img/player-1.jpg";
            canvas.addEventListener('load', function () {
                ctx.drawImage(canvas, listBloc[idPLayer].positionX, listBloc[idPLayer].positionY);
            }, false);

        })

        //gauche
        btnLeft.addEventListener("click", function () {

            let canvas = new Image();

            canvas.src = "assets/img/tiles-1.jpg";
            ctx.drawImage(canvas, listBloc[idPLayer].positionX, listBloc[idPLayer].positionY);

            idPLayer = listBloc[idPLayer].id  -= 1;
            console.log("Déplacement vers la gauche", idPLayer);

            canvas.src = "assets/img/player-1.jpg";
            canvas.addEventListener('load', function () {
                ctx.drawImage(canvas, listBloc[idPLayer].positionX, listBloc[idPLayer].positionY);
            }, false);

        })
    }

    describePlayer() {}
}