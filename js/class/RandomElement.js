class RandomElement {

    constructor(length) {
        this.length = length;
        this.numberClick = 0;
        this.current_player = 0;
    }

    idElement(recupId) {
        for (let i = 0; i < this.length * this.length; i++) {
            if (listBloc[i].type === `${recupId}`) {
                return (listBloc[i].id);
            }
        }
    }

    randomNumber() {
        return Math.floor(Math.random() * (this.length * this.length - 1));
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

}