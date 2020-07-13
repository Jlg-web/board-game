class Player {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.currentId = -1;
        this.previousWeapon = -1;
        this.currentWeapon = 1;
        this.nameWeaponP1 = document.getElementById("name-weapon-p1");
        this.nameWeaponP2 = document.getElementById("name-weapon-p2");
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
        if (this.previousWeapon !== -1) {
            listBloc[this.currentId].type = `weapon${this.previousWeapon}`;
            this.previousWeapon = -1;
        }

        // Vérification type d'arme
        if (listBloc[this.currentId - length].type.includes("weapon")) {

            this.previousWeapon = this.currentWeapon;

            if (listBloc[this.currentId - length].type === "weapon1") {
                this.currentWeapon = 1;

                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "lance-pierre";
                } else {
                    this.nameWeaponP2.innerHTML = "lance-pierre";
                }
            }

            if (listBloc[this.currentId - length].type === "weapon2") {
                this.currentWeapon = 2;

                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Masse";
                } else {
                    this.nameWeaponP2.innerHTML = "Masse";
                }
            }

            if (listBloc[this.currentId - length].type === "weapon3") {
                this.currentWeapon = 3;

                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Arc";
                } else {
                    this.nameWeaponP2.innerHTML = "Arc";
                }
            }

            if (listBloc[this.currentId - length].type === "weapon4") {
                this.currentWeapon = 4;

                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Pistolet-laser";
                } else {
                    this.nameWeaponP2.innerHTML = "Pistolet-laser";
                }

            }
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
        if (this.previousWeapon !== -1) {
            listBloc[this.currentId].type = `weapon${this.previousWeapon}`;
            this.previousWeapon = -1;
        }

        // Vérification type d'arme
        if (listBloc[this.currentId + length].type.includes("weapon")) {

            this.previousWeapon = this.currentWeapon;

            if (listBloc[this.currentId + length].type === "weapon1") {
                this.currentWeapon = 1;
                console.log("lance-pierre");

                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "lance-pierre";
                } else {
                    this.nameWeaponP2.innerHTML = "lance-pierre";
                }
            }

            if (listBloc[this.currentId + length].type === "weapon2") {
                this.currentWeapon = 2;
                console.log("masse");

                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Masse";
                } else {
                    this.nameWeaponP2.innerHTML = "Masse";
                }
            }

            if (listBloc[this.currentId + length].type === "weapon3") {
                this.currentWeapon = 3;
                console.log("arc");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Arc";
                } else {
                    this.nameWeaponP2.innerHTML = "Arc";
                }
            }

            if (listBloc[this.currentId + length].type === "weapon4") {
                this.currentWeapon = 4;
                console.log("pistolet laser");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Pistolet-laser";
                } else {
                    this.nameWeaponP2.innerHTML = "Pistolet-laser";
                }
            }
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
        if (this.previousWeapon !== -1) {
            listBloc[this.currentId].type = `weapon${this.previousWeapon}`;
            this.previousWeapon = -1;
        }

        // Vérif type d'arme
        if (listBloc[this.currentId - 1].type.includes("weapon")) {

            this.previousWeapon = this.currentWeapon;

            if (listBloc[this.currentId - 1].type === "weapon1") {
                this.currentWeapon = 1;
                console.log("lance-pierre");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "lance-pierre";
                } else {
                    this.nameWeaponP2.innerHTML = "lance-pierre";
                }
            }

            if (listBloc[this.currentId - 1].type === "weapon2") {
                this.currentWeapon = 2;
                console.log("masse");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Masse";
                } else {
                    this.nameWeaponP2.innerHTML = "Masse";
                }
            }

            if (listBloc[this.currentId - 1].type === "weapon3") {
                this.currentWeapon = 3;
                console.log("arc");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Arc";
                } else {
                    this.nameWeaponP2.innerHTML = "Arc";
                }
            }

            if (listBloc[this.currentId - 1].type === "weapon4") {
                this.currentWeapon = 4;
                console.log("pistolet laser");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Pistolet-laser";
                } else {
                    this.nameWeaponP2.innerHTML = "Pistolet-laser";
                }
            }
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
        if (this.previousWeapon !== -1) {
            listBloc[this.currentId].type = `weapon${this.previousWeapon}`;
            this.previousWeapon = -1;
        }

        //Vérification type d'arme
        if (listBloc[this.currentId + 1].type.includes("weapon")) {

            this.previousWeapon = this.currentWeapon;

            if (listBloc[this.currentId + 1].type === "weapon1") {
                this.currentWeapon = 1;
                console.log("lance-pierre");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "lance-pierre";
                } else {
                    this.nameWeaponP2.innerHTML = "lance-pierre";
                }
            }

            if (listBloc[this.currentId + 1].type === "weapon2") {
                this.currentWeapon = 2;
                console.log("masse");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Masse";
                } else {
                    this.nameWeaponP2.innerHTML = "Masse";
                }
            }

            if (listBloc[this.currentId + 1].type === "weapon3") {
                this.currentWeapon = 3;
                console.log("arc");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Arc";
                } else {
                    this.nameWeaponP2.innerHTML = "Arc";
                }
            }

            if (listBloc[this.currentId + 1].type === "weapon4") {
                this.currentWeapon = 4;
                console.log("pistolet laser");
                if (this.id === 1) {
                    this.nameWeaponP1.innerHTML = "Pistolet-laser";
                } else {
                    this.nameWeaponP2.innerHTML = "Pistolet-laser";
                }
            }
        }

        // Action de déplacement
        this.currentId += 1;
        listBloc[this.currentId].type = `player${this.id}`;

        return this.currentId;
    }

    fight() {

        // //Combat test
        // // Attaque
        // this.attackBtnP1.addEventListener("click", () => {

        //     //Si arme = lance-pierre
        //     if(this.nameWeaponP1 === "lance-pierre") {
        //         this.lifePointP2.innerHTML -= 10;
        //         console.log(this.lifePointP2);
        //     }
        //     //Si arme = masse (this.lifePointP2.innerHTML -= 20;)
        //     //Si arme = Arc (this.lifePointP2.innerHTML -= 30;)
        //     //Si pistolet-laser = Arc (this.lifePointP2.innerHTML -= 50;)
        // });

        // this.attackBtnP2.addEventListener("click", () => {
        //     //Si arme = lance-pierre
        //     this.lifePointP1.innerHTML -= 10;
        //     console.log(this.lifePointP1);
        //     //Si arme = masse (this.lifePointP1.innerHTML -= 20;)
        //     //Si arme = Arc (this.lifePointP1.innerHTML -= 30;)
        //     //Si pistolet-laser = Arc (this.lifePointP1.innerHTML -= 50;)
        // });

        // // //Defense
        // this.defenseBtnP1.addEventListener("click", () => {
        //     this.lifePointP1.innerHTML ++;
        // });

        // this.defenseBtnP2.addEventListener("click", () => {
        //     this.lifePointP2.innerHTML ++;
        // });
        // //end Combat test

    }

}