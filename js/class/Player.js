class Player {

  constructor(id, name, sante, degat, actionType) {
    this.id = id;
    this.name = name;
    this.sante = sante;
    this.degat = degat;
    this.actionType = actionType;
    this.cible = "";
    this.currentId = -1;
    this.previousWeaponId = -1;
    this.nameWeaponP1 = document.getElementById("name-weapon-p1");
    this.nameWeaponP2 = document.getElementById("name-weapon-p2");
    this.currentWeapon = new Weapon(1, "lance-pierre", 10);
    this.lifePointP1 = document.getElementById("life-point-p1");
    this.lifePointP2 = document.getElementById("life-point-p2");
    this.attackBtnP1 = document.getElementById("attack-btn-p1");
    this.defenseBtnP1 = document.getElementById("defense-btn-p1");
    this.attackBtnP2 = document.getElementById("attack-btn-p2");
    this.defenseBtnP2 = document.getElementById("defense-btn-p2");
  }

  createPlayer(length, playerNumber) {

    let randomElement = new RandomElement(length);
    randomElement.typeBlock(1, `player${playerNumber}`);
    this.currentId = randomElement.idElement(`player${playerNumber}`);
    let playerIdIsValid = false;

    while (!playerIdIsValid) {

      playerIdIsValid = true;

      if (this.currentId > length) {
        if (listBloc[this.currentId - length].type.includes("player")) {
          playerIdIsValid = false;
        }
      }

      if (this.currentId < length * length - length) {
        if (listBloc[this.currentId + length].type.includes("player")) {
          playerIdIsValid = false;
        }
      }

      if (this.currentId % length !== 0) {
        if (listBloc[this.currentId - 1].type.includes("player")) {
          playerIdIsValid = false;
        }
      }

      if (this.currentId % length !== length - 1) {
        if (listBloc[this.currentId + 1].type.includes("player")) {
          playerIdIsValid = false;
        }
      }

      if (!playerIdIsValid) {
        listBloc[this.currentId].type = "casevide";
        randomElement.typeBlock(1, `player${playerNumber}`);
        this.currentId = randomElement.idElement(`player${playerNumber}`);
      }

    }
  }

  //Methodes mouvement du joueur
  movePlayerUp(length) {

    if (this.currentId - length < 0 || listBloc[this.currentId - length].type === "obstacle") {
      return;
    }

    listBloc[this.currentId].type = "casevide";

    // Dépose l'arme précédente
    if (this.previousWeaponId !== -1) {
      listBloc[this.currentId].type = `weapon${this.previousWeaponId}`;
      this.previousWeaponId = -1;
    }

    // Vérification type d'arme
    if(listBloc[this.currentId - length].type.includes("weapon")) {
      this.manageWeapon(listBloc[this.currentId - length].type);
    }

    // Action de déplacement
    this.currentId = this.currentId - length;
    listBloc[this.currentId].type = `player${this.id}`;

    return this.currentId;
  }

  movePlayerDown(length) {
    if (this.currentId + length > length * length || listBloc[this.currentId + length].type === "obstacle") {
      return;
    }
    listBloc[this.currentId].type = "casevide";

    // Dépose l'arme précédente
    if (this.previousWeaponId !== -1) {
      listBloc[this.currentId].type = `weapon${this.previousWeaponId}`;
      this.previousWeaponId = -1;
    }

    // Vérification type d'arme
    if(listBloc[this.currentId + length].type.includes("weapon")) {
      this.manageWeapon(listBloc[this.currentId + length].type);
    }

    // Action de déplacement
    this.currentId += length;
    listBloc[this.currentId].type = `player${this.id}`;

    return this.currentId;
  }

  movePlayerLeft() {
    if (this.currentId === 0 || (this.currentId - 1) % 10 === 9 || listBloc[this.currentId - 1].type === "obstacle") {
      return;
    }
    listBloc[this.currentId].type = "casevide";

    // dépose arme précédente
    if (this.previousWeaponId !== -1) {
      listBloc[this.currentId].type = `weapon${this.previousWeaponId}`;
      this.previousWeaponId = -1;
    }

    // Vérif type d'arme
    if(listBloc[this.currentId - 1].type.includes("weapon")) {
      this.manageWeapon(listBloc[this.currentId - 1].type);
    }

    // Action de déplacement
    this.currentId -= 1;
    listBloc[this.currentId].type = `player${this.id}`;

    return this.currentId;
  }


  movePlayerRight() {
    if ((this.currentId + 1) % 10 === 0 || listBloc[this.currentId + 1].type === "obstacle") {
      return;
    }
    listBloc[this.currentId].type = "casevide";

    // Dépose l'arme précédente
    if (this.previousWeaponId !== -1) {
      listBloc[this.currentId].type = `weapon${this.previousWeaponId}`;
      this.previousWeaponId = -1;
    }

    //Vérification type d'arme
    if(listBloc[this.currentId + 1].type.includes("weapon")) {

      this.manageWeapon(listBloc[this.currentId + 1].type);
    }

    // Action de déplacement
    this.currentId += 1;
    listBloc[this.currentId].type = `player${this.id}`;

    console.log(listBloc[this.currentId]);
    console.log(listBloc[this.currentId - 1]);

    return this.currentId;
  }
  



  manageWeapon(weaponType) {

      this.previousWeaponId = this.currentWeapon.weaponType;

      if (weaponType === "weapon1") {
        this.currentWeapon = new Weapon(1, "Lance-pierre", 10);
      }

      if (weaponType === "weapon2") {
        this.currentWeapon = new Weapon(2, "Masse", 20);
      }

      if (weaponType === "weapon3") {
        this.currentWeapon = new Weapon(3, "Arc", 30);
      }

      if (weaponType === "weapon4") {
        this.currentWeapon = new Weapon(4, "Pistolet-laser", 50);
      }

      if (this.id === 1) {
        this.nameWeaponP1.innerHTML = this.currentWeapon.name;
      } else {
        this.nameWeaponP2.innerHTML = this.currentWeapon.name;
      }
  }

// ******************* FIGHT ****************** //
  fightGestion(player1, player2, currentPlayer) {

    //Detection du joueur
    if(currentPlayer == perso1) {
      this.cible = player2;
    } else if(currentPlayer == perso2) {
      this.cible = player1;
    }

    while (this.cible.sante > 0 && currentPlayer.sante > 0) {
      //ATTAQUE
      this.fightAttack();
      //DEFENSE
      this.fightDefense();
    }
  }

  fightAttack() {

  }

  fightDefense() {

  }
// ******************* END FIGHT ******************* //


}
