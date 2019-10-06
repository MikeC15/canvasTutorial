//Canvas resize lesson
console.log("Linked.")


//creates canvas and size it to screen size
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

//draw RECTANGLE
// c.fillRect(x, y, width, height);
//fill before each shape to individually color
// GOOD RECT CODE
// c.fillStyle = "rgba(255, 0 ,0 , .5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0 , .5)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, .5)";
// c.fillRect(300, 300, 100, 100);


// console.log(canvas);


//draw LINES
//move to takes x and y coordinate
// c.moveTo(x, y);
//add more c.lineTo() to continue tmoving the line
// adding color to lines or shapes, add before stroke
//need to call stroke method to actually see it
// GOOD LINE CODE
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = "blue";
// c.stroke();


//draw ARC/ CIRCLE
// c.arc(x: Int, y: Int, r: Int, 
//         startAngle: Float32Array, 
//         endAngle: Float32Array, 
//         drawCounterClockwise: Bool(false));

//GOOD CIRCLE CODE
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();


//for loop example to create multiple random circles
// for(let i = 0; i < 500; i++){
//     // randomizes coordinates of x and y 
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;

//     let r = Math.random() * 255; //random colors 
//     let g = Math.random() * 255;
//     let b = Math.random() * 255;

//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.fillStyle = `rgb(${r}, ${g}, ${b})`;
//     c.fill();
// }


// mouse ove object
const mouse = {
    x: undefined,
    y: undefined,

}
const maxRadius = 40;
const minRadius = 2;

const colorArray = [
    "#6A0DC4",
    "#8D18FF",
    "#A240FC",
    "#B850FF",
    "#D168FF",
];

function init() {
    circleArray = [];
    for (let i = 0; i < 800; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (window.innerWidth - radius * 2) + radius;
        let y = Math.random() * (window.innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 5; //-0.5 gives random pos or neg #
        let dy = (Math.random() - 0.5) * 5; // *10 is speed
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b));
    }
};

//interactivity with circles
window.addEventListener("mousemove", function(e){
    mouse.x = event.x;
    mouse.y = event.y;
});

// browser resize function for canvas
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});



//JS object (uses code from example below)
function Circle(x, y, dx, dy, radius, r, g, b) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.r = r;
    this.g = g;
    this.b = b;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = `rgb(${r}, ${g}, ${b})`;
        // c.fillStyle = `rgb(${r}, ${g}, ${b})`;
        c.fillStyle = this.color
        // c.stroke();
        c.fill();
    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;


        //INTERACTIVITY portion
        if (mouse.x - this.x < 50 
            && mouse.x - this.x > -50
            && mouse.y - this.y < 50 
            && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

const circleArray = []; // holds each created circle

for (let i = 0; i < 800; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 5; //-0.5 gives random pos or neg #
    let dy = (Math.random() - 0.5) * 5; // *10 is speed
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b));
}
console.log(circleArray);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();



//EXAMPLE EXAMPLE
// //ANIMATED CIRCLE randomly with notes
// let x = Math.random() * window.innerWidth;
// let y = Math.random() * window.innerHeight;
// //standard for veolicty of movement
// let dx = (Math.random() - 0.5) * 10; //-0.5 gives random pos or neg #
// let dy = (Math.random() - 0.5) * 10; // *10 is speed
// let radius = 30;
// function animate(){
//     requestAnimationFrame(animate);
//     //used to clear old animation each frame
//     c.clearRect(0, 0, innerWidth, innerHeight);
//     //uses circle.draw method 
//     circle.update();
//     //draws circle inside animation function
//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI * 2, false);
//     c.strokeStyle = "blue";
//     c.stroke();
//     //stops from hitting screen Right and Left
//     if(x + radius > innerWidth || x - radius < 0) {
//         dx = -dx;
//     }
//     if(y + radius > innerHeight || y - radius < 0){
//         dy = -dy;
//     }
//     // increases position by velocity amount
//     x += dx;
//     y += dy;
// };

// animate();