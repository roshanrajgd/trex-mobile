var twreset,resetb
var jump,die,cp;
var wastephoto,wastephoto2;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var cloudgroup;
var cactusgroup;
var score = 0;
var cactus1,cactus2,cactus3;
var cactus6,cactus5,cactus4;
var ground,groundimage;
var treximage;
var trex;
var inv;
var roshan =["roshan",7,"D",24]
function preload(){
  treximage=loadAnimation("trex1.png","trex2.png","trex3.png");
  groundimage=loadImage("ground2.png");
  cloudimg = loadImage ("cloud.png");
  cactus1 = loadImage ("obstacle1.png");
  cactus2 = loadImage ("obstacle2.png");
  cactus3 = loadImage ("obstacle3.png");
  cactus4 = loadImage ("obstacle4.png");
  cactus5= loadImage ("obstacle5.png");
  cactus6 = loadImage ("obstacle6.png");
  wastephoto2 = loadImage ("waste_photo-removebg-preview.png");
  jump = loadSound ("jump.mp3");
  die = loadSound ("die.mp3");
  cp = loadSound ("checkPoint.mp3");
  twreset = loadImage ("waste_reset-removebg-preview.png");

}

function setup() 
{
  //create canvas
  createCanvas(windowWidth,windowHeight);
  
  //trex properties
  trex = createSprite (50,160,10,100);
  trex.addAnimation ("trexrun",treximage);
  trex.scale = 0.5;
  trex.debug = false;
  trex.setCollider ("circle",0,0,37);

  //ground properties
  ground = createSprite(width-300,height-30,width,20);
  ground.addImage ("groundmove",groundimage);

  //inv properties
  inv = createSprite(width/2,height-20,width,5);
  inv.visible=false;

  //forloop();

  //examples for random
  var example = Math.round(random(1,100))
  console.log(example)
  //cloud group create
  cloudgroup = new Group();
  cactusgroup = new Group();
  
  //wastephoto properties
  wastephoto = createSprite (width/2,height/2,0,0);
  wastephoto.scale = 1;
  wastephoto.addImage ("gameover",wastephoto2);
  wastephoto.visible = false;
  edges = createEdgeSprites()
  
 resetb = createSprite (width/2,height/2+50,0,0);
 resetb.scale = 1;
 resetb.addImage ("reset",twreset);
 resetb.visible = false;

  
}


function draw() 
{
  //backround
background("white");
if (gamestate === PLAY){

 //trex properties
if (keyDown("space")&&trex.y >=height-109||touches.length>0){
  trex.velocityY = -10;
  jump.play();
  touches=[]
}
trex.velocityY = trex.velocityY + 0.7;

//ground properties
ground.velocityX = -(5+score/100);
if (ground.x<0){
  ground.x = ground.width /2;
}
//score 
score = score + Math.round (getFrameRate()/60);
if (score > 0 && score % 100 === 0){
  cp.play();
}
//clouds and cactus
spawncactus();
spawnclouds();

if (cactusgroup.isTouching(trex)){
   gamestate = END;
   die.play();

}
}

else if (gamestate === END){
 // trex.velocityY = 0;
  ground.velocityX = 0;
  cactusgroup.setVelocityXEach(0);
  cloudgroup.setVelocityXEach(0);
  cactusgroup.setLifetimeEach(-1);
  cloudgroup.setLifetimeEach(-1);
  wastephoto.visible = true;
  background("purple")
  resetb.visible = true;
  
}

if (mousePressedOver(resetb)||touches.length>0){
  gamestate = PLAY;
  cactusgroup.destroyEach();
  cloudgroup.destroyEach();
  score = 0;
  resetb.visible = false;
  wastephoto.visible = false;
  touches = []
}



trex.collide (inv  )

drawSprites ();
text ("score = "+ score,500,50);
}

function spawnclouds(){
  if(frameCount%60===0){
  var cloud = createSprite (width,height-100);
  cloud.scale = 0.8;
  cloud.velocityX = -2;
  cloud.addImage("cloud",cloudimg)
  cloud.y =  Math.round(random(30,100))
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud.lifetime = 700;
  cloudgroup.add(cloud);
  }
  

}
function spawncactus(){
  if(frameCount%100===0){
    var cactus = createSprite (width,height-40);
    cactus.velocityX = -(5+score/100);
    var rand =  Math.round(random(1,6))
    switch(rand){
      case 1 :cactus.addImage ("cactus",cactus1);cactus.scale = 0.5;break;
      case 2 :cactus.addImage ("cactus",cactus2);cactus.scale = 0.5;break;
      case 3 :cactus.addImage ("cactus",cactus3);cactus.scale = 0.5;break;
      case 4 :cactus.addImage ("cactus",cactus4);cactus.scale = 0.5;break;
      case 5 :cactus.addImage ("cactus",cactus5);cactus.scale = 0.3;break;
      case 6 :cactus.addImage ("cactus",cactus6);cactus.scale = 0.3;break;
      default: break;}
      cactus.lifetime = 600;
      cactusgroup.add(cactus);
      cactus.debug = false;
      /*if (cactus.isTouching(edges[0])){
        cactus.destroy()
      }*/
  }
  
}
   
