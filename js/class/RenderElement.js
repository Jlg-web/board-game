class RenderElement {

    //Methode render : 
    //- On parcours l'ensemble du plateau
    //- on crée une image puis on récupère la source (image.src)
    //- On écoute l'evenement (load) puis on éxecute une fonction au chargement de la page : On dessine une image (ctx.drawimage)
    render(ctx, length) {

        for (let i = 0; i < length * length; i++) {
            let element = new Image();
            element.src = this.getImageSrc("casevide");
            element.addEventListener("load", () => {
                ctx.drawImage(element, listBloc[i].positionX, listBloc[i].positionY);
            }, false);
        }

        for (let i = 0; i < length * length; i++) {
            let element = new Image();
            element.src = this.getImageSrc(listBloc[i].type);
            element.addEventListener("load", () => {
                ctx.drawImage(element, listBloc[i].positionX, listBloc[i].positionY);
            }, false);
        }
        
    }

    //Methode getImageSrc : 
    //- Permet de récuperer la source de l'image
    getImageSrc(type) {
        if (type === "casevide") {
            return "assets/img/tiles-1.jpg";
        }
        if(type === "obstacle") {
            return "assets/img/obstacle.png";
        }
        if(type === "weapon1") {
            return "assets/img/weapon-1.png";
        }
        if(type === "weapon2") {
            return "assets/img/weapon-2.png";
        }
        if(type === "weapon3") {
            return "assets/img/weapon-3.png";
        }
        if(type === "weapon4") {
            return "assets/img/weapon-4.png";
        }
        if(type === "player1") {
            return "assets/img/player-1.jpg";
        }
        if(type === "player2") {
            return "assets/img/player-2.jpg";
        }
        console.log(type)
    }

}