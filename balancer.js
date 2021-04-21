
var typeInfos = {
    heavy: 1,
    heavySpeedMax: 100,
    speedster: 3,
    both: 2
}




var start = function(number, speed, numberOfHeavy, numberOfSpeedster, NumberOfBoth, type) {
    var totalShips = numberOfHeavy + numberOfSpeedster + NumberOfBoth;
    var speedHeavy = 1*speed*15;
    if (totalShips === number && speed <= 3) {
        console.log(`Informations acquired:\nNumber of ships to balance: ${number};\nStrengh: ${speed};\nNumber of heavy ships: ${numberOfHeavy};\nNumber of Speedster ships: ${numberOfSpeedster};\nNumber of both (speedster & heavy): ${NumberOfBoth}.`)
        var heavySpeed = new Array();
        for (let i=1;i<numberOfHeavy+1;i++) {
            if (speed*10*i >= 100 || speedHeavy >= 100) {
                console.log('ERROR || Resolving issue..')
                if (speedHeavy-=speed*type <= 100) {
                    speedHeavy-= speed*type;
                } else if (speedHeavy-=speed*type >= 100){
                    speedHeavy= 100; 
                    speedHeavy-= speed*type;
                }
                heavySpeed.push(Number(speedHeavy));
                console.log(`Speed of heavy ship ${i}: ${speedHeavy}\n(${speedHeavy}, ${i})`);
            } else {
                console.log(`Speed of heavy ship ${i}: ${speedHeavy}\n(${speedHeavy}, ${i})`);
                heavySpeed.push(Number(speedHeavy));
                speedHeavy+= speed*10*i;
            }
        }
    } else if (totalShips !== number){
        console.log(`Error: asked to balance ${number} ships but ${totalShips} are heavy/speedster/both of heavy and speedster.\nPlease try again with correct values.`)
    } else if (speed > 3 || speed == 0) {
        console.log('Error: wrong speed value.')
    } else if (type >= 8) {
        console.log(`Error: ${type} is not a valid level of ship.`)
    } else if (numberOfHeavy === 0 && numberOfSpeedster === 0 && NumberOfBoth === 0) {
        console.log('Error: no ships to balance (0 speedster ships to balance, 0 heavy ships to balance, 0 both speedster and heavy ships to balance)')
    }
 };
start(8,3, 4,3,1, 5);
