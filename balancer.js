






var main_balance = function(factorPower, NumHeavy, NumSpeed, NumSupport, tier) {
    console.log(`Factor power: ${factorPower}\nNumber of heavy ships: ${NumHeavy}\nNumber of speedster ships: ${NumSpeed}\nNumber of support ships: ${NumSupport}\nTier of the ships: ${tier} `)
    var maximumShieldValue;
    var maximumSpeedValue;
    var heavyValue = [];
    //Values positions:
    // * Maximum Shield Value
    // * Maximum Speed Value
    if (tier === 7) {
        maximumShieldValue = (tier+1)*100;        
    };
    if (tier === 6) {maximumShieldValue = (tier-factorPower*2)+f^2*100;}
    if (tier === 5) {maximumShieldValue = ((tier+factorPower)*100)-100;}
    if (tier === 4) {maximumShieldValue = (-1+tier)*factorPower*100;}
    if (tier === 3) {maximumShieldValue;}
    if (tier === 2) {maximumShieldValue = tier^5*5+factorPower*15;}
    if (tier === 1) {maximumShieldValue = tier*factorPower*100;}
    maximumSpeedValue = 70+factorPower*10;
    maximumShieldRegenValue = 10*(0.5+factorPower/2);
    heavyValue.push(maximumShieldValue);
    heavyValue.push(maximumShieldRegenValue);
    console.log(heavyValue);
};


main_balance(3,2,6,4,5)
