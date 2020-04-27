class Player {

    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    createPlayer(playerNumber) {
        let randomElement = new RandomElement();
        randomElement.typeBlock(1, `player${playerNumber}`);

        let idPLayer = randomElement.idElement(`player${playerNumber}`);
        console.log("idPlayer in createPlayer", idPLayer);

        // if (listBloc[idPLayer].id == 0 || listBloc[idPLayer].id == 1 || listBloc[idPLayer].id == 2 ||
        //     listBloc[idPLayer].id == 3 || listBloc[idPLayer].id == 4 || listBloc[idPLayer].id == 5 ||
        //     listBloc[idPLayer].id == 6 || listBloc[idPLayer].id == 7 || listBloc[idPLayer].id == 8 ||
        //     listBloc[idPLayer].id == 9 || listBloc[idPLayer].id == 99 || listBloc[idPLayer].id == 98 || 
        //     listBloc[idPLayer].id == 97 || listBloc[idPLayer].id == 96 || listBloc[idPLayer].id == 95 || 
        //     listBloc[idPLayer].id == 94 || listBloc[idPLayer].id == 93 || listBloc[idPLayer].id == 92 || 
        //     listBloc[idPLayer].id == 91 || listBloc[idPLayer].id == 90) {
        //     alert("test1");
        //     listBloc[idPLayer].type = "casevide";
        //     randomElement.typeBlock(1, `player${playerNumber}`);
        //     idPLayer = randomElement.idElement(`player${playerNumber}`);
        // } 

        let playerIdIsValid = false;

        while (!playerIdIsValid) {

            playerIdIsValid = true;

            if (idPLayer > 10) {
                if (listBloc[idPLayer - 10].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (idPLayer < 90) {
                if (listBloc[idPLayer + 10].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (idPLayer % 10 !== 0 ) {
                if (listBloc[idPLayer - 1].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (idPLayer % 10 !== 9) {
                if (listBloc[idPLayer + 1].type.includes("player")) {
                    playerIdIsValid = false;
                }
            }

            if (!playerIdIsValid) {
                listBloc[idPLayer].type = "casevide";
                randomElement.typeBlock(1, `player${playerNumber}`);
                idPLayer = randomElement.idElement(`player${playerNumber}`);
            }
        }


        // while ( !playerIdIsValid 
        //     listBloc[idPLayer - 1].type.includes("player") || listBloc[idPLayer + 1].type.includes("player") ||
        //     listBloc[idPLayer + 10].type.includes("player") || (idPLayer < 10 && listBloc[idPLayer - 10].type.includes("player")) ) {
        //     alert("test2");
        //     listBloc[idPLayer].type = "casevide";
        //     randomElement.typeBlock(1, `player${playerNumber}`);
        //     idPLayer = randomElement.idElement(`player${playerNumber}`);
        // }

        randomElement.drawBlock(`player${playerNumber}`, `assets/img/player-${playerNumber}.jpg`);
    }


    describePlayer() {
        // console.log(` nom: ${this.name} - level: ${this.level}`);
    }
}