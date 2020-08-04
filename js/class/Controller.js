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
    this.design1 = "assets/img/player-1.svg";
    this.design2 = "assets/img/player-2.svg";
    this.designPlayers = "";
    this.players = [];
  }


  // Méthode init executée au lancement du jeu
  // Construction des objets à partir des différentes class
  init() {
    //Création Map
    const map = new Map();
    map.createMap(this.ctx, listBloc, this.length, this.widthMax, this.heightMax, this.sizeBloc, this.numberBlocWidth);

    //Création joueurs
    const player1 = new Player(1, "Chevalier", 100);
    player1.createPlayer(this.length, 1);
    this.players.push(player1);

    const player2 = new Player(2, "Ninja", 100);
    player2.createPlayer(this.length, 2);
    this.players.push(player2);

    //Création Obstacles
    const obstacle = new Obstacle();
    obstacle.createObstacle(this.length);

    //Création Armes
    // const weapon1 = new Weapon(1, "lance-pierre", 10);
    Weapon.createWeapons(this.length);

    //Création render
    const renderElement = new RenderElement();
    renderElement.render(this.ctx, this.length);

    this.whichPlayerStarts();

    this.displayModal();

    this.nextBtn.addEventListener("click", () => {
      this.switchPlayer();
      this.currentPlayer = (this.currentPlayer++);
    });

    //Mouvements joueur
    //UP
    this.btnUp.addEventListener("click", () => {

      // Récupération de la méthode movePlayerUp dans une variable (class Player)
      const moveResult = this.players[this.currentPlayer].movePlayerUp(this.length);

      if (!moveResult && this.numberClick === 0) {
        alert("Impossible d'aller dans cette direction");
        return;
      }

      const currentId = this.players[this.currentPlayer].currentId;

      // Appel méthode blockingPlayer (class Controller)
      const result = this.blockingPlayer("haut");
      if (!result) {
        return;
      }

      // Verification joueur côte à côte -> appel de la méthode startFight (class Controller)
      this.startFight(currentId);

      // Appel méthode clickGestion (class Controller)
      this.clickGestion();

      // Vérification changement de joueur avant 3 click /rencontre d'un obstacle / sorti du plateau
      if ((this.numberClick === 1 || this.numberClick === 2) && (currentId < this.length ||
          listBloc[currentId - this.length].type === "obstacle")) {
        this.switchPlayer();
      }

      // Appel de la méthode render (class RenderElement)
      renderElement.render(this.ctx, this.length);
    });

    //DOWN
    this.btnDown.addEventListener("click", () => {

      // Récupération de la méthode currentIdMoveDown dans une variable (class Player)
      const moveResult = this.players[this.currentPlayer].movePlayerDown(this.length);

      if (!moveResult && this.numberClick === 0) {
        alert("Impossible d'aller dans cette direction");
        return;
      }

      const currentId = this.players[this.currentPlayer].currentId;

      // Appel méthode blockingPlayer (class Controller)
      const result = this.blockingPlayer("bas");
      if (!result) {
        return;
      }

      this.startFight(currentId);

      // Appel de la méthode clickGestion (class Controller)
      this.clickGestion();

      // Vérification changement de joueur avant 3 click /rencontre d'un obstacle / sorti du plateau
      if ((this.numberClick === 1 || this.numberClick === 2) && (currentId > this.length * this.length - this.length ||
          listBloc[currentId + this.length].type === "obstacle")) {
        this.switchPlayer();
      }

      // Appel de la méthode render (class RenderElement)
      renderElement.render(this.ctx, this.length);
    });

    //LEFT
    this.btnLeft.addEventListener("click", () => {

      // Récupération de la méthode currentIdMoveDown dans une variable (class Player)
      const moveResult = this.players[this.currentPlayer].movePlayerLeft(this.length);

      if (!moveResult && this.numberClick === 0) {
        alert("Impossible d'aller dans cette direction");
        return;
      }

      const currentId = this.players[this.currentPlayer].currentId;

      // Appel méthode blockingPlayer (class Controller)
      const result = this.blockingPlayer("gauche");
      if (!result) {
        return;
      }

      // Appel de la méthode clickGestion (class Controller)
      this.clickGestion();

      this.startFight(currentId);

      // Vérification changement de joueur avant 3 click /rencontre d'un obstacle / sorti du plateau
      if ((this.numberClick === 1 || this.numberClick === 2) && (currentId % 10 === 0 ||
          listBloc[currentId - 1].type === "obstacle")) {
        this.switchPlayer();
      }

      // Appel de la méthode render (class RenderElement)
      renderElement.render(this.ctx, this.length);
    });

    //RIGHT
    this.btnRight.addEventListener("click", () => {

      // Récupération de la méthode currentIdMoveRight dans une variable (class Player)
      const moveResult = this.players[this.currentPlayer].movePlayerRight(this.length);

      if (!moveResult && this.numberClick === 0) {
        alert("Impossible d'aller dans cette direction");
        return;
      }

      const currentId = this.players[this.currentPlayer].currentId;

      // Appel méthode blockingPlayer (class Controller)
      const result = this.blockingPlayer("droite");
      if (!result) {
        return;
      }

      // Appel de la méthode clickGestion (class Controller)
      this.clickGestion();

      this.startFight(currentId);

      // Vérification changement de joueur avant 3 click /rencontre d'un obstacle / sorti du plateau
      if ((this.numberClick === 1 || this.numberClick === 2) && (currentId % 10 === 9 ||
          listBloc[currentId + 1].type === "obstacle")) {
        this.switchPlayer();
      }

      // Appel de la méthode render (class RenderElement)
      renderElement.render(this.ctx, this.length);
    });
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

  //StartFight
  startFight(currentId) {
    let shouldFight = false;

    if (currentId > this.length) {
      if (listBloc[currentId - this.length].type.includes("player")) {
        shouldFight = true;
      }
    }

    if (currentId < this.length * this.length - this.length) {
      if (listBloc[currentId + this.length].type.includes("player")) {
        shouldFight = true;
      }
    }

    if (currentId % this.length !== 0) {
      if (listBloc[currentId - 1].type.includes("player")) {
        shouldFight = true;
      }
    }

    if (currentId % this.length !== this.length - 1) {
      if (listBloc[currentId + 1].type.includes("player")) {
        shouldFight = true;
      }
    }

    if (shouldFight) {
      //On fait disparaitre les flèches
      const controlGame = document.getElementById("play");
      controlGame.classList.add("display-none");

      this.players[this.currentPlayer];

      //Animation démarrage du combat
      let txtFight = document.getElementById("fight");
      txtFight.classList.add("fight-activate");

      const player1 = this.players[0];
      const player2 = this.players[1];
      const attackBtnP1 = document.getElementById("attack-btn-p1");
      const defenseBtnP1 = document.getElementById("defense-btn-p1");
      const attackBtnP2 = document.getElementById("attack-btn-p2");
      const defenseBtnP2 = document.getElementById("defense-btn-p2");
      const overlay = document.getElementById("overlay");
      const txtOverlay = document.getElementById("text-overlay");
      const imgOverlayP1 = document.getElementById("img-overlay-p1");
      const imgOverlayP2 = document.getElementById("img-overlay-p2");


      attackBtnP1.addEventListener("click", () => {
        if(this.currentPlayer === 1) {
          alert("C'est au joueur 2 de jouer.");
          return;
        }
        const hasLost = player2.handleDamage(player1.currentWeapon.damage);
        if(hasLost) {
          overlay.style.display = "flex";
          txtOverlay.innerHTML = "Le joueur 1 remporte la partie !";
          imgOverlayP1.src = "assets/img/display-p1.svg";
          imgOverlayP2.style.display = "none";
          return;
        }
        this.switchPlayer();
      });

      attackBtnP2.addEventListener("click", () => {
        if(this.currentPlayer === 0) {
          alert("C'est au joueur 1 de jouer.");
          return;
        }
        const hasLost = player1.handleDamage(player2.currentWeapon.damage);
        if(hasLost) {
          overlay.style.display = "flex";
          txtOverlay.innerHTML = "Le joueur 2 remporte la partie !";
          imgOverlayP2.src = "assets/img/display-p2.svg";
          imgOverlayP1.style.display = "none";
          return;
        }
        this.switchPlayer();
      });

      defenseBtnP1.addEventListener("click", () => {
        if(this.currentPlayer === 1) {
          alert("C'est au joueur 2 de jouer.");
          return;
        }
        player1.handleDefense();
        this.switchPlayer();
      });

      defenseBtnP2.addEventListener("click", () => {
        if(this.currentPlayer === 0) {
          alert("C'est au joueur 1 de jouer.");
          return;
        }
        player2.handleDefense();
        this.switchPlayer();
      });


    }
  }

  //blockingPlayer
  blockingPlayer(playerDirection) {

    if (this.numberClick === 0) {
      this.playerDirection = playerDirection;
    } else {
      if (this.playerDirection !== playerDirection) {
        alert("Vous n'avez pas le droit d'aller dans cette direction");
        return false;
      }
    }
    return true;
  }

  //Modal
  displayModal() {
    //Modal
    const modal = document.getElementById("myModal");
    const btnShowRule = document.getElementById("btn-show-rule");
    const span = document.getElementsByClassName("close")[0];

    btnShowRule.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    span.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    });
  }
}
