const canvas = document.getElementById('myCanvas')
canvas.width = 250

//get canvas context
const ctx = canvas.getContext('2d')

const road = new Road(canvas.width/2, canvas.width*0.9)
//make car
const car = new Car(road.getLaneCenter(1),500,30,50);


animate()

function animate(){
    car.update(road.borders);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw(ctx)
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate)
}