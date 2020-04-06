class Obstacle {

    createObstacle() {
        let randomElement = new RandomElement();
        randomElement.typeBlock(12, "obstacle");
        randomElement.drawBlock("obstacle", "assets/img/tiles-2.png");
    }

}