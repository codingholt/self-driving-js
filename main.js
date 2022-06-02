const carCanvas = document.getElementById('carCanvas')
carCanvas.width = 250

const networkCanvas = document.getElementById('networkCanvas')


const carCtx = carCanvas.getContext('2d')
const networkCtx = networkCanvas.getContext('2d')

const road = new Road(carCanvas.width/2, carCanvas.width*0.9)
//make car
const N = 100;
const cars = generateCars(N);
let bestCar = cars[0]
const traffic = [ new Car(road.getLaneCenter(1),-100,30,50, 'DUMMY',2),
                new Car(road.getLaneCenter(0),-300,30,50, 'DUMMY',2),
                new Car(road.getLaneCenter(2),-300,30,50, 'DUMMY',2),
                new Car(road.getLaneCenter(0),-1000,30,50, 'DUMMY',2),
                new Car(road.getLaneCenter(0),-500,30,50, 'DUMMY',2),
                new Car(road.getLaneCenter(1),-500,30,50, 'DUMMY',2),
                new Car(road.getLaneCenter(2),-700,30,50, 'DUMMY',2)]


if(localStorage.getItem('bestBrain')){
    for(let i=0; i<cars.length; i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem('bestBrain')
        )
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain, 0.25)

        }
    }

}
animate()

function saveCar(){
    localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain))
}

function discard(){
    localStorage.removeItem('bestBrain')
}
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

    bestCar  = cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    )
    carCanvas.height = window.innerHeight;
    networkCanvas.width = window.innerWidth * 0.5;

    networkCanvas.height = window.innerHeight;
    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i = 0;  i < traffic.length; i++){
        traffic[i].draw(carCtx, 'red')
    }
    carCtx.globalAlpha=0.2
    for(let i = 0; i<cars.length; i++){
        cars[i].draw(carCtx, 'blue');
    }
    carCtx.globalAlpha=1
    bestCar.draw(carCtx, 'blue', true);

    carCtx.restore();

    networkCtx.lineDashOffset = -time/100;
    Visualizer.drawNetwork(networkCtx, bestCar.brain)
    requestAnimationFrame(animate)
}