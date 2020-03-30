
const canvas = document.getElementById('plateau');
const ctx = canvas.getContext('2d');
console.log(ctx);
const widthMax = canvas.width;
const heightMax = canvas.height;
const sizeBloc = 60;
const numberBlocWidth = widthMax / sizeBloc;
const numberBlocHeight = heightMax / sizeBloc;
const numberBloc = numberBlocWidth * numberBlocHeight;
const listBloc = [];

let controller = new Controller();
controller.init();
