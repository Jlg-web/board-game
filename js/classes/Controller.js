class Controller {

    init() {
        const canvas = document.getElementById('plateau');
        const ctx = canvas.getContext('2d');

        const widthMax = canvas.width;
        const heightMax = canvas.height;
        const sizeBloc = 60;
        const numberBlocWidth = widthMax / sizeBloc;
        const length = 10;

        //***** INIT MAP ******
        const map = new Map(length, ctx, widthMax, heightMax, sizeBloc, numberBlocWidth);
        map.createMap();
    
        //***** INIT WEAPON *****
        const weapon1 = new Weapon(length, ctx, 1, "Lance-pierre", 10);
        const weapon2 = new Weapon(length, ctx, 2, "Masse", 20);
        const weapon3 = new Weapon(length, ctx, 3, "Arc", 30);
        const weapon4 = new Weapon(length, ctx, 4, "Pistolet laser", 50);
        weapon1.createWeapon();
        weapon2.createWeapon();
        weapon3.createWeapon();
        weapon4.createWeapon();

        //**** INIT PLAYERS *****
        const player1 = new Player("Chevalier", weapon1);
        const player2 = new Player("Ninja", weapon1);
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
        let designPlayers = "";
        const design1 = "assets/img/player-1.jpg";
        const design2 = "assets/img/player-2.jpg";
        console.log(designPlayers);

        btnUp.addEventListener("click", function () {
            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            // players[current_player].movePlayer(-length, ctx, designPlayers);
            players[current_player].movePlayerUp(length, ctx, designPlayers, recupNewWeapon);
            current_player = (current_player + 1) % players.length;
            console.log(current_player);
            
        });

        btnRight.addEventListener("click", function () {
            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerRight(ctx, designPlayers);
            current_player = (current_player + 1) % players.length;
        });

        btnDown.addEventListener("click", function () {
            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerDown(length, ctx, designPlayers);
            current_player = (current_player + 1) % players.length;
        });

        btnLeft.addEventListener("click", function () {
            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerLeft(ctx, designPlayers);
            current_player = (current_player + 1) % players.length;
        });

        //Init obstacles
        const obstacle = new Obstacle(length, ctx);
        obstacle.createObstacle();
    }
}