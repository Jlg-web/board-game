class Controller {

  constructor() {
    this.canvas = document.getElementById('plateau');
    this.ctx = this.canvas.getContext('2d');
    this.currentPlayer = 0;
    this.numberClick = 0;
    this.playerDirection = "";
    this.boardPlayer1 = document.getElementById("p1");
    this.boardPlayer2 = document.getElementById("p2");
    this.btnUp = document.getElementById("btn-up");
    this.btnRight = document.getElementById("btn-right");
    this.btnDown = document.getElementById("btn-down");
    this.btnLeft = document.getElementById("btn-left");
    this.nextBtn = document.getElementById("next-btn");
    this.design1 = "assets/img/player-1.jpg";
    this.design2 = "assets/img/player-2.jpg";
    this.designPlayers = "";
  }

  //Méthode init
  init() {
    
    const length = 10;
    const widthMax = this.canvas.width;
    const heightMax = this.canvas.height;
    const sizeBloc = 60;
    const numberBlocWidth = widthMax / sizeBloc;

    /*** Init map ***/
    const map = new Map();
    map.createMap(length, this.ctx, widthMax, heightMax, sizeBloc, numberBlocWidth, listBloc);

    /*** Init obstacles ***/
    const obstacle = new Obstacle();
    obstacle.createObstacle(length);

    /*** Init weapon ***/
    const weapon1 = new Weapon(1, "lance-pierre", 10);
    const weapon2 = new Weapon(2, "masse", 20);
    const weapon3 = new Weapon(3, "arc", 30);
    const weapon4 = new Weapon(4, "pistolet laser", 50);
    weapon1.createWeapon(1, length);
    weapon2.createWeapon(2, length);
    weapon3.createWeapon(3, length);
    weapon4.createWeapon(4, length);

    /*** Init players ***/
    const player1 = new Player(1, "Chevalier");
    const player2 = new Player(2, "Ninja");
    player1.createPlayer(1, length);
    player2.createPlayer(2, length);
    let players = [player1, player2];
    //Selection joueur de base
    if (this.currentPlayer == 0) {
      this.boardPlayer1.classList.add("whatPlayer");
    } else {
      this.boardPlayer2.classList.add("whatPlayer");
    }
    //Switch du joueur au click du bouton "Joueur suivant"
    this.nextBtn.addEventListener("click", () => {
      this.switchPlayer();
      this.currentPlayer = (this.currentPlayer++);
    });

    /*** Init render ***/
    const randomElement = new RandomElement(length);
    randomElement.render(this.ctx);

    /*** Gestion mouvement ***/
    //UP
    this.btnUp.addEventListener("click", () => {

      //Gestion blocage sens de direction
      if (this.numberClick === 0) {
        if (players[this.currentPlayer].currentId < length ||
          listBloc[players[this.currentPlayer].currentId - length].type === "obstacle") {
          alert("Vous ne pouvez pas aller dans cette direction");
          return;
        }
        this.playerDirection = "haut";
      } else {
        if (this.playerDirection !== "haut") {
          alert("Vous n'avez pas le droit d'aller dans cette direction");
          return;
        }
      }

      //Vérification de l'image du joueur
      if (this.currentPlayer == 0) {
        this.designPlayers = this.design1;
      } else {
        this.designPlayers = this.design2;
      }

      //Appel de la methode movePlayerUp
      let currentIdMoveUp = players[this.currentPlayer].movePlayerUp(length, this.ctx, this.designPlayers);

      //Si le nombre de click est égal à 1 un 2 et que l'element au dessus du joueur est un obstacle, on change de joueur 
      //Si le joueur sort du plateau, on change de joueur
      if ((this.numberClick === 1 ||
          this.numberClick === 2) && (currentIdMoveUp < length ||
          listBloc[currentIdMoveUp - length].type === "obstacle")) {
        this.switchPlayer();
      }

      //Incrémentation du click du joueur
      this.numberClick++;

      //Si le nombre de click est égal à 3, on change de joueur
      if (this.numberClick === 3) {
        this.switchPlayer();
      }

      //Up - Verif joueur côte à côte
      if (listBloc[currentIdMoveUp - length].type.includes("player") ||
        listBloc[currentIdMoveUp + 1].type.includes("player") ||
        listBloc[currentIdMoveUp - 1].type.includes("player")) {
        this.fight();
      }

      const randomElement = new RandomElement(length);
      randomElement.render(this.ctx);
    });

    //RIGHT
    this.btnRight.addEventListener("click", () => {

      //Gestion Direction
      if (this.numberClick === 0) {

        if (players[this.currentPlayer].currentId % 10 === 9 ||
          listBloc[players[this.currentPlayer].currentId + 1].type === "obstacle") {
          alert("Vous ne pouvez pas aller dans cette direction");
          return;
        }

        this.playerDirection = "droite";

      } else {
        if (this.playerDirection !== "droite") {
          alert("Vous n'avez pas le droit d'aller dans cette direction");
          return;
        }
      }

      if (this.currentPlayer == 0) {
        this.designPlayers = this.design1;
      } else {
        this.designPlayers = this.design2;
      }

      //Appel de la methode movePlayerUp
      let currentIdMoveRight = players[this.currentPlayer].movePlayerRight(this.ctx, this.designPlayers);

      //Verif obstacle 1 un ou 2 mouvements 
      if ((this.numberClick === 1 ||
          this.numberClick === 2) && (currentIdMoveRight % 10 === 9 ||
          listBloc[currentIdMoveRight + 1].type === "obstacle")) {
        this.switchPlayer();
      }

      //Incrémentation du click du joueur
      this.numberClick++;

      //Vérifications
      //Si le nombre de click est égal à 3, on change de joueur
      if (this.numberClick === 3) {
        this.switchPlayer();
      }

      //Right - Verif joueur côte à côte
      if (listBloc[currentIdMoveRight + 1].type.includes("player") ||
        listBloc[currentIdMoveRight + length].type.includes("player") ||
        listBloc[currentIdMoveRight - length].type.includes("player")) {
        this.fight();
      }
      const randomElement = new RandomElement(length);
      randomElement.render(this.ctx);

    });

    //DOWN
    this.btnDown.addEventListener("click", () => {

      //Gestion Direction
      if (this.numberClick === 0) {

        if (players[this.currentPlayer].currentId > length * length - length ||
          listBloc[players[this.currentPlayer].currentId + length].type === "obstacle") {
          alert("Vous ne pouvez pas aller dans cette direction");
          return;
        }

        this.playerDirection = "bas";


      } else {
        if (this.playerDirection !== "bas") {
          alert("Vous n'avez pas le droit d'aller dans cette direction");
          return;
        }
      }

      if (this.currentPlayer == 0) {
        this.designPlayers = this.design1;
      } else {
        this.designPlayers = this.design2;
      }

      //Appel de la methode movePlayerUp
      let currentIdMoveDown = players[this.currentPlayer].movePlayerDown(length, this.ctx, this.designPlayers);

      //Verif obstacle 1 un ou 2 mouvements 
      if ((this.numberClick === 1 ||
          this.numberClick === 2) && (currentIdMoveDown > length * length - length ||
          listBloc[currentIdMoveDown + length].type === "obstacle")) {
        this.switchPlayer();
      }

      //Incrémentation du click du joueur
      this.numberClick++;

      //Si le nombre de click est suppérieur ou égale à 4 (3 déplacements) on change de joueur
      if (this.numberClick === 3) {
        this.switchPlayer();
      }

      //Down - Verif joueur côte à côte
      if (listBloc[currentIdMoveDown + length].type.includes("player") ||
        listBloc[currentIdMoveDown + 1].type.includes("player") ||
        listBloc[currentIdMoveDown - 1].type.includes("player")) {
        this.fight();
      }

      const randomElement = new RandomElement(length);
      randomElement.render(this.ctx);


    });

    //LEFT
    this.btnLeft.addEventListener("click", () => {

      //Gestion Direction
      if (this.numberClick === 0) {

        if (players[this.currentPlayer].currentId % 10 === 0 ||
          listBloc[players[this.currentPlayer].currentId - 1].type === "obstacle") {
          alert("Vous ne pouvez pas aller dans cette direction");
          return;
        }

        this.playerDirection = "gauche";

      } else {
        if (this.playerDirection !== "gauche") {
          alert("Vous n'avez pas le droit d'aller dans cette direction");
          return;
        }
      }

      if (this.currentPlayer === 0) {
        this.designPlayers = this.design1;
      } else {
        this.designPlayers = this.design2;
      }

      //Appel de la methode movePlayerLeft
      let currentIdMoveLeft = players[this.currentPlayer].movePlayerLeft(this.ctx, this.designPlayers);

      //Verif obstacle 1 un ou 2 mouvements 
      if ((this.numberClick === 1 ||
          this.numberClick === 2) && (currentIdMoveLeft % 10 === 0 ||
          listBloc[currentIdMoveLeft - 1].type === "obstacle")) {
        this.switchPlayer();
      }

      //Incrémentation du click du joueur
      this.numberClick++;

      //Si le nombre de click est égal 3, on change de joueur
      if (this.numberClick === 3) {
        this.switchPlayer();
      }

      //Left - Verif joueur côte à côte
      if (listBloc[currentIdMoveLeft - length].type.includes("player") ||
        listBloc[currentIdMoveLeft + length].type.includes("player") ||
        listBloc[currentIdMoveLeft - 1].type.includes("player")) {
        this.fight();
      }

      const randomElement = new RandomElement(length);
      randomElement.render(this.ctx);
    });
  }

  //Méthode switch
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

  //Méthode fight
  fight() {
    console.log('fight');
  }

}
