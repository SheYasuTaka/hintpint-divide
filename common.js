
const gId = document.getElementById.bind(document);

let hints = [[], [], []];
let timerID = [][0];

let unopened = ".".repeat(12).split('').map((e,i)=>i);

function isClassed(tag, cl){
	return new Boolean(tag.className.match(new RegExp(`(^|\\b)${cl}(\\b|$)`)));
}

function addClassName(tag, cl){
	if (!tag.className.match(new RegExp(`(^|\\b)${cl}(\\b|$)`))) {
		tag.className += (tag.className ? ' ' : '') + cl;
	}
}

function removeClassName(tag, cl){
	tag.className = tag.className.replace(new RegExp(`(^|\\b)${cl}(\\b|$)`, 'g'), '').replace(/(\b\s+?\b)/g, " ");
	//  first replace: removing classes, which is not any other classes
	// second replace: making spaces clear among classes
}

function debugfill(){
	const pint = gId("pint").children[0];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			pint.children[i].children[j].children[0].value = `${i}-${j}`;
		}
	}
}

function boolear(){
	// return true;
	return Math.random() < 0.8;
}

function correct(){
	clearInterval(timerID);

	const pint = gId("pint").children[0];

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			if (isClassed(pint.children[i].children[j], "hid")) {
				pint.children[i].children[j].innerText = hints[i][j];
			}
		}
	}
}

function start(){
	gId("ctrl").onclick = correct;
	gId("ctrl").innerText = "STOP";
	timerID = setInterval(()=>{
		let i = 0;
		let count = 0;
		while (i + 1 !== unopened.length && count < 4 && boolear()) i++, count++;
		const x = unopened.splice(i, 1)[0];
		console.log(unopened, x);
		console.log(x >> 2, x & 3, hints[x >> 2][x & 3]);

		removeClassName(gId("pint").children[0].children[x >> 2].children[x & 3], "hid");
		console.log();
		gId("pint").children[0].children[x >> 2].children[x & 3].innerText = hints[x >> 2][x & 3];
		if (!unopened.length) clearInterval(timerID);
	}, 2500);
}

function rdy(){
	const pint = gId("pint").children[0];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			hints[i][j] = pint.children[i].children[j].children[0].value;
			if (!hints[i][j]) {
				alert("Empty form had been found");
				return;
			}
		}
	}
	
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			pint.children[i].children[j].innerText = [
			[1, 4, 7, 10],
			[2, 5, 8, 11],
			[3, 6, 9, 12]][i][j];
			addClassName(pint.children[i].children[j], "hid");
		}
	}
	gId("ctrl").onclick = start;
	gId("ctrl").innerText = "START";
}

this.onload = () => {
	const pint = gId("pint").children[0];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			pint.children[i].children[j].innerHTML = "<input type=text></input>";
		}
	}
};
