var dog1, dog2, dog, database, foods = 0, foodStock, foodcount;
var feed, add, fedTime, foodObj, lastfed; 

function preload()
{
  dog1 = loadImage("images/dog1.png")
  dog2 = loadImage("images/dog2.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,350,20,20)
  dog.addImage(dog1)
  dog.scale = 0.3

  database = firebase.database();

  foodStock = database.ref("food")
  foodStock.on("value", readStock)

  feed = createButton("Feed the dog")
  feed.position(180,80)
  add = createButton("Add food")
  add.position(280,80)
  feed.mousePressed(feedDog)
  add.mousePressed(addFood)

  foodObj = new Food()

  database.ref("lastFed").on("value",data => {
    lastfed = data.val()
  })
}


function draw() { 
  background(46, 139, 87)

  foodObj.display()

  drawSprites();
  
  textSize(20)
  fill ("white")
  stroke (3)
  text("Food remaining: " + foods, 165, 50)

  textSize(15)
  text("Last fed: " + lastfed, 10,20)
}

function readStock(data) {
  foods = data.val()
  console.log(foods)
}

function writeStock(x) {

  if(x<=0) {
    x = 0
  } else {
    x = x-1
  }

  database.ref("/").update({
    food : x
  })
}

function feedDog() {
  foods = foods - 1
  database.ref("/").update({
    food : foods,
    lastFed : hour()
  })
  dog.addImage(dog2)
}

function addFood() {
  foods = foods + 1
  database.ref("/").update({
    food : foods
  })
}