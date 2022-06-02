const carCanvas = document.getElementById('carCanvas')
carCanvas.width = 250

const networkCanvas = document.getElementById('networkCanvas')


const carCtx = carCanvas.getContext('2d')
const networkCtx = networkCanvas.getContext('2d')

const road = new Road(carCanvas.width/2, carCanvas.width*0.9)
//make car
const car = new Car(road.getLaneCenter(1),500,30,50, 'AI');
const traffic = [ new Car(road.getLaneCenter(1),-100,30,50, 'DUMMY',2),  new Car(road.getLaneCenter(0),-50,30,50, 'DUMMY',2),new Car(road.getLaneCenter(2), 250 ,30,50, 'DUMMY',2), new Car(road.getLaneCenter(2),-50,30,50, 'DUMMY',2)]

animate()

function animate(time){
    for(let i=0; i < traffic.length; i++){
        traffic[i].update(road.borders, [])
    }
    car.update(road.borders, traffic);
    carCanvas.height = window.innerHeight;
    networkCanvas.width = window.innerWidth * 0.5;

    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-car.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i = 0;  i < traffic.length; i++){
        traffic[i].draw(carCtx, 'red')
    }
    car.draw(carCtx, 'blue');

    carCtx.restore();

    networkCtx.lineDashOffset = -time/100;
    Visualizer.drawNetwork(networkCtx, car.brain)
    requestAnimationFrame(animate)
}