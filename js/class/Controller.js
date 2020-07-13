class Controller {

    constructor() {
        this.canvas = document.getElementById('plateau');
        this.ctx = this.canvas.getContext('2d');
        this.currentPlayer = 0;
        this.numberClick = 0;
        this.playerDirection = "";
        this.boardPlayer1 = document.getElementById("p1");
        this.boardPlayer2 = document.getElementById("p2");
        this.nextBtn = document.getElementById("next-btn");
        this.length = 10;
        this.widthMax = this.canvas.width;
        this.heightMax = this.canvas.height;
        this.sizeBloc = 60;
        this.numberBlocWidth = this.widthMax / this.sizeBloc;
        this.btnUp = document.getElementById("btn-up");
        this.btnDown = document.getElementById("btn-down");
        this.btnLeft = document.getElementById("btn-left");
        this.btnRight = document.getElementById("btn-right");
        this.design1 = "assets/img/player-1.jpg";
        this.design2 = "assets/img/player-2.jpg";
        this.designPlayers = "";
        this.players = [];

        this.lifePointP1 = document.getElementById("life-point-p1");
        this.lifePointP2 = document.getElementById("life-point-p2");
        this.attackBtnP1 = document.getElementById("attack-btn-p1");
        this.defenseBtnP1 = document.getElementById("defense-btn-p1");
        this.attackBtnP2 = document.getElementById("attack-btn-p2");
        this.defenseBtnP2 = document.getElementById("defense-btn-p2");
    }


    // Méthode init executée au lancement du jeu
    // Construction des objets à partir des différentes class
    init() {

        //Combat 
        //Attaque
        this.attackBtnP1.addEventListener("click", () => {
            //Si arme = lance-pierre
            this.lifePointP2.innerHTML -= weapon1.damage;
            console.log(this.lifePointP2);
            //Si arme = masse (this.lifePointP2.innerHTML -= 20;)
            //Si arme = Arc (this.lifePointP2.innerHTML -= 30;)
            //Si pistolet-laser = Arc (this.lifePointP2.innerHTML -= 50;)
        });

        this.attackBtnP2.addEventListener("click", () => {
            //Si l'arme courante du joueur est le lance-pierre
            this.lifePointP1.innerHTML -= weapon1.damage;
            console.log(this.lifePointP1);
            //Si l'arme courante du joueur est la masse (this.lifePointP1.innerHTML -= weapon2.damage;)
            //Si l'arme courante du joueur est l'arc (this.lifePointP1.innerHTML -= weapon3.damage;)
            //Si l'arme courante du joueur est le pistolet laser (this.lifePointP1.innerHTML -= weapon4.damage;)
        });


        //Defense
        this.defenseBtnP1.addEventListener("click", () => {
            this.lifePointP1.innerHTML++;
        });

        this.defenseBtnP2.addEventListener("click", () => {
            this.lifePointP2.innerHTML++;
        });
        //end Combat test



        //Création Map
        const map = new Map();
        map.createMap(this.ctx, listBloc, this.length, this.widthMax, this.heightMax, this.sizeBloc, this.numberBlocWidth);

        //Création joueurs
        const player1 = new Player(1, "Chevalier");
        player1.createPlayer(this.length, 1);
        this.players.push(player1);

        const player2 = new Player(2, "Ninja");
        player2.createPlayer(this.length, 2);
        this.players.push(player2);

        //Création Obstacles
        const obstacle = new Obstacle();
        obstacle.createObstacle(this.length);

        //Création Armes
        const weapon1 = new Weapon(1, "lance-pierre", 10);
        weapon1.createWeapon(this.length, 1);

        const weapon2 = new Weapon(2, "masse", 20);
        weapon2.createWeapon(this.length, 2);

        const weapon3 = new Weapon(3, "arc", 30);
        weapon3.createWeapon(this.length, 3);

        const weapon4 = new Weapon(4, "pistolet laser", 50);
        weapon4.createWeapon(this.length, 4);

        //Création render
        const renderElement = new RenderElement();
        renderElement.render(this.ctx, this.length);

        this.whichPlayerStarts();

        this.nextBtn.addEventListener("click", () => {
            this.switchPlayer();
            this.currentPlayer = (this.currentPlayer++);
        });

        //Mouvements joueur
        //UP
        this.btnUp.addEventListener("click", () => {
            // Récupération de la méthode movePlayerUp dans une variable (class Player)
            let currentId = this.players[this.currentPlayer].movePlayerUp(this.length);

            // Appel méthode blockingPlayer (class Controller)
            const result = this.blockingPlayer("haut");
            if (!result) {
                return;
            }

            // Vérification changement de joueur avant 3 click /rencontre d'un obstacle / sorti du plateau
            if ((this.numberClick === 1 || this.numberClick === 2) && (currentId < this.length ||
                    listBloc[currentId - this.length].type === "obstacle")) {
                this.switchPlayer();
            }

            // Appel méthode clickGestion (class Controller)
            this.clickGestion();

            // Appel de la méthode render (class RenderElement)
            renderElement.render(this.ctx, this.length);

            // Verification joueur côte à côte -> appel de la méthode startFight (class Controller)
            this.startFight(currentId);
        });

        //DOWN
        this.btnDown.addEventListener("click", () => {

            // Récupération de la méthode currentIdMoveDown dans une variable (class Player)
            let currentIdMoveDown = this.players[this.currentPlayer].movePlayerDown(this.length);

            // Appel méthode blockingPlayer (class Controller)
            const result = this.blockingPlayer("bas");
            if (!result) {
                return;
            }

            // Vérification changement de joueur avant 3 click /rencontre d'un obstacle / sorti du plateau
            if ((this.numberClick === 1 || this.numberClick === 2) && (currentIdMoveDown > length * length - length ||
                    listBloc[currentIdMoveDown + length].type === "obstacle")) {
                this.switchPlayer();
            }

            // Appel de la méthode clickGestion (class Controller)
            this.clickGestion();

            // Verification joueur côte à côte -> lancement du combat avec l'appel de la méthode fight (class Controller)
            if (listBloc[currentIdMoveDown + this.length].type.includes("player") ||
                listBloc[currentIdMoveDown + 1].type.includes("player") ||
                listBloc[currentIdMoveDown - 1].type.includes("player")) {
                this.fight();
            }

            // Appel de la méthode render (class RenderElement)
            renderElement.render(this.ctx, this.length);

        });

        //LEFT
        this.btnLeft.addEventListener("click", () => {

            // Récupération de la méthode currentIdMoveLeft dans une variable (class Player)
            let currentIdMoveLeft = this.players[this.currentPlayer].movePlayerLeft(this.length);

            // Appel méthode blockingPlayer (class Controller)
            const result = this.blockingPlayer("gauche");
            if (!result) {
                return;
            }

            // Appel de la méthode clickGestion (class Controller)
            this.clickGestion();

            // Vérification changement de joueur avant 3 click /rencontre d'un obstacle / sorti du plateau
            if ((this.numberClick === 1 || this.numberClick === 2) && (currentIdMoveLeft % 10 === 0 ||
                    listBloc[currentIdMoveLeft - 1].type === "obstacle")) {
                this.switchPlayer();
            }

            // Verification joueur côte à côte -> lancement du combat avec l'appel de la méthode fight (class Controller)
            if (listBloc[currentIdMoveLeft - this.length].type.includes("player") ||
                listBloc[currentIdMoveLeft + this.length].type.includes("player") ||
                listBloc[currentIdMoveLeft - 1].type.includes("player")) {
                this.fight();
            }

            // Appel de la méthode render (class RenderElement)
            renderElement.render(this.ctx, this.length);
        });

        //RIGHT
        this.btnRight.addEventListener("click", () => {

            // Récupération de la méthode currentIdMoveRight dans une variable (class Player)
            let currentIdMoveRight = this.players[this.currentPlayer].movePlayerRight(this.length);

            // Appel méthode blockingPlayer (class Controller)
            const result = this.blockingPlayer("droite");
            if (!result) {
                return;
            }

            // Appel de la méthode clickGestion (class Controller)
            this.clickGestion();

            // Vérification changement de joueur avant 3 click /rencontre d'un obstacle / sorti du plateau
            if ((this.numberClick === 1 || this.numberClick === 2) && (currentIdMoveRight % 10 === 9 ||
                    listBloc[currentIdMoveRight + 1].type === "obstacle")) {
                this.switchPlayer();
            }

            // Verification joueur côte à côte -> lancement du combat avec l'appel de la méthode fight (class Controller)
            if (listBloc[currentIdMoveRight + 1].type.includes("player") ||
                listBloc[currentIdMoveRight + this.length].type.includes("player") ||
                listBloc[currentIdMoveRight - this.length].type.includes("player")) {
                this.fight();
            }

            // Appel de la méthode render (class RenderElement)
            renderElement.render(this.ctx, this.length);

        });


        //FIGHT


    }

    //Methode quel joueur commence ?
    whichPlayerStarts() {
        if (this.currentPlayer == 0) {
            this.boardPlayer1.classList.add("which-player");
        } else {
            this.boardPlayer2.classList.add("which-player");
        }
    }

    //Methode changement de joueur
    switchPlayer() {
        if (this.currentPlayer === 0) {
            this.designPlayers = this.design1;
            this.currentPlayer = 1;
            this.boardPlayer2.classList.add("which-player");
            this.boardPlayer1.classList.remove("which-player");
        } else {
            this.designPlayers = this.design2;
            this.currentPlayer = 0;
            this.boardPlayer1.classList.add("which-player");
            this.boardPlayer2.classList.remove("which-player");
        }
        this.numberClick = 0;
    }

    //Methode gestion click
    clickGestion() {
        this.numberClick++;
        if (this.numberClick === 3) {
            this.switchPlayer();
        }
    }

    //Méthode fight
    fight() {
        console.log('fight');
    }

    //StartFight
    startFight(currentId) {
        if (listBloc[currentId - this.length].type.includes("player") ||
            listBloc[currentId + this.length].type.includes("player") ||
            listBloc[currentId + 1].type.includes("player") ||
            listBloc[currentId - 1].type.includes("player")) {
            this.fight();
        }
    }

    //blockingPlayer
    blockingPlayer(playerDirection) {

        if (this.numberClick === 0) {
            switch (playerDirection) {
                case "haut":
                    if (this.players[this.currentPlayer].currentId < this.length ||
                        listBloc[this.players[this.currentPlayer].currentId - this.length].type === "obstacle") {
                        alert("Vous ne pouvez pas aller dans cette direction");
                        return false;
                    }
                    break;
                case "bas":
                    if (this.players[this.currentPlayer].currentId > this.length * this.length - this.length ||
                        listBloc[this.players[this.currentPlayer].currentId + this.length].type === "obstacle") {
                        alert("Vous ne pouvez pas aller dans cette direction");
                        return false;
                    }
                    break;
                case "droite":
                    if (this.players[this.currentPlayer].currentId % 10 === 9 ||
                        listBloc[this.players[this.currentPlayer].currentId + 1].type === "obstacle") {
                        alert("Vous ne pouvez pas aller dans cette direction");
                        return false;
                    }
                    break;
                case "gauche":
                    if (this.players[this.currentPlayer].currentId % 10 === 0 ||
                        listBloc[this.players[this.currentPlayer].currentId - 1].type === "obstacle") {
                        alert("Vous ne pouvez pas aller dans cette direction");
                        return false;
                    }
                    break;
                default:
                    break;
            }
            this.playerDirection = playerDirection;
            return true;
        } else {
            if (this.playerDirection !== playerDirection) {
                alert("Vous n'avez pas le droit d'aller dans cette direction");
                return false;
            }
            return true;
        }
    }

}