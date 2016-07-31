function rockAdd() {

var add1 = prompt ("What would you like me to Add?", "Type Here!");

if(add1) {
var add2 = prompt ("I Now need another Number!", "Type Here!");
var addre = parseInt(add1) + parseInt(add2);

alert("The Sum is "+ addre +"");
}
}