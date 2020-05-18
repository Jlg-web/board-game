class Controller {

    init() {
        const canvas = document.getElementById('plateau');
        const ctx = canvas.getContext('2d');
        const widthMax = canvas.width;
        const heightMax = canvas.height;
        const sizeBloc = 60;
        const numberBlocWidth = widthMax / sizeBloc;
        const length = 10;

        //**** INIT MAP ******
        const map = new Map();
        map.createMap(length, ctx, widthMax, heightMax, sizeBloc, numberBlocWidth, listBloc);

        //**** INIT PLAYERS *****
        const player1 = new Player("Chevalier", 50);
        const player2 = new Player("Ninja", 10);

        player1.createPlayer(1, length, ctx);
        player2.createPlayer(2, length, ctx);

        //***** Déplacement du joueur ******/
        let btnUp = document.getElementById("btn-up");
        let btnRight = document.getElementById("btn-right");
        let btnDown = document.getElementById("btn-down");
        let btnLeft = document.getElementById("btn-left");


        // **** tableau des 2 joueurs ***/
        // players[0] = Joueur 1 (Chevalier)
        // players[1] = Joueur 2 (Ninja)

        //Tableau des 2 joueurs
        let players = [player1, player2];
        console.log(players);

        //Joueur courant
        let current_player = 0;
        const design1 = "assets/img/player-1.jpg";
        const design2 = "assets/img/player-2.jpg";
        let designPlayers = "";

        console.log(designPlayers);

        current_player = (current_player === 0) ? 0 : 1;

        btnUp.addEventListener("click", function () {
            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerUp(length, ctx, designPlayers);
            current_player = (++current_player) % players.length;
        });

        btnRight.addEventListener("click", function () {
            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerRight(ctx, designPlayers);
            current_player = (++current_player) % players.length;
        });

        btnDown.addEventListener("click", function () {
            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerDown(length, ctx, designPlayers);
            current_player = (++current_player) % players.length;
        });

        btnLeft.addEventListener("click", function () {
            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerLeft(ctx, designPlayers);
            current_player = (++current_player) % players.length;
        });


        //INIT WEAPON
        const weapon1 = new Weapon("un lance-pierre", 10);
        const weapon2 = new Weapon("une masse", 20);
        const weapon3 = new Weapon("un arc", 30);
        const weapon4 = new Weapon("un pistolet laser", 50);
        weapon1.createWeapon(1, length, ctx);
        weapon2.createWeapon(2, length, ctx);
        weapon3.createWeapon(3, length, ctx);
        weapon4.createWeapon(4, length, ctx);


        //Init obstacles
        const obstacle = new Obstacle();
        obstacle.createObstacle(length, ctx);
    }
}