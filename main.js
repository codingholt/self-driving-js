const canvas = document.getElementById('myCanvas')
canvas.width = 200 

//get canvas context
const ctx = canvas.getContext('2d')
//make car
const car = new Car(100,100,30,50);


animate()

function animate(){
    car.update();
    canvas.height = window.innerHeight
    car.draw(ctx);
    requestAnimationFrame(animate)
}