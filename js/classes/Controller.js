class Controller {

    init() {
        const map = new Map();
        const randomElement = new RandomElement();
        map.createMap();
        randomElement.createObstacle();
        randomElement.createWeapon();
    }

}