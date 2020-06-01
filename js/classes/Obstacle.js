class Obstacle {

    constructor(length, ctx) {

        this.length = length;
        this.ctx = ctx;
        
    }

    createObstacle() {
        let randomElement = new RandomElement(this.length);
        randomElement.typeBlock(10, "obstacle");
        randomElement.drawBlock("obstacle", "assets/img/tiles-2.png", this.ctx);
    }

}