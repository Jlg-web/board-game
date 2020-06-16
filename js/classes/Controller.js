class Controller {

    constructor() {
        this.currentPlayer = 0;
        this.numberClick = 0;
        this.boardPlayer1 = document.getElementById("p1");
        this.boardPlayer2 = document.getElementById("p2");
    }

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

        //Init obstacles
        const obstacle = new Obstacle();
        obstacle.createObstacle(length, ctx);

        //INIT WEAPON
        const weapon1 = new Weapon(1, "lance-pierre", 10);
        const weapon2 = new Weapon(2, "masse", 20);
        const weapon3 = new Weapon(3, "arc", 30);
        const weapon4 = new Weapon(4, "pistolet laser", 50);
        weapon1.createWeapon(1, length, ctx);
        weapon2.createWeapon(2, length, ctx);
        weapon3.createWeapon(3, length, ctx);
        weapon4.createWeapon(4, length, ctx);

        //**** INIT PLAYERS *****
        const player1 = new Player("Chevalier", weapon1);
        const player2 = new Player("Ninja", weapon1);
        player1.createPlayer(1, length, ctx);
        player2.createPlayer(2, length, ctx);

        //*render
        const randomElement = new RandomElement(length);
        randomElement.render(ctx);

        //***** Déplacement du joueur ******/
        let btnUp = document.getElementById("btn-up");
        let btnRight = document.getElementById("btn-right");
        let btnDown = document.getElementById("btn-down");
        let btnLeft = document.getElementById("btn-left");
        let nextBtn = document.getElementById("next-btn");

        // **** tableau des 2 joueurs ***/
        // players[0] = Joueur 1 (Chevalier)
        // players[1] = Joueur 2 (Ninja)

        let players = [player1, player2];
        const design1 = "assets/img/player-1.jpg";
        const design2 = "assets/img/player-2.jpg";
        let designPlayers = "";

        //Permet de switcher d'un joueur à l'autre
        nextBtn.addEventListener("click", function () {

            this.numberClick = 0;
            //15_06
            if (this.currentPlayer == 0) {
                this.currentPlayer = 1;
                this.boardPlayer2.classList.add("whatPlayer");
                this.boardPlayer1.classList.remove("whatPlayer");
            } else {
                this.currentPlayer = 0;
                this.boardPlayer1.classList.add("whatPlayer");
                this.boardPlayer2.classList.remove("whatPlayer");
            }
            this.currentPlayer = (this.currentPlayer++);
        });

        //15_06
        //Joueur de base séléctionné
        if (this.currentPlayer == 0) {
            this.boardPlayer1.classList.add("whatPlayer");
        } else {
            this.boardPlayer2.classList.add("whatPlayer");
        }




        btnUp.addEventListener("click",  () => {

            //Incrémentation du click du joueur

            this.numberClick++;
            // console.log(this.numberClick)

            //Vérification de l'image du joueur
            if (this.currentPlayer == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
   
            //Appel de la methode movePlayerUp
            const currentId = players[this.currentPlayer].movePlayerUp(length, ctx, designPlayers);
        

            //Si le nombre de click est suppérieur ou égale à 4 (3 déplacements) on change de joueur
            if (this.numberClick === 3) {
                this.switchPlayer();
            }

            if ((this.numberClick === 1 || this.numberClick === 2) && listBloc[currentId - length].type === "obstacle") {
                this.switchPlayer();
            }

        });





        btnRight.addEventListener("click", () => {

            //Incrémentation du click du joueur
            this.numberClick++;
            // console.log(this.numberClick)

            if (this.currentPlayer == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[this.currentPlayer].movePlayerRight(ctx, designPlayers);

            //Si le nombre de click est suppérieur ou égale à 4 (3 déplacements) on change de joueur
            if (this.numberClick === 3) {
                this.switchPlayer();
            }
        });

        btnDown.addEventListener("click",  () => {
            //Incrémentation du click du joueur
            this.numberClick++;
            // console.log(this.numberClick)

            if (this.currentPlayer == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[this.currentPlayer].movePlayerDown(length, ctx, designPlayers);

            //Si le nombre de click est suppérieur ou égale à 4 (3 déplacements) on change de joueur
            if (this.numberClick === 3) {
                this.switchPlayer();
            }
        });


        btnLeft.addEventListener("click", () => {

            //Incrémentation du click du joueur
            this.numberClick++;
            // console.log(this.numberClick)

            if (this.currentPlayer === 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[this.currentPlayer].movePlayerLeft(ctx, designPlayers);

            //Si le nombre de click est suppérieur ou égale à 4 (3 déplacements) on change de joueur
            if (this.numberClick === 3) {
                this.switchPlayer();
            }
        });

    }

    switchPlayer() {
        if (this.currentPlayer === 0) {
            this.currentPlayer = 1;
            this.boardPlayer2.classList.add("whatPlayer");
            this.boardPlayer1.classList.remove("whatPlayer");
        } else {
            this.currentPlayer = 0;
            this.boardPlayer1.classList.add("whatPlayer");
            this.boardPlayer2.classList.remove("whatPlayer");
        }
        this.numberClick = 0;
    }


}