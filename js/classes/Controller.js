class Controller {

    init() {
        const map = new Map();
        const obstacle = new Obstacle();

        const player1 = new Player("Chevalier", 50);
        const player2 = new Player("Ninja", 10);

        const weapon1 = new Weapon("un lance-pierre", 10);
        const weapon2 = new Weapon("une masse", 20);
        const weapon3 = new Weapon("un arc", 30);
        const weapon4 = new Weapon("un pistolet laser", 50);

        //Init map
        map.createMap();

        //Init players
        player1.createPlayer(1);
        player1.describePlayer();

        player2.createPlayer(2);
        player2.describePlayer();

        //Init weapon
        weapon1.createWeapon(1);
        weapon1.describeWeapon();
        weapon2.createWeapon(2);
        weapon2.describeWeapon();
        weapon3.createWeapon(3);
        weapon3.describeWeapon();
        weapon4.createWeapon(4);
        weapon4.describeWeapon();

        //Init obstacles
        obstacle.createObstacle();
    }

}