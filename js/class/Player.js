class Player {

  constructor(id, name, sante) {
    this.id = id;
    this.name = name;
    this.sante = sante;
    this.cible = "";
    this.currentId = -1;
    this.previousWeaponId = -1;
    this.currentWeapon = new Weapon(1, "sword", 10);
    this.nameWeaponP1 = document.getElementById("name-weapon-p1");
    this.nameWeaponP2 = document.getElementById("name-weapon-p2");
    this.lifePoint = document.getElementById(`life-point-p${id}`);
    this.score = 100;
    this.hasDefense = false;

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
      return false;
    }

    listBloc[this.currentId].type = "casevide";

    // Dépose l'arme précédente
    if (this.previousWeaponId !== -1) {
      listBloc[this.currentId].type = `weapon${this.previousWeaponId}`;
      this.previousWeaponId = -1;
    }

    // Vérification type d'arme
    if (listBloc[this.currentId - length].type.includes("weapon")) {
      this.manageWeapon(listBloc[this.currentId - length].type);
    }

    // Action de déplacement
    this.currentId = this.currentId - length;
    listBloc[this.currentId].type = `player${this.id}`;

    return true;
  }

  movePlayerDown(length) {

    if (this.currentId + length > length * length - 1 || listBloc[this.currentId + length].type === "obstacle") {
      return false;
    }

    listBloc[this.currentId].type = "casevide";

    // Dépose l'arme précédente
    if (this.previousWeaponId !== -1) {
      listBloc[this.currentId].type = `weapon${this.previousWeaponId}`;
      this.previousWeaponId = -1;
    }

    // Vérification type d'arme
    if (listBloc[this.currentId + length].type.includes("weapon")) {
      this.manageWeapon(listBloc[this.currentId + length].type);
    }

    // Action de déplacement
    this.currentId += length;
    listBloc[this.currentId].type = `player${this.id}`;

    return true;
  }

  movePlayerLeft() {
    if (this.currentId === 0 || (this.currentId - 1) % 10 === 9 || listBloc[this.currentId - 1].type === "obstacle") {
      return false;
    }
    listBloc[this.currentId].type = "casevide";

    // dépose arme précédente
    if (this.previousWeaponId !== -1) {
      listBloc[this.currentId].type = `weapon${this.previousWeaponId}`;
      this.previousWeaponId = -1;
    }

    // Vérif type d'arme
    if (listBloc[this.currentId - 1].type.includes("weapon")) {
      this.manageWeapon(listBloc[this.currentId - 1].type);
    }

    // Action de déplacement
    this.currentId -= 1;
    listBloc[this.currentId].type = `player${this.id}`;

    return true;
  }

  movePlayerRight() {
    if ((this.currentId + 1) % 10 === 0 || listBloc[this.currentId + 1].type === "obstacle") {
      return false;
    }
    listBloc[this.currentId].type = "casevide";

    // Dépose l'arme précédente
    if (this.previousWeaponId !== -1) {
      listBloc[this.currentId].type = `weapon${this.previousWeaponId}`;
      this.previousWeaponId = -1;
    }

    //Vérification type d'arme
    if (listBloc[this.currentId + 1].type.includes("weapon")) {
      this.manageWeapon(listBloc[this.currentId + 1].type);
    }

    // Action de déplacement
    this.currentId += 1;
    listBloc[this.currentId].type = `player${this.id}`;

    return true;
  }

  manageWeapon(weaponType) {
    this.previousWeaponId = this.currentWeapon.weaponType;

    if (weaponType === "weapon1") {
      this.currentWeapon = new Weapon(1, "Epée", 10);
    }

    if (weaponType === "weapon2") {
      this.currentWeapon = new Weapon(2, "Arbalete", 20);
    }

    if (weaponType === "weapon3") {
      this.currentWeapon = new Weapon(3, "Masse", 30);
    }

    if (weaponType === "weapon4") {
      this.currentWeapon = new Weapon(4, "Poison", 50);
    }

    if (this.id === 1) {
      this.nameWeaponP1.innerHTML = this.currentWeapon.name;
    } else {
      this.nameWeaponP2.innerHTML = this.currentWeapon.name;
    }
  }

  // ******************* FIGHT ****************** //
  handleDamage(damage) {

    if(this.hasDefense) {
      this.score = this.score - damage / 2;
      this.hasDefense = false;
    } else {
      this.score = this.score - damage;
    }

    this.lifePoint.innerHTML = this.score;
    if(this.score === 0) {
      return true;
    }
    return false;
  }

  handleDefense() {
    this.hasDefense = true;
  }

}
