class Obstacle {

    createObstacle(length, ctx) {
        let randomElement = new RandomElement(length);
        randomElement.typeBlock(10, "obstacle");
        // randomElement.drawBlock("obstacle", "assets/img/tiles-2.png", ctx);
    }

}