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
        let current_player = 0;
        const design1 = "assets/img/player-1.jpg";
        const design2 = "assets/img/player-2.jpg";
        let designPlayers = "";
        let numberClick = 0;
        let boardPlayer1 = document.getElementById("p1");
        let boardPlayer2 = document.getElementById("p2");
        
        //Permet de switcher d'un joueur à l'autre
        nextBtn.addEventListener("click", function () {
            numberClick = 0;
            //15_06
            if (current_player == 0) {
                current_player = 1;
                console.log(current_player)
                boardPlayer2.classList.add("whatPlayer");
                boardPlayer1.classList.remove("whatPlayer");
            } else {
                current_player = 0;
                console.log(current_player)
                boardPlayer1.classList.add("whatPlayer");
                boardPlayer2.classList.remove("whatPlayer");
            }
            current_player = (current_player++);
        });

        //15_06
        //Joueur de base séléctionné
        if (current_player == 0) {
            boardPlayer1.classList.add("whatPlayer");
        } else {
            boardPlayer2.classList.add("whatPlayer");
        }

        //Affichage de la bonne image du joueur 
        btnUp.addEventListener("click", function () {

            //Incrémentation du click du joueur
            numberClick++;
            // console.log(numberClick)

            //Si le nombre de click est suppérieur ou égale à 4 (3 déplacements) on change de joueur
            if (numberClick >= 4) {
                if (current_player == 0) {
                    current_player = 1;
                    boardPlayer2.classList.add("whatPlayer");
                    boardPlayer1.classList.remove("whatPlayer");
                } else {
                    current_player = 0;
                    boardPlayer1.classList.add("whatPlayer");
                    boardPlayer2.classList.remove("whatPlayer");
                }
                current_player = (current_player++);
                numberClick = 1;
            }

            //15_06
            //Montre quel joueur est en train de jouer
            if (numberClick === 3) {
                if (current_player == 0) {
                    boardPlayer2.classList.add("whatPlayer");
                    boardPlayer1.classList.remove("whatPlayer");
                } else {
                    boardPlayer1.classList.add("whatPlayer");
                    boardPlayer2.classList.remove("whatPlayer");
                }
            }

            //Vérification de l'image du joueur
            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }

            //Appel de la methode movePlayerUp
            players[current_player].movePlayerUp(length, ctx, designPlayers);
        });

        btnRight.addEventListener("click", function () {

            //Incrémentation du click du joueur
            numberClick++;
            // console.log(numberClick)

            //Si le nombre de click est suppérieur ou égale à 4 (3 déplacements) on change de joueur
            if (numberClick >= 4) {
                if (current_player == 0) {
                    current_player = 1;
                } else {
                    current_player = 0;
                }
                current_player = (current_player++);
                numberClick = 1;
            }

            //15_06
            //Montre quel joueur est en train de jouer
            if (numberClick === 3) {
                if (current_player == 0) {
                    boardPlayer2.classList.add("whatPlayer");
                    boardPlayer1.classList.remove("whatPlayer");
                } else {
                    boardPlayer1.classList.add("whatPlayer");
                    boardPlayer2.classList.remove("whatPlayer");
                }
            }

            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerRight(ctx, designPlayers);
        });

        btnDown.addEventListener("click", function () {
            //Incrémentation du click du joueur
            numberClick++;
            // console.log(numberClick)

            //Si le nombre de click est suppérieur ou égale à 4 (3 déplacements) on change de joueur
            if (numberClick >= 4) {
                if (current_player == 0) {
                    current_player = 1;
                } else {
                    current_player = 0;
                }
                current_player = (current_player++);
                numberClick = 1;
            }

            //15_06
            //Montre quel joueur est en train de jouer
            if (numberClick === 3) {
                if (current_player == 0) {
                    boardPlayer2.classList.add("whatPlayer");
                    boardPlayer1.classList.remove("whatPlayer");
                } else {
                    boardPlayer1.classList.add("whatPlayer");
                    boardPlayer2.classList.remove("whatPlayer");
                }
            }


            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerDown(length, ctx, designPlayers);
        });

        btnLeft.addEventListener("click", function () {

            //Incrémentation du click du joueur
            numberClick++;
            // console.log(numberClick)

            //Si le nombre de click est suppérieur ou égale à 4 (3 déplacements) on change de joueur
            if (numberClick >= 4) {
                if (current_player == 0) {
                    current_player = 1;
                } else {
                    current_player = 0;
                }
                current_player = (current_player++);
                numberClick = 1;
            }

            //15_06
            //Montre quel joueur est en train de jouer
            if (numberClick === 3) {
                if (current_player == 0) {
                    boardPlayer2.classList.add("whatPlayer");
                    boardPlayer1.classList.remove("whatPlayer");
                } else {
                    boardPlayer1.classList.add("whatPlayer");
                    boardPlayer2.classList.remove("whatPlayer");
                }
            }

            if (current_player == 0) {
                designPlayers = design1;
            } else {
                designPlayers = design2;
            }
            players[current_player].movePlayerLeft(ctx, designPlayers);
        });
    }
}