class Obstacle {

    constructor() {
        this.currentIdObstacle = 0;
    }

    createObstacle(obstacleNumber, length, ctx) {
        
        let randomElement = new RandomElement(length);
        randomElement.typeBlock(1, `obstacle${obstacleNumber}`);

        this.currentIdObstacle = randomElement.idElement(`obstacle${obstacleNumber}`);
        console.log("idObstacle in createObstacle", this.currentIdObstacle);

        randomElement.drawBlock(`obstacle${obstacleNumber}`, "assets/img/tiles-2.png", ctx);
    }

}