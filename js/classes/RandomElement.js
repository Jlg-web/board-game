class RandomElement {

    constructor(length) {
        this.length = length;
        this.numberClick = 0;
        this.current_player = 0;
        this.boardPlayer1 = document.getElementById("p1");
        this.boardPlayer2 = document.getElementById("p2");
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

    render(ctx) {
        // console.log(listBloc)
        for (let i = 0; i < this.length * this.length; i++) {
            let image = new Image();
            image.src = this.getImageSrc(listBloc[i].type);
            console.log(image);
            image.addEventListener('load', function () {
                ctx.drawImage(image, listBloc[i].positionX, listBloc[i].positionY);
            }, false);
        }
    }

    getImageSrc(type) {
        if (type === "casevide") {
            return "assets/img/tiles-1.jpg";
        }
        if (type === "obstacle") {
            return "assets/img/tiles-2.png";
        }
        if (type === "weapon1") {
            return "assets/img/weapon-1.png";
        }
        if (type === "weapon2") {
            return "assets/img/weapon-2.png";
        }
        if (type === "weapon3") {
            return "assets/img/weapon-3.png";
        }
        if (type === "weapon4") {
            return "assets/img/weapon-4.png";
        }
        if (type === "player1") {
            return "assets/img/player-1.jpg";
        }
        if (type === "player2") {
            return "assets/img/player-2.jpg";
        }
    }

    switchPlayer() {

        let self = this;    
        let nextBtn = document.getElementById("next-btn");

        nextBtn.addEventListener("click", function () {
            this.numberClick = 0;

            if (this.current_player == 0) {
                this.current_player = 1;
                self.boardPlayer2.classList.add("whatPlayer");
                self.boardPlayer1.classList.remove("whatPlayer");
            } else {
                this.current_player = 0;
                self.boardPlayer1.classList.add("whatPlayer");
                self.boardPlayer2.classList.remove("whatPlayer");
            }
            this.current_player = (this.current_player++);
        });

    }

    SelectOriginPlayer() {

        let self = this;  

        if (this.current_player == 0) {
           self.boardPlayer1.classList.add("whatPlayer");
        } else {
            self.boardPlayer2.classList.add("whatPlayer");
        }

    }

}