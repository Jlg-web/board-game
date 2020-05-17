class Controller {

    init() {

        const length = 10;
        const map = new Map();
        const obstacle = new Obstacle();

        const player1 = new Player("Chevalier", 50);
        console.log(player1);
        // const player2 = new Player("Ninja", 10);

        const weapon1 = new Weapon("un lance-pierre", 10);
        const weapon2 = new Weapon("une masse", 20);
        const weapon3 = new Weapon("un arc", 30);
        const weapon4 = new Weapon("un pistolet laser", 50);

        //Init map
        map.createMap(length);

        //Init players
        player1.createPlayer(1, length);

        //Déplacement du joueur
        let btnUp = document.getElementById("btn-up");
        let btnRight = document.getElementById("btn-right");
        let btnDown = document.getElementById("btn-down");
        let btnLeft = document.getElementById("btn-left");

        btnUp.addEventListener("click", function () { 
            player1.movePlayerUp(length);
        });

        btnRight.addEventListener("click", function () { 
            player1.movePlayerRight(length)
        });

        btnDown.addEventListener("click", function () { 
            player1.movePlayerDown(length)
        });

        btnLeft.addEventListener("click", function () { 
            player1.movePlayerLeft(length)
        });


        // player2.createPlayer(2);

        //Init weapon
        weapon1.createWeapon(1, length);
        weapon2.createWeapon(2, length);
        weapon3.createWeapon(3, length);
        weapon4.createWeapon(4, length);

        //Init obstacles
        obstacle.createObstacle(length);
    }

}