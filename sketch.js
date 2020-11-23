
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleFunc, fruitFunc, obstacleImage, obGround,monGround;
var FoodGroup, obstacleGroup
var score
var gameState;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameState="play"

}



function setup() {
  createCanvas(500, 500)
  monkey = createSprite(200, 390, 20, 20);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.12;
  

  ground = createSprite(250, 440, 1000, 20);

  obGround = createSprite(250, 490, 510, 20);
  
  monGround = createSprite(250, 447, 510, 20);

  obstacleGroup = createGroup();
  bananaGroup = createGroup();

  score = 0;


}


function draw() {
  background("#f2f2f2");

  monkey.collide(monGround);
  
  monkey.setCollider("circle", 10, 0, 350)

  ground.velocityX = -8;
  if (ground.x < 0) {
    ground.x = 250;
  }
 
  
  //Colour and visibility
  ground.shapeColor = ("#00994d");
  obGround.visible = false;
  monGround.visible = false;
  
  //Calling functions
  obstacleFunc();
  obstacleGroup.setLifetimeEach(63);
  fruitFunc();
  obstacleGroup.setLifetimeEach(55);
  

  //The player can jump only when the monkey is touching the ground
if(gameState==="play"){
   monkey.velocityY = monkey.velocityY + 0.6;

    if (monkey.y > 377) {
    if ((keyDown("space")) && (monkey.y >= 260)) {
      monkey.velocityY = -11;
    }
  } 
  //Text
  textFont("Courier New, Courier, monospace");
   fill("#ffa64d")
  textSize(18);
  text("Score: " + score, 390, 100);
  fill("#ff5c33");
  textSize(19);
  text("Don't get the score below or above 9",50,50);
  
      if (score>9){
      gameState="fat"}

      else if(score<-9){
        gameState="end"
      }
  }
  if(gameState==="fat"){
     monkey.x=200;
     monkey.y=390
     monkey.velocityY=0;
    textFont("Courier New, Courier, monospace");
    fill("#6666ff")
    textSize(18);
    text("You ate too much!",150,100);
    text("You are too fat!",150,120)
    
    
    
}
  
  if(gameState==="end"){
    monkey.x=200;
    monkey.velocityY=0;
    textFont("Courier New, Courier, monospace");
    fill("#6666ff")
    textSize(18);
    text("Oh no, you took too much damage!",80,100);
        
  }
  
  drawSprites();
}
//Fix score, and make obstacle spawn
function obstacleFunc() {
  if((frameCount % 50 === 0)&&(gameState==="play")) {

    obstacle = createSprite(510, 407, 20, 20);
    obstacle.x = random(510, 550)
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.19
    obstacle.velocityX = -8
    obstacle.collide(obGround);
    obstacleGroup.add(obstacle);

    if (monkey.isTouching(obstacleGroup)) {
      score = score - 1;
    }
  }
}

function fruitFunc() {
  
  
   if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score + 1      
    }
  if ((frameCount % 37 === 0)&&(gameState==="play")) {
    banana = createSprite(510, random(330, 360), 20, 20)
    banana.scale = 0.1;
    banana.addImage("fruit", bananaImage)
    banana.velocityX = -12.6;
    bananaGroup.add(banana);
    banana.setCollider("circle",0,0,40);

   if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score + 1      
    }
   

  }
}
