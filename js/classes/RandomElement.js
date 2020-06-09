class RandomElement {

    constructor(length) {
        this.length = length;
    }

    randomNumber() {
        return Math.floor(Math.random() * (this.length * this.length - 1));
    }

    idElement(recupId) {
        for (let i = 0; i < this.length * this.length; i++) {
            if (listBloc[i].type === `${recupId}`) {
                return (listBloc[i].id);
            }
        }
    }

    typeBlock(numberElement, type) {
        let counter = 0;
        while (counter < numberElement) {
            const numberRandomBloc = this.randomNumber(this.length);

            if (listBloc[numberRandomBloc].type === "casevide") {
                listBloc[numberRandomBloc].type = type;
                counter++;
            }
        }
    }

    // drawBlock(type, imageSrc, ctx) {
    //     for (let i = 0; i < this.length * this.length; i++) {
    //         if (listBloc[i].type === type) {
    //             let canvas = new Image();
    //             canvas.src = imageSrc;
    //             canvas.addEventListener('load', function () {
    //                 ctx.drawImage(canvas, listBloc[i].positionX, listBloc[i].positionY);
    //             }, false);
    //         }
    //     }
    // }

    render(ctx) {
        // console.log(listBloc)
        for (let i = 0; i < this.length * this.length; i++) {
            let canvas = new Image();
            canvas.src = this.getImageSrc(listBloc[i].type);
            console.log(canvas);
            canvas.addEventListener('load', function () {
                ctx.drawImage(canvas, listBloc[i].positionX, listBloc[i].positionY);
            }, false);
            
        }
    }

    getImageSrc(type) {
        if(type === "casevide") {
            return "assets/img/tiles-1.jpg"; 
        }
        if(type === "obstacle") {
            return "assets/img/tiles-2.png";
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
    }

}