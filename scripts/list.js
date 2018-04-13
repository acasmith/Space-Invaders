function List(){
	this.array = [];
}
	
//Returns the length of the list.
List.prototype.size = function(){
	return this.array.length;
}

//Adds an element to the list at the specified index.
//If the index is -1, appends the list.
List.prototype.add = function(element, index){
	if(index === -1){
		this.array.push(element);
	}
	else{
		this.array[index] = element;
	}
}

//Removes the element at the specific index.
List.prototype.remove = function(index){
	if(index < this.array.length){
		this.resize(index);
	}
}

//Returns the element at the specified index.
List.prototype.get = function(index){
	return this.array[index];
}

//Resizes the internal array by shifting other elements after index to position + 1.
List.prototype.resize = function(index){
	for(var i = index; i < this.array.length - 1; i++){
		this.array[i] = this.array[i + 1];
	}
	this.array.length -= 1;
}

//prints the contents of the list to the console.
List.prototype.printList = function(){
	var myString = "";
	for(var i = 0; i < myList.size(); i++){
		myString += myList.get(i) + ", ";
	}
	console.log(myString);
}

//Returns true if there is nothing in the list.
List.prototype.isEmpty = function(){
	if(this.size() <= 0){
		return true;
	}
	return false;
}

//TESTS
/**
//Adding and removing 1 element.
console.log("****Test 1******");
var myList = new List();
console.log("Size before: " + myList.size());
myList.add(5, -1);
console.log(myList.size());
console.log(myList.get(0));
myList.remove(0);
console.log(myList.size());
console.log(myList.get(0));
console.log("*******************");
console.log("");

//Adding 3 elements and removing the second one.
console.log("****Test 2******");
var myList = new List();
myList.add(5, -1);
myList.add(6, -1);
myList.add(7, -1);
console.log(myList.size());
myList.remove(0);
console.log(myList.size());
console.log(myList.get(0) + ", " + myList.get(1) + ", " + myList.get(2));
console.log("*******************");
console.log();

//Adding 3 elements and removing the third one.
console.log("****Test 3******");
var myList = new List();
myList.add(5, -1);
myList.add(6, -1);
myList.add(7, -1);
console.log(myList.size());
myList.remove(1);
console.log(myList.size());
console.log(myList.get(0) + ", " + myList.get(1) + ", " + myList.get(2));
console.log("*******************");
console.log();

//Adding 3 elements and attempting to remove a non-existent fourth one.
console.log("****Test 4******");
var myList = new List();
myList.add(5, -1);
myList.add(6, -1);
myList.add(7, -1);
console.log(myList.size());
myList.printList();
myList.remove(3);
console.log(myList.size());
console.log(myList.get(0) + ", " + myList.get(1) + ", " + myList.get(2));
console.log("*******************");
console.log();

**/