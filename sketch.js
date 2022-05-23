var gameOver, restart, gameOverImg, restartImg;
var obsgroup
var play = 1;
var end = 0;
var gameState = play;
var score = 0;
var trex, anitrex, trexcoll;
var chao, anichao, invcha;
var nuvem, aninu, nuvemgroup;
var obs1, obs2, obs3, obs4, obs5, obs6
function preload(){
  anitrex = loadAnimation("trex1.png","trex3.png","trex4.png");
  anichao = loadImage("ground2.png");  
  aninu = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage ("gameOver.png");
  trexcoll = loadAnimation("trex_collided.png")
  }

function setup(){
  createCanvas(600,200);
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.5;

  restart = createSprite(300, 100);
  restart.addImage(restartImg)
  restart.scale = 0.5;

  trex = createSprite (300,165,20,20);
  chao = createSprite (200,190,600,20);
  trex.addAnimation ("trex_correndo",anitrex);
  trex.scale = 0.30
  chao.addImage("chao",anichao)
  chao.x = chao.width /2;
  invisibleGround = createSprite(200,190,400, 10);
  invisibleGround.visible = false
  obsgroup = createGroup();
  nuvemgroup = createGroup();

  trex.setColider("circle", 0, 0, 40)
  trex.debug = true;
}

function draw(){
  background("black");
  text("pontuação: " + score, 400, 25)
  
  if(gameState === play){
    chao.velocityX = -4
    score = score + Math.round(frameCount/60);
    if(chao.x < 0){
      chao.x = chao.width / 2;
      }

    if(keyDown("space") && trex.y >= 100){
      trex.velocityY = -5;
     
    }
    trex.velocityY = trex.velocityY +0.8
    spawnNuvens();
    spawnObstacle();
    if(obstacleGroup.isToching(trex)){
      gameState = end;
    }

  }
  else if (gameState === end) {
    chao.velocityX = 0;
    trex.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex);
    obsgroup .setVelocityXEach(0);
    nuvemgroup .setVelocityXEach(0);
  }
  if(score == 5000){
    background ("white");
  }
  trex.collide(invisibleGround);

  drawSprites();
}
function spawnNuvens(){
  if(frameCount % 60 === 0){
    nuvem = createSprite (600, 100, 40, 10);
    nuvem.addImage("nuvem",aninu)
    nuvem.y = Math.round(random(10,60))
    nuvem.scale = 0.5
    nuvem.velocityX = -3;
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
    nuvem.lifetime = 200;
    nuvemgroup.add(nuvem);
  }

}
function spawnObstacle(){

   if(frameCount % 60 === 0) { 
     var obstacle = createSprite(400, 165, 10, 40);
     obstacle.velocityX = -6;
     var rand = Math.round(random(1,6));
      switch(rand) {
      case 1: obstacle.addImage(obs1); 
      break; 
      case 2: obstacle.addImage(obs2); 
      break; 
      case 3: obstacle.addImage(obs3); 
      break; 
      case 4: obstacle.addImage(obs4); 
      break; 
      case 5: obstacle.addImage(obs5); 
      break; 
      case 6: obstacle.addImage(obs6); 
      break; 
      default: break;  
       }
       obstacle.scale = 0.5;
       obstacle.lifetime = 300; 
       obsgroup.add(obstacle);
      }
}

























