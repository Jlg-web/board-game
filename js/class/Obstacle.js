class Obstacle {

    createObstacle(length) {
        let randomElement = new RandomElement(length);
        randomElement.typeBlock(10, "obstacle");
    }

}