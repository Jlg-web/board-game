class Player {

    constructor(id, name) {
        this.name = name;
        this.currentWeapon = 1;
        this.previousWeapon = -1;
        this.level = 10;
        this.currentId = -1;
        this.id = id;
    }

    /******  CREATION DES JOUEURS *******/
    //CreatePlayer
    createPlayer(playerNumber, length) {

        let randomElement = new RandomElement(length);
        randomElement.typeBlock(1, `player${playerNumber}`);

        this.currentId = randomElement.idElement(`player${playerNumber}`);

        /* Création de la variable playerIsValid */
        let playerIdIsValid = false;

        /* Vérification des joeurs côte à côte */
        while (!playerIdIsValid) {

            /* On assigne la variable playerIdIsValid à true */
            playerIdIsValid = true;

            /* 
            - SI idPlayer est suppérieur à 10 (true) 
            - On entre dans la deuxième condition et la valeur de playerIsValid vaut false seulement SI le joueur se trouve 10 cases avant la position de l'autre joueur
            - SINON playerIsValid vaut true
            */
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

            /* Si différent de playerIdIsValid, on crée le joueur */
            if (!playerIdIsValid) {
                listBloc[this.currentId].type = "casevide";
                randomElement.typeBlock(1, `player${playerNumber}`);
                this.currentId = randomElement.idElement(`player${playerNumber}`);
            }
        }
    }

    /******  MOUVEMENT DES JOUEURS *******/
    //MovePlayerUp
    movePlayerUp(length, ctx, designPlayers) {

        /*********************************************************
        /***** BLOQUAGE DU JOUEUR DANS CERTAINES CONDITIONS *****/
        /*********************************************************/
        if (this.currentId - length < 0 || listBloc[this.currentId - length].type === "obstacle") {
            return;
        }

        /**************************************************************************
        /*****  CREATION D'UNE CASE DE BASE DU PLATEAU LORS DU DÉPLACEMENT *****/
        /**************************************************************************/
        listBloc[this.currentId].type = "casevide";

        /****************************************************************************************
        /***** PERMET DE DEPOSER L'ARME PRECEDENTE DU JOUEUR QUAND IL SORT DE LA CASE ARME  *****/
        /****************************************************************************************/

        if (this.previousWeapon !== -1) {
            listBloc[this.currentId].type = `weapon${this.previousWeapon}`;
            this.previousWeapon = -1;
        }

        /****************************************************************
        /***** PERMET DE FAIRE DES VERIFICATIONS SUR LE TYPE D'ARME *****/
        /****************************************************************/

        if (listBloc[this.currentId - length].type.includes("weapon")) {

            this.previousWeapon = this.currentWeapon;

            if (listBloc[this.currentId - length].type === "weapon1") {
                this.currentWeapon = 1;
            }

            if (listBloc[this.currentId - length].type === "weapon2") {
                this.currentWeapon = 2;
            }

            if (listBloc[this.currentId - length].type === "weapon3") {
                this.currentWeapon = 3;
            }

            if (listBloc[this.currentId - length].type === "weapon4") {
                this.currentWeapon = 4;
            }
        }

        /***********************************************************************************************************
        /***** ACTION DE DEPLACEMENT DU JOUEUR VERS LE HAUT, CREATION D'UNE IMAGE PLAYER A CHAQUE DEPLACEMENT *****/
        /**********************************************************************************************************/
        this.currentId = this.currentId - length;
        listBloc[this.currentId].type = `player${this.id}`;

        return this.currentId;
    }

    //MovePlayerRight
    movePlayerRight(ctx, designPlayers) {

        /*********************************************************
        /***** BLOQUAGE DU JOUEUR DANS CERTAINES CONDITIONS *****/
        /*********************************************************/

        //Si currentId % 10 == 0 alors on bloque l'avancé du joueur
        if ((this.currentId + 1) % 10 === 0 || listBloc[this.currentId + 1].type === "obstacle") {
            console.log("Obstacle");
            return;
        }

        /**************************************************************************
        /***** 1 - CREATION D'UNE CASE DE BASE DU PLATEAU LORS DU DÉPLACEMENT *****/
        /**************************************************************************/
        listBloc[this.currentId].type = "casevide";

        /****************************************************************************************
        /***** 2 - PERMET DE DEPOSER L'ARME PRECEDENTE DU JOUEUR QUAND IL SORT DE LA CASE ARME  *****/
        /****************************************************************************************/

        if (this.previousWeapon !== -1) {
            listBloc[this.currentId].type = `weapon${this.previousWeapon}`;
            this.previousWeapon = -1;
        }

        /****************************************************************
        /***** PERMET DE FAIRE DES VERIFICATIONS SUR LE TYPE D'ARME *****/
        /****************************************************************/

        if (listBloc[this.currentId + 1].type.includes("weapon")) {

            this.previousWeapon = this.currentWeapon;

            if (listBloc[this.currentId - length].type === "weapon1") {
                this.currentWeapon = 1;
            }

            if (listBloc[this.currentId - length].type === "weapon2") {
                this.currentWeapon = 2;
            }

            if (listBloc[this.currentId - length].type === "weapon3") {
                this.currentWeapon = 3;
            }

            if (listBloc[this.currentId - length].type === "weapon4") {
                this.currentWeapon = 4;
            }
        }

        /***********************************************************************************************************
        /***** ACTION DE DEPLACEMENT DU JOUEUR VERS LE HAUT, CREATION D'UNE IMAGE PLAYER A CHAQUE DEPLACEMENT *****/
        /**********************************************************************************************************/

        this.currentId += 1;
        listBloc[this.currentId].type = `player${this.id}`;
        return this.currentId;

    }

    //MovePlayerDown
    movePlayerDown(length, ctx, designPlayers) {

        /*********************************************************
        /***** BLOQUAGE DU JOUEUR DANS CERTAINES CONDITIONS *****/
        /*********************************************************/

        //Si currentId > length * length (total des cases du plateau) alors on bloque l'avancé du joueur
        if (this.currentId + length > length * length || listBloc[this.currentId + length].type === "obstacle") {
            console.log("Obstacle");
            return;
        }

        /**************************************************************************
        /***** 1 - CREATION D'UNE CASE DE BASE DU PLATEAU LORS DU DÉPLACEMENT *****/
        /**************************************************************************/
        listBloc[this.currentId].type = "casevide";

        /****************************************************************************************
        /***** 2 - PERMET DE DEPOSER L'ARME PRECEDENTE DU JOUEUR QUAND IL SORT DE LA CASE ARME  *****/
        /****************************************************************************************/

        if (this.previousWeapon !== -1) {
            listBloc[this.currentId].type = `weapon${this.previousWeapon}`;
            this.previousWeapon = -1;
        }

        /****************************************************************
        /***** PERMET DE FAIRE DES VERIFICATIONS SUR LE TYPE D'ARME *****/
        /****************************************************************/

        if (listBloc[this.currentId + length].type.includes("weapon")) {

            this.previousWeapon = this.currentWeapon;

            if (listBloc[this.currentId - length].type === "weapon1") {
                this.currentWeapon = 1;
            }

            if (listBloc[this.currentId - length].type === "weapon2") {
                this.currentWeapon = 2;
            }

            if (listBloc[this.currentId - length].type === "weapon3") {
                this.currentWeapon = 3;
            }

            if (listBloc[this.currentId - length].type === "weapon4") {
                this.currentWeapon = 4;
            }
        }

        /***********************************************************************************************************
        /***** ACTION DE DEPLACEMENT DU JOUEUR VERS LE HAUT, CREATION D'UNE IMAGE PLAYER A CHAQUE DEPLACEMENT *****/
        /**********************************************************************************************************/

        this.currentId += length;
        listBloc[this.currentId].type = `player${this.id}`;
        return this.currentId;
    }

    //MovePlayerLeft
    movePlayerLeft(ctx, designPlayers) {


        /*********************************************************
        /***** BLOQUAGE DU JOUEUR DANS CERTAINES CONDITIONS *****/
        /*********************************************************/

        //currentId % 10 == 9 alors on bloque l'avancé du joueur
        if (this.currentId === 0 || (this.currentId - 1) % 10 === 9 || listBloc[this.currentId - 1].type === "obstacle") {
            console.log("Obstacle");
            return;
        }

        /**************************************************************************
        /***** 1 - CREATION D'UNE CASE DE BASE DU PLATEAU LORS DU DÉPLACEMENT *****/
        /**************************************************************************/
        listBloc[this.currentId].type = "casevide";

        /****************************************************************************************
        /***** 2 - PERMET DE DEPOSER L'ARME PRECEDENTE DU JOUEUR QUAND IL SORT DE LA CASE ARME  *****/
        /****************************************************************************************/

        if (this.previousWeapon !== -1) {
            listBloc[this.currentId].type = `weapon${this.previousWeapon}`;
            this.previousWeapon = -1;
        }

        /****************************************************************
        /***** PERMET DE FAIRE DES VERIFICATIONS SUR LE TYPE D'ARME *****/
        /****************************************************************/

        if (listBloc[this.currentId - 1].type.includes("weapon")) {

            this.previousWeapon = this.currentWeapon;

            if (listBloc[this.currentId - length].type === "weapon1") {
                this.currentWeapon = 1;
            }

            if (listBloc[this.currentId - length].type === "weapon2") {
                this.currentWeapon = 2;
            }

            if (listBloc[this.currentId - length].type === "weapon3") {
                this.currentWeapon = 3;
            }

            if (listBloc[this.currentId - length].type === "weapon4") {
                this.currentWeapon = 4;
            }
        }

        /***********************************************************************************************************
        /***** ACTION DE DEPLACEMENT DU JOUEUR VERS LE HAUT, CREATION D'UNE IMAGE PLAYER A CHAQUE DEPLACEMENT *****/
        /**********************************************************************************************************/

        this.currentId -= 1;
        listBloc[this.currentId].type = `player${this.id}`;
        return this.currentId;

    }
}