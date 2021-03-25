var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var gameState = END;
var score=0;

var foodGroup;
var obstaclesGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  goi=loadImage("gameOver.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group;
  obstaclesGroup = new Group;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    spawnFood();
    spawnObstacles();
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if(obstaclesGroup.isTouching(player)){
    gameState = END;
  }
 if(gameState === END){
      backgr.velocityX = 0;
      player.visible = false;

      foodGroup.destroyEach();
      obstaclesGroup.destroyEach();

      textSize(35);
      fill("red");
      text("Game Over!" ,200,400);

     
  }
  
    if(keyDown("space") ) {
      player.velocityY = -17;
    }
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score+2;
      player.scale += + 0.1;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  drawSprites();
  fill("red");
  textSize(24);
  text("Score:~ " + score,650,20);

}

function spawnFood(){
  if(frameCount % 80===0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.lifetime=300;

    player.depth = banana.depth+1;
    foodGroup.add(banana);
  }

}
function spawnObstacles(){
   if(frameCount % 250===0){
     var obstacle = createSprite(400,300,25,25);
     obstacle.addImage(obstacleImage);
     obstacle.scale=0.3;
     obstacle.velocityX=-9;
     obstacle.lifetime=300;

     player.depth = obstacle.depth+1;
     obstaclesGroup.add(obstacle);

   }
}
