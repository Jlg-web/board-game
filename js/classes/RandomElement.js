class RandomElement {

    //Fonction aléatoire
    randomNumber() {
        return Math.floor(Math.random() * (numberBloc - 1));
    }

    createObstacle() {
        //Constante nombre d'obstacles
        const numberObstacle = 12;

        //Boucle qui parcours les obstacles 
        for (let i = 0; i < numberObstacle; i++) {
            const numberRandomBloc = this.randomNumber();
            if (listBloc[numberRandomBloc].id !== "casevide") {
                i--;
            } else {
                listBloc[numberRandomBloc].id = "obstacle";
            }
        }

        //Vérification de l'id et création du style de la case
        for (let i = 0; i < numberBloc; i++) {
            (function (i) {
                if (listBloc[i].id === "obstacle") {
                    let canvas = new Image();
                    canvas.src = "assets/img/tiles-2.png";
                    canvas.addEventListener('load', function () {
                        ctx.drawImage(canvas, listBloc[i].positionX, listBloc[i].positionY);
                    }, false);
                }
            })(i);
        }
    }

    createWeapon() {
        const numberWeapon = 4;
        for (let i = 0; i < numberWeapon; i++) {
            const numberWeaponBloc = this.randomNumber();
            if (listBloc[numberWeaponBloc].id !== "casevide") {
                i--;
            } else {
                listBloc[numberWeaponBloc].id = "arme";
            }
        }

        for (let i = 0; i < numberBloc; i++) {
            (function (i) {
                if (listBloc[i].id === "arme") {
                    let canvas = new Image();
                    canvas.src = "assets/img/tiles-3.png";
                    canvas.addEventListener('load', function () {
                        ctx.drawImage(canvas, listBloc[i].positionX, listBloc[i].positionY);
                    }, false);
                }
            })(i);
        }
    }

}