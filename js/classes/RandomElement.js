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

    drawBlock(type, imageSrc, ctx) {
        for (let i = 0; i < this.length * this.length; i++) {
            if (listBloc[i].type === type) {
                let canvas = new Image();
                canvas.src = imageSrc;
                canvas.addEventListener('load', function () {
                    ctx.drawImage(canvas, listBloc[i].positionX, listBloc[i].positionY);
                }, false);
            }
        }
    }
    
}

