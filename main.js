const canvas = document.getElementById('myCanvas')
canvas.width = 200 

//get canvas context
const ctx = canvas.getContext('2d')

const road = new Road(canvas.width/2, canvas.width*0.9)
//make car
const car = new Car(road.getLaneCenter(1),100,30,50);


animate()

function animate(){
    car.update();
    canvas.height = window.innerHeight;
    road.draw(ctx)
    car.draw(ctx);
    requestAnimationFrame(animate)
}