var totalShips, totalShipsCalc;
var delay;
var shipNames = null;
// sections
var dataOut;
// divs
var shipSelect;
var outputDiv;
// inputs
var inputShipNumber, inputShipPower, inputHeavyNumber, inputSpeedsterNumber, inputBalancedNumber;
var namesCheck;
// buttons
var balanceButton;
// drop downs
var options;
// paragraphs
var balanceButtonText;
var contents;

function onLoad() { // runs when body is loaded; sometimes creates a brief moment where things don't look right, such as colors set by this script
	// sections
	dataOut = document.getElementById("data_out");
	// divs
	shipSelect = document.getElementById("ship_select");
	outputDiv = document.getElementById("output_stats");
	// inputs
	inputShipNumber = document.getElementById("ship_number");
	inputShipPower = document.getElementById("ship_power");
	inputHeavyNumber = document.getElementById("heavy_number");
	inputSpeedsterNumber = document.getElementById("speedster_number");
	inputBalancedNumber = document.getElementById("balanced_number");
	namesCheck = document.getElementById("names_check");
	// buttons
	balanceButton = document.getElementById("balance_button");
	// paragraphs
	balanceButtonText = document.getElementById("balance_button_text");

	visibilityChange();
	document.addEventListener("visibilitychange",visibilityChange(),false);
}

function visibilityChange() {
	if (document.visibilityState == "visible") {
		var hideShowButton = setInterval(function() { // runs every 1/10 seconds, calculates the number of ships accounted for in the type dist selection area
			totalShipsCalc = parseInt(inputHeavyNumber.value) + parseInt(inputSpeedsterNumber.value) + parseInt(inputBalancedNumber.value);
			if (totalShipsCalc != totalShips) { // hide and show correct one of balance button or help text
				balanceButton.style.display = "none";
				balanceButtonText.style.display = "block";
			} else {
				balanceButtonText.style.display = "none";
				balanceButton.style.display = "block";
			}
			if (document.visibilityState != "visible") {
				clearInterval(hideShowButton);
			}
		},100);
	}
}

function changeShipNumber() { // runs when the "total ships to balance" number is changed
	totalShips = inputShipNumber.value;

	inputHeavyNumber.max = totalShips;
	inputSpeedsterNumber.max = totalShips;
	inputBalancedNumber.max = totalShips;

	inputHeavyNumber.placeholder = `0 to ${totalShips}`;
	inputSpeedsterNumber.placeholder = `0 to ${totalShips}`;
	inputBalancedNumber.placeholder = `0 to ${totalShips}`;
}

function changeHeavyNumber() {
	inputSpeedsterNumber.max = totalShips - inputHeavyNumber.value - inputBalancedNumber.value;
	inputBalancedNumber.max = totalShips - inputHeavyNumber.value - inputSpeedsterNumber.value;

	inputSpeedsterNumber.placeholder = `0 to ${inputSpeedsterNumber.max}`;
	inputBalancedNumber.placeholder = `0 to ${inputBalancedNumber.max}`;
}

function changeSpeedsterNumber() {
	inputHeavyNumber.max = totalShips - inputSpeedsterNumber.value - inputBalancedNumber.value;
	inputBalancedNumber.max = totalShips - inputHeavyNumber.value - inputSpeedsterNumber.value;

	inputHeavyNumber.placeholder = `0 to ${inputHeavyNumber.max}`;
	inputBalancedNumber.placeholder = `0 to ${inputBalancedNumber.max}`;
}

function changeBalancedNumber() {
	inputHeavyNumber.max = totalShips - inputSpeedsterNumber.value - inputBalancedNumber.value;
	inputSpeedsterNumber.max = totalShips - inputHeavyNumber.value - inputBalancedNumber.value;

	inputHeavyNumber.placeholder = `0 to ${inputHeavyNumber.max}`;
	inputSpeedsterNumber.placeholder = `0 to ${inputSpeedsterNumber.max}`;
}

function createOptions(parent,number) {
	parent.style.display = "block";
	if (options) {
		for (let current of options) {
			current.remove();
		}
	}
	// standard format for ids on options is "ship_x"
	let optionArray = []; // array of options objs
	for (let i = 0; i < number; i++) { // create the proper number of options, assign them ids, classes, and onclick funcs
		let option = document.createElement("option");
		let optionText;
		option.id = "ship_" + i; // set id dynamically depending on which option it's working on
		option.onclick = function(e) {
			openOutput(this);
		};
		if (shipNames) {
			optionText = document.createTextNode(shipNames[i]); // create text dynamically for option
		} else {
			optionText = document.createTextNode("Ship " + (i + 1)); // create text dynamically for option
		}
		option.appendChild(optionText); // insert text into option
		parent.appendChild(option); // add option to DOM
		optionArray[i] = option; // add option obj to array
	}
	return optionArray;
}

function openOutput(clicked) {
	let needId = clicked.id + "_content";
	console.log(needId);
	for (let content of contents) {
		if (content.id == "select_a_ship") {
			content.style.display = "none";
		} else if (content.id == needId) {
			content.style.display = "block";
		} else {
			content.style.display = "none";
		}
	}
}

function createContent(parent,number) {
	if (contents) {
		for (let current of contents) {
			current.remove();
		}
	}
	// standard format for ids on content is "ship_x_content"
	let contentArray = []; // array of content objs
	for (let i = 0; i < number; i++) { // create the proper number of contents, assign them ids and classes
		let content = document.createElement("p");
		let contentText;
		content.setAttribute("class","content");
		content.id = "ship_" + i + "_content"; // set id dynamically depending on which content it's working on
		if (shipNames) {
			contentText = document.createTextNode(shipNames[i] + "'s content");
		} else {
			contentText = document.createTextNode("Ship " + (i + 1) + "'s content");
		}
		content.appendChild(contentText); // Insert text into content
		parent.appendChild(content); // add content to DOM
		contentArray[i] = content; // add content obj to array
	}
	return contentArray;
}

function generateShipNames(min_length,max_length,number) {
	let consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];
	let vowels = ["a","e","i","o","u"];
	let shipNameArray = [];
	for (let i = 0; i < number; i++) {
		let length = Math.random() * (max_length - min_length) + min_length;
		let currentShipName = [];
		let currentIsVowel;
		if (Math.random() < 0.35) {
			currentIsVowel = true;
		} else {
			currentIsVowel = false;
		}
		for (let j = 0; j < length; j++) {
			if (!currentIsVowel) {
				if (Math.random() < 0.1) {
					currentShipName[j] = consonants[Math.floor(Math.random() * consonants.length)];
				} else {
					currentShipName[j] = vowels[Math.floor(Math.random() * vowels.length)];
				}
			} else {
				if (Math.random() < 0.15) {
					currentShipName[j] = vowels[Math.floor(Math.random() * vowels.length)];
				} else {
					currentShipName[j] = consonants[Math.floor(Math.random() * consonants.length)];
				}
			}
			currentIsVowel = !currentIsVowel;
			console.log(currentShipName);
		}
		currentShipName[0] = currentShipName[0].toUpperCase();
		shipNameArray[i] = currentShipName.join("");
		console.warn(shipNameArray);
	}
	return shipNameArray;
}

function balance() {
	shipNames = null;
	if (namesCheck.checked) {
		shipNames = generateShipNames(4,8,totalShips);
	}
	options = createOptions(shipSelect,totalShips);
	contents = createContent(outputDiv,totalShips);
	inputShipNumber.value = 0;
	changeShipNumber();
	inputShipNumber.value = undefined;
	inputShipPower.value = "";
	inputHeavyNumber.value = undefined;
	inputSpeedsterNumber.value = undefined;
	inputBalancedNumber.value = undefined;
}

function animColor(element,startColor,endColor,duration,steps) { // change background color of one element from one rgb value to another
	console.log("animating...")
	let redChange = (startColor[0] - endColor[0]) / steps;
	let greenChange = (startColor[1] - endColor[1]) / steps;
	let blueChange = (startColor[2] - endColor[2]) / steps;
	let currentColor = extend(startColor);
	let stepCount = 0;
	let stepLength = duration / steps;
	let timer = setInterval(function(){
		currentColor[0] = parseInt(currentColor[0] - redChange);
		currentColor[1] = parseInt(currentColor[1] - greenChange);
		currentColor[2] = parseInt(currentColor[2] - blueChange);
		element.style.backgroundColor = 'rgb(' + currentColor.toString() + ')';
		stepCount += 1;
		if (stepCount >= steps) {
			//element.style.backgroundColor = 'rgb(' + endColor.toString() + ')';
			clearInterval(timer);
		}
	},stepLength);
}

function extend(array) { // copy one array into another, to avoid referencing the same data if you don't want that
	let result = [];
	for (let i = 0; i < array.length; i++) {
		result[i] = array[i];
	}
	return result;
}

