// Name: Rachael Bogdany
// Date: 2/29/2020
// Filename: index.js
// ISTE340 Project 1

if(!document.getElementById){
	//Unsupported browsers get redirected
	window.location="legacy.html";
}
if(!window.localStorage){
	//Unsupported browsers get redirected
	window.location="legacy.html";
}

//These are my two datasets, if you want to see the second data set work
//change in index.html body onload="init()" to onload="init1()"
//I included the xml files for the second data set in my zip
data1 = {
	init: ['Big', 'Small'],
	Big: ['Long Haired', 'Short Haired'],
	'Long Haired': ['Outgoing', 'Shy'],
	Outgoing: ['Maine Coon'],
	Shy: ['Ragdoll'],
	'Short Haired': ['Loves Water', 'Hates Water'],
	'Loves Water': ['Loves Cuddles', 'Vocal'],
	'Loves Cuddles': ['Turkish Van'],
	Vocal: ['Siberian'],
	'Hates Water': ['Pet Friendly', 'Low Energy', 'Stubborn'],
	'Pet Friendly': ['Ragamuffin'],
	'Low Energy': ['British Shorthair'],
	Stubborn: ['Bengal'],
	Small: ['Kid Friendly', 'Cat Only'],
	'Kid Friendly': ['Hypoallergenic', 'Regular'],
	'Cat Only': ['Persian'],
	Hypoallergenic: ['Sassy', 'Hairless'],
	Sassy: ['Siamese'],
	Hairless: ['Sphynx'],
	Regular: ['Lots of Maintenance', 'Short Hair', 'Extra Small', 'Independent'],
	'Lots of Maintenance': ['Himalayan'],
	'Short Hair': ['American Shorthair'],
	'Extra Small': ['Munchkin'],
	Independent: ['Curious', 'Laid Back'],
	'Laid Back': ['Exotic'],
	Curious: ['Likes Climbing', 'Calm'],
	'Likes Climbing': ['Burmese'],
	Calm: ['Abyssinian']
}
data2 = {
	init1: ['Men', 'Women'],
	Men: ['Handsome', 'Ugly'],
	Women: ['Pretty', 'Homely'],
	Handsome: ['Ben'],
	Ugly: ['Brown Hair, Blonde Hair'],
	'Brown Hair': ['Blue Eyes', 'Green Eyes'],
	'Blonde Hair': ['Tall', 'Short'],
	'Blue Eyes': ['Fred'],
	'Green Eyes': ['Ted'],
	'Tall': ['Matt'],
	'Short': ['Chris'],
	Pretty: ['Betty'],
	Homely: ['Chris']
}
	
//create a XMLHttpRequest Object...
function getHTTPObject() {
	var xmlhttp;
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest){
  		xmlhttp=new XMLHttpRequest()
  	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject){
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
  	}else{	
 		return false;
  	}
  	return xmlhttp;
}

var http = getHTTPObject();
	
function handleHttpResponse(val) {
  //object complete
  if (http.readyState == 4) {
    //if I got something...
    if (http.status==200) {
      // Use the XML DOM to unpack the data 
      var xmlDocument = http.responseXML; 
      //create data object to be used
      data = {}
	  data[xmlDocument.getElementsByTagName('topic').item(0).firstChild.data] = [];
	  for(let i = 0, len = xmlDocument.getElementsByTagName('answer').length; i < len; i++){
		data[xmlDocument.getElementsByTagName('topic').item(0).firstChild.data].push(xmlDocument.getElementsByTagName('answer').item(i).firstChild.data);
	  }
	  //change page based on data
	  changeData(val, data);
    }
  }
}

//interval constants
var inter;
var bk;

function call(val){
	//function that gets called onmouseover/out of the title
	if(val == 'left'){
		leftCat();
	}
	else{
		document.getElementsByTagName('img')[0].style.display = 'block';
		rightCat();
	}
}

function rightCat(){
	//moves the img to the right
	clearInterval(bk);
	let r = document.getElementsByTagName('img')[0].style.left;
	if(parseInt(r) < 500){
		document.getElementsByTagName('img')[0].style.left = parseInt(r) + 1 +'px';
	}
	else{
		clearInterval(inter);
	}
}

function leftCat(){
	//moves the img to the left
	clearInterval(inter);
	let r = document.getElementsByTagName('img')[0].style.left;
	if(parseInt(r) > 330){
		document.getElementsByTagName('img')[0].style.left = parseInt(r) - 1 +'px';
	}
	else{
		document.getElementsByTagName('img')[0].style.display = 'none';
		clearInterval(bk);
	}
}

//moves the selects onto the page
function dropDownSlide(elem, toWhat, val, speedX, speedY, gravity, gravitySpeed, bounce, count){
	x = parseInt(elem.style.left);
	y = parseInt(elem.style.top);
	if(count != 0){
		//if the count isn't 0 yet, bounce again
		gravitySpeed += gravity;
        x += speedX;
        y += speedY + gravitySpeed;
		//when it hits the bottom
		if (y > toWhat) {
			y = toWhat;
            gravitySpeed = -(gravitySpeed * bounce);
			count -= 1;
        }
		//change div position
		elem.style.left = x + 'px';
		elem.style.top = y + 'px';
		setTimeout(function(){dropDownSlide(elem, toWhat, val, speedX, speedY, gravity, gravitySpeed, bounce, count);}, 50);
	}
	else{
		if(localStorage.getItem(val) != null){
			//if next select is stored in localstorage
			document.getElementById(val).value = localStorage.getItem(val);
			getData(document.getElementById(val));
		}
	}
}

//moves the results onto the page
function formSlide(elem){
	if(parseInt(elem.style.left) < 80){
		elem.style.left = parseInt(elem.style.left) + 5 + 'px';
		setTimeout(function(){formSlide(elem);}, 20);
	}
}

//gets the xml data
function getData(dom){
	let val;
	//go get some data...
	if(typeof(dom) === 'string'){
		val = dom;
	}
	else{
		val = dom.options[dom.selectedIndex].value;
	}
	if(http && val != '--Select--'){// if the XHR object exists
		http.open('get', val+'.xml', true);
		//http.onreadystatechange="handleHttpResponse(resolve, reject)";
		http.onreadystatechange=function(){
			handleHttpResponse(dom)
		}
		http.send();
	}
	else{
		changeData(dom, []);
	}
}

//Changes the page when selects are changed
function changeData(dom, data){
	let val;
	if(typeof(dom) === 'string' && dom != '--Select--'){
		val = dom;
	}
	else{
		val = dom.options[dom.selectedIndex].value;
		//destroy the children nodes that aren't the changed node
		let parent = dom.parentNode
		while(parent != parent.parentNode.lastChild){
			if(parent.parentNode.lastChild.nodeName == 'FORM'){
				//remove saved form fields
				DeleteCookie('fname');
				DeleteCookie('lname');
			}
			else if(parent.parentNode.lastChild.nodeName == 'DIV'){
				//remove saved selected options
				localStorage.removeItem(parent.parentNode.lastChild.childNodes[1].id);
			}
			parent.parentNode.removeChild(parent.parentNode.lastChild);
		}
		if(val != '--Select--'){
			localStorage.setItem(dom.id, val);
		}
		else{
			localStorage.removeItem(dom.id);
		}
	}
	if(val != '--Select--'){
		//creating the new dropdown
		if(data[val].length != 1){
			//creates the outer div
			let outerdiv = document.createElement('div');
			outerdiv.appendChild(document.createTextNode('Which characteristic do you prefer?   '));
			outerdiv.style.left = '0px';
			outerdiv.style.top = '0px';
			outerdiv.style.position = 'absolute';
			//creates the select 
			let sel = document.createElement('select');
			sel.setAttribute('onchange', 'getData(this)');
			sel.setAttribute('id', val);
			//creates default option
			let firstop = document.createElement('option');
			firstop.appendChild(document.createTextNode('--Select--'));
			firstop.setAttribute('value', '--Select--');
			sel.appendChild(firstop);
			//adds all the options based on the dataset
			for(let i = 0, len = data[val].length; i < len; i++){		
				var op = document.createElement('option');
				var d = document.createTextNode(data[val][i]);
				op.appendChild(d);
				op.setAttribute('value', data[val][i]);
				sel.appendChild(op);
			}
			outerdiv.appendChild(sel);
			document.getElementById('container').appendChild(outerdiv);
			//gets the number of the new child
			let idx = outerdiv.parentNode.children.length-1;
			//initializes variables for bouncing div
			let speedX = 2,
			speedY = 0, 
			gravity = 1,
			gravitySpeed = 0,
			bounce = 0.6;
			dropDownSlide(outerdiv, 70 + (idx*50), val, speedX, speedY, gravity, gravitySpeed, bounce, 1 + idx);
		}
		else{
			//build out the final form and show results
			//gets value that was last selected
			let val = dom.options[dom.selectedIndex].value
			let parent = dom.parentNode
			let endParent = dom.parentNode
			//creates outer div for the result
			let divResult = document.createElement('div');
			divResult.style.left = '-250px';
			divResult.style.top = '0px';
			divResult.style.position = 'relative';
			//adds title to divResult
			let h3 = document.createElement('h3')
			h3.appendChild(document.createTextNode('Your Results:'));
			divResult.appendChild(h3);
			//adds result paragraph to divResult
			let p = document.createElement('p');
			let str = 'You have choosen a '
			let children = dom.parentNode.parentNode.childNodes
			//creates the string to output the results of what the user
			//choose
			for(let i = 0, len = children.length; i < len; i++){
				let child = children[i].getElementsByTagName('select')[0];
				if(i != len-1){
					str += child.options[child.selectedIndex].value.toLowerCase() + ', '
				}
				else{
					str += child.options[child.selectedIndex].value.toLowerCase() + ' cat.'
				}
			}
			p.appendChild(document.createTextNode(str));
			p.setAttribute('id', 'result');
			divResult.appendChild(p);
			//adds what cat breed you got
			let h4 = document.createElement('h4');
			h4.appendChild(document.createTextNode('Your Cat: ' + data[val][0]));
			h4.setAttribute('id', 'resultCat');
			divResult.appendChild(h4);
			//adds the image of the breed
			let img = document.createElement('img');
			img.setAttribute('src', 'assets/img/' + data[val][0] + '.jpg');
			img.setAttribute('alt', data[val][0]);
			divResult.appendChild(img);
			//adds the divResult to the page
			let topP = document.getElementById('container').lastChild.style.top
			document.getElementById('container').appendChild(divResult);
			divResult.style.top = parseInt(topP) + 'px';
		
			//creates the form
			let form1 = document.createElement('form');
			form1.setAttribute('action', 'formresult.php');
			form1.setAttribute('method', 'post');
			form1.setAttribute('onsubmit', 'return validate()');
			form1.style.float = 'right';
			form1.style.position = 'absolute';
			form1.style.top = '40px';
			form1.style.left = '650px';
			//form title
			let title = document.createElement('h4');
			title.appendChild(document.createTextNode('Please enter your information.'));
			form1.appendChild(title);
			//first input and label
			let fname = document.createElement('label');
			fname.setAttribute('for', 'fname');
			fname.appendChild(document.createTextNode('First name: '));
			let inputFirst = document.createElement('input');
			inputFirst.setAttribute('type', 'text');
			inputFirst.setAttribute('name', 'fname');
			inputFirst.setAttribute('id', 'fname');
			inputFirst.setAttribute('onchange', 'saveNames(this)');
			if(GetCookie(inputFirst.id) != null){
				//pulls first input data from cookies is applicable
				inputFirst.value = GetCookie(inputFirst.id)
			}
			//second input and label
			let lname = document.createElement('label');
			lname.setAttribute('for', 'lname');
			lname.appendChild(document.createTextNode('Last name: '));
			let inputLast = document.createElement('input');
			inputLast.setAttribute('type', 'text');
			inputLast.setAttribute('name', 'lname');
			inputLast.setAttribute('id', 'lname');
			inputLast.setAttribute('onchange', 'saveNames(this)');
			if(GetCookie(inputLast.id) != null){
				//pulls second input data from cookies is applicable
				inputLast.value = GetCookie(inputLast.id)
			}
			//creates hidden input for result string to be sent
			//with the users name
			let hide = document.createElement('input');
			hide.setAttribute('type', 'hidden');
			hide.setAttribute('id', 'hide');
			hide.setAttribute('name', 'hide');
			//creates hidden input for result cat to be sent
			//with the users name
			let cat = document.createElement('input');
			cat.setAttribute('type', 'hidden');
			cat.setAttribute('id', 'cat');
			cat.setAttribute('name', 'cat');
			//creates form submit button
			let submitButton = document.createElement('input');
			submitButton.setAttribute('type', 'submit');
			submitButton.setAttribute('value', 'Submit');
			//append inputs to the form
			form1.appendChild(hide);
			form1.appendChild(fname);
			form1.appendChild(inputFirst);
			form1.appendChild(document.createElement('br'));
			form1.appendChild(document.createElement('br'));
			form1.appendChild(lname);
			form1.appendChild(inputLast);
			form1.appendChild(document.createElement('br'));
			form1.appendChild(document.createElement('br'));
			form1.appendChild(submitButton);
			form1.appendChild(hide);
			form1.appendChild(cat);
			//adds form to page
			document.getElementById('container').appendChild(form1);
			formSlide(divResult);
		}
	}
}

function saveNames(dom){
	//save form entries
	if(dom.value != ''){
		SetCookie(dom.id, dom.value);
	}
	else{
		DeleteCookie(dom.id);
	}
}
		
function validate(){
	//validate the form
	let valid = true;
	if(document.getElementById('fname').value == ''){
		document.getElementById('fname').style.borderColor = 'red';
		valid = false;
	}
	else{
		document.getElementById('fname').style.borderColor = '';
	}
	if(document.getElementById('lname').value == ''){
		document.getElementById('lname').style.borderColor = 'red';
		valid = false;
	}
	else{
		document.getElementById('lname').style.borderColor = '';
	}
	if(valid){
		//clear cookies and localstorage
		DeleteCookie('fname');
		DeleteCookie('lname');
		let children = document.getElementById('container').childNodes;
		for(let i = 0, len = children.length; i < len; i++){
			localStorage.removeItem(children[i].childNodes[1].id);
		}
		document.getElementById('hide').value = document.getElementById('result').innerText;
		document.getElementById('cat').value = document.getElementById('resultCat').innerText;
	}
	return valid;
}