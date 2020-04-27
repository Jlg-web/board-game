class RandomElement {

    randomNumber() {
        return Math.floor(Math.random() * (numberBloc - 1));
    }

    idElement(recupId) {
        for (let i = 0; i < numberBloc; i++) {
            if (listBloc[i].type === `${recupId}`) {
                return (listBloc[i].id);
            }
        }
    }

    typeBlock(numberElement, type) {
        let counter = 0;
        while (counter < numberElement) {
            const numberRandomBloc = this.randomNumber();
            if (listBloc[numberRandomBloc].type === "casevide") {
                listBloc[numberRandomBloc].type = type;
                counter++;
            }
        }
    }

    drawBlock(type, imageSrc) {
        for (let i = 0; i < numberBloc; i++) {
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

