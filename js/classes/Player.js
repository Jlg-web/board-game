class Player {

    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    createPlayer(playerNumber) {
        let randomElement = new RandomElement();
        randomElement.typeBlock(1, `player${playerNumber}`);
        randomElement.drawBlock(`player${playerNumber}`, `assets/img/player-${playerNumber}.jpg`);
    }

    verifPlayerPosition() {
        let randomElement = new RandomElement();
        let idPLayer1 = randomElement.idElement("player1");
        let idPLayer2 = randomElement.idElement("player2");

        if (idPLayer1 == idPLayer2 + 1 || idPLayer1 == idPLayer2 - 1 || idPLayer1 == idPLayer2 + 10 || idPLayer1 == idPLayer2 - 10) {
            alert("random");
            console.log("relancer la fonction")
        }
    }

    describePlayer() {
        console.log(` nom: ${this.name} - level: ${this.level}`);
    }
}