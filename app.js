document.addEventListener('DOMContentLoaded', () => {

	var pool = []; //this is the array that will contain all the current combatants.
	var attributes = ['character', 'init', 'totalHp', 'armor', 'damage'];

	const header = document.getElementById('head'); //targets the header which contains the input fields
	const mainDiv = document.querySelector('.main'); //used to target the main div (contains just the combat tracker)
	const wrapperDiv = document.querySelector('.wrapper'); //used to target the wrapper div (contains header, input fields, combat tracker, and page footer)
	const combatList = document.getElementById('combatList'); //used to target the combat list which is empty by default and populated by the event listener
	const filters = document.querySelector('.filters'); //used to target the div containing the filters between the input fields and the combat tracker. Empty by default and populated by the 'filters' section of this page
	const combatFilters = document.querySelector('.combatFilters'); //used to target the ul that holds the filters themselves





	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Creates a Player class that holds the values being kept track of
	class Player {
		constructor(pName, pInit, pHp, pAc, pDamage) {
			this.Character = pName;
			this.Init = pInit;
			this.HP = pHp;
			this.Armor = pAc;
			this.Damage = pDamage;
			this.Remaining = pHp - pDamage;
		}
	}

	//simple function to create elements quicker
	function createElement (elementName, property, value, attr, call) {
		const element = document.createElement(elementName);
		element[property] = value;
		if (attr && call != null) {
			element.setAttribute(attr, call);
		}
		return element;
	}

	//Prints out pool
	function print(){
		console.log(pool);
	};

	//Loops through the pool array and creates li's with each property
	function addIt(location){
		combatList.innerHTML = "";
		pool.forEach ((element) => {
			var ul = document.createElement('ul');
			ul.setAttribute('class', 'combatant');
			for (var propt in element) {
				var p = document.createElement('p');
				var pp = createElement('p', 'textContent', element[propt], 'class', 'attr');
				var li = createElement('li', '', '', 'class', 'number');
				p.textContent = propt + ': ';
				li.appendChild(p);
				li.appendChild(pp);
				ul.appendChild(li);
			}
			var eli = createElement('li', '', '', 'class', 'nButton');
			var edit = createElement('button', 'textContent', 'Edit', 'class', 'liButton');
			eli.appendChild(edit);
			var rli = createElement('li', '', '', 'class', 'nButton');
			var remove = createElement('button', 'textContent', 'Remove', 'class', 'liButton');
			rli.appendChild(remove);
			ul.appendChild(eli);
			ul.appendChild(rli);
			combatList.appendChild(ul);
		});
	};

	function  filterFor(item , order = 'desc') {
		return function (a, b) {
			if (!a.hasOwnProperty(item) || !b.hasOwnProperty(item)) {
				return 0;
			}

			const varA = a[item];
			const varB = b[item];

			let comparison = 0;
			if (varA > varB) {
				comparison = 1;
			} else if (varA < varB) {
				comparison = -1;
			}

			return (
				(order == 'desc') ? (comparison * -1) : comparison
			);
		};
	};

	function locate (value) {
		for (i = 0; i < pool.length; i++) {
			if (pool[i].Character == value){
				return i;
			}
		}
	}

	//This next line is just to add default items to the pool so I don't have to do it every time I want to test my code
	pool.push(new Player('Cronan', 18, 158, 18, 74));
	pool.push(new Player('Varis', 16, 103, 20, 35));
	pool.push(new Player('Rowan', 20, 89, 17, 22));
	pool.push(new Player('Barri', 12, 69, 11, 25));
	pool.push(new Player('Yusuf', 14, 119, 13, 64));
	pool.push(new Player('Balazar', 17, 127, 10, 89));
	addIt();



	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//ADD BUTTON ADD BUTTON ADD BUTTON ADD BUTTON ADD BUTTON ADD BUTTON ADD BUTTON ADD BUTTON ADD BUTTON ADD BUTTON 
	///////////////////////////////////////////////////////////////////////////////////////////////////////////// 

	header.addEventListener('click', (e) =>{
		e.preventDefault();

		//these vars are for use with buttons in general
		const theClick = e.target;
		const action = theClick.textContent;
		const clickParent = theClick.parentNode;
		const clickGrand = clickParent.parentNode;
		const oldestBrother = theClick.parentNode.firstChild.textContent;

		if (theClick.id == "addButton") {
			if (document.getElementById('name').value != '') {
				let myPlayer = new Player(document.getElementById('name').value, document.getElementById('init').value, document.getElementById('hp').value, document.getElementById('ac').value, document.getElementById('damage').value);
				pool.push(myPlayer);
				document.getElementById('name').value = '';
				document.getElementById('init').value = '';
				document.getElementById('hp').value = '';
				document.getElementById('ac').value = '';
				document.getElementById('damage').value = '';
			}
			addIt();
		}
	});

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//EDIT AND REMOVE EDIT AND REMOVE EDIT AND REMOVE EDIT AND REMOVE EDIT AND REMOVE EDIT AND REMOVE EDIT AND REMOVE 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	combatList.addEventListener('click', (e) => {
		e.preventDefault();

		const theClick = e.target;
		const action = e.target.textContent;
		const clickParent = theClick.parentNode;
		const clickGrand = clickParent.parentNode;
		const oldestBrother = clickGrand.firstChild;
		let working = combatList.querySelector('input');

		if (action == 'Edit') {
			let nephew = oldestBrother.firstChild.nextSibling.innerHTML;
			let	index = locate(nephew);
			let editing = pool[index];

			if (working) {
				alert('You must finish editing this combatant before you begin editing another.');
			} else {
				clickGrand.innerHTML = '';
				for (var propt in pool[index]) {
				var li = createElement('li', '', '', 'class', 'tempLi');
				var p = createElement('p', 'textContent', propt + ': ', '', '')
					var input = createElement('input', 'placeholder', pool[index][propt], 'class', 'fixMe');
					li.appendChild(p);
					li.appendChild(input);
					clickGrand.appendChild(li);
				}
				var eli = createElement('li', '', '', 'class', 'nButton');
				var save = createElement('button', 'textContent', 'Save', '', '');
				eli.appendChild(save);
				var rli = createElement('li', '', '', 'class', 'nButton');
				var remove = createElement('button', 'textContent', 'Remove', '', '');
				rli.appendChild(remove);
				clickGrand.appendChild(eli);
				clickGrand.appendChild(rli);
				clickGrand.setAttribute('class', 'working');
			}
		} else if (action == 'Remove') {
			let nephew;
			if (oldestBrother.firstChild.nextSibling == null) {
				nephew = oldestBrother.firstChild.placeholder;
			} else { 
				nephew = oldestBrother.firstChild.nextSibling.innerHTML;
			}
			let	index = locate(nephew);
			let editing = pool[index];
			pool.splice(index, 1);
			combatList.innerHTML = '';
			addIt();
		} else if (action == 'Save') {
			let nephew = oldestBrother.firstChild.nextSibling.placeholder;
			let	index = locate(nephew);
			let editing = pool[index];
			var saved = combatList.getElementsByTagName('input');
			var holder = [];

			for (i = 0; i < saved.length; i++) {

				if (saved[i].value == '') {
					holder[i] = saved[i].placeholder;
				} else {
					holder[i] = saved[i].value;
				}
			}
			var ne = new Player(holder[0], holder[1], holder[2], holder[3], holder[4]);
			clickGrand.remove();
			pool.splice(index, 1, ne);
			addIt();
		}
	});

	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//FILTERS FILTERS FILTERS FILTERS FILTERS FILTERS FIlTERS FIlTERS FIlTERS FIlTERS FIlTERS FIlTERS FIlTERS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	combatFilters.appendChild(createElement ('button', 'textContent', 'Sort the Dead', 'class', 'filter'));
	combatFilters.appendChild(createElement ('button', 'textContent', 'Sort by Init', 'class', 'filter'));
	combatFilters.appendChild(createElement ('button', 'textContent', 'Sort by HP', 'class', 'filter'));
	combatFilters.appendChild(createElement ('button', 'textContent', 'Sort by AC', 'class', 'filter'));
	combatFilters.appendChild(createElement ('button', 'textContent', 'Sort by Damage', 'class', 'filter'));

	filters.addEventListener('click', (e) => {
		const action = e.target.textContent;

		if (action == 'Sort the Dead') {
			pool.sort(filterFor('Remaining', 'asc'));
		} else if (action == 'Sort by Init') {
			pool.sort(filterFor('Init'));
		} else if (action == 'Sort by HP') {
			pool.sort(filterFor('HP'));
		} else if (action == 'Sort by AC') {
			pool.sort(filterFor('Armor'));
		} else if (action == 'Sort by Damage') {
			pool.sort(filterFor('Damage'));
		}

		addIt();
	});
});


	

























