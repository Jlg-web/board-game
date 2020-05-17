class Obstacle {

    createObstacle(length) {
        let randomElement = new RandomElement(length);
        randomElement.typeBlock(12, "obstacle");
        randomElement.drawBlock("obstacle", "assets/img/tiles-2.png");
    }

}