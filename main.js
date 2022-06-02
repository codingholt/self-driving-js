const carCanvas = document.getElementById('carCanvas')
carCanvas.width = 250

const networkCanvas = document.getElementById('networkCanvas')


const carCtx = carCanvas.getContext('2d')
const networkCtx = networkCanvas.getContext('2d')

const road = new Road(carCanvas.width/2, carCanvas.width*0.9)
//make car
const N = 100;
const cars = generateCars(N);
const traffic = [ new Car(road.getLaneCenter(1),-100,30,50, 'DUMMY',2),  new Car(road.getLaneCenter(0),-50,30,50, 'DUMMY',2),new Car(road.getLaneCenter(2), 250 ,30,50, 'DUMMY',2), new Car(road.getLaneCenter(2),-50,30,50, 'DUMMY',2)]

animate()
function generateCars(N){
    const cars = [];
    for(i = 1; i<=N; i++){
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'AI'));
    }
    return cars
}
function animate(time){
    for(let i=0; i < traffic.length; i++){
        traffic[i].update(road.borders, [])
    }
    for(let i = 0; i<cars.length; i++){
        cars[i].update(road.borders, traffic);
    }
    carCanvas.height = window.innerHeight;
    networkCanvas.width = window.innerWidth * 0.5;

    networkCanvas.height = window.innerHeight;
    carCtx.save();
    carCtx.translate(0,-cars[0].y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i = 0;  i < traffic.length; i++){
        traffic[i].draw(carCtx, 'red')
    }
    for(let i = 0; i<cars.length; i++){
        cars[i].draw(carCtx, 'blue');
    }


    carCtx.restore();

    networkCtx.lineDashOffset = -time/100;
    Visualizer.drawNetwork(networkCtx, cars[0].brain)
    requestAnimationFrame(animate)
}