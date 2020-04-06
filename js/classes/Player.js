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

    describePlayer() {
        console.log(` nom: ${this.name} - level: ${this.level}`);
    }
    
}

