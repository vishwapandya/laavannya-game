var Bg
var BgImage
var Princess
var princessImage
var sparkle
var sparkleImage
var snailImage
var sparkleGroup
var snailGroup
var tower
var towerImage
var score = 0
var turtleImage
var turtleGroup
var gameOverImage
var RestartImage
var gameover
var restart
var play = 0
var end = 1
var gamestate = play
var count = 0
var backgroundSound
var sparkleSound
var dragon
var dragonImage
var dragonSound
var gameoverSound


function preload(){
  BgImage = loadImage("41524.jpg")
  princessImage = loadImage("running_princess-removebg-preview.png")
  sparkleImage=loadImage("sparkle.png")
  snailImage = loadImage("snail_image-removebg-preview.png")
  towerImage = loadImage("tower.png")
  turtleImage = loadImage("turtle.png")
gameOverImage = loadImage("GameOver.png")
RestartImage = loadImage("restart.png")
backgroundSound = loadSound("backgroundMusic.mp3")
sparkleSound = loadSound("fairysparkle.wav")
dragonImage = loadImage("dragon.png")
dragonSound = loadSound("dragon.mp3")
gameoverSound = loadSound("gameoversound.wav")
}

function setup(){
  
  createCanvas(800,500)
  
  bg = createSprite(700,60)
  bg.addImage(BgImage)
  bg.scale=0.275
  
  Princess = createSprite(100,380)
  Princess.addImage(princessImage)
  Princess.scale=0.8
  Princess.debug = false
  
  tower = createSprite(700,250)
  tower.addImage(towerImage)
 
  tower.visible = false
  tower.scale=1.2
  tower.debug = false
  tower.setCollider("rectangle",0,0,100,150)

gameover = createSprite(650,150)
gameover.addImage(gameOverImage)
gameover.visible = false
gameover.scale=0.5

restart = createSprite(650,300)
restart.addImage(RestartImage)
restart.visible = false
restart.scale = 0.4

//dragon=createSprite(700,50)
//dragon.addImage(dragonImage)
//dragon.scale = 0.5

  
  Princess.depth = tower.depth+1
  
  
  
  sparkleGroup = new Group()
  snailGroup = new Group()
  turtleGroup = new Group()
  dragonGroup = new Group()
  
}

function draw(){
 background("white")

 if(gamestate ===play){
   count = count+1
   bg.velocityX=-1
    //backgroundSound.play()
  
  if(bg.x<100){
    bg.x = 390
  }

  console.log(count)
  
  if(keyDown("space")){
    createSparkle() 
     sparkle.visible = false
   }
   if(keyDown(DOWN_ARROW)){
      sparkle.visible = true
 sparkle.y=sparkle.y+2
   }
    if(keyDown(UP_ARROW)){
      sparkle.visible = true
 sparkle.y=sparkle.y-2
   }
    if(keyDown(RIGHT_ARROW)){
      sparkle.visible = true
 sparkle.x=sparkle.x+2
   }
  
  for(var i = 0;i<snailGroup.length;i++){
    if(snailGroup.get(i).isTouching(sparkleGroup)){
      snailGroup.get(i).destroy()
      sparkleGroup.destroyEach()
      score = score+20
      sparkleSound.play()
    }
  }


  for(var p = 0;p<turtleGroup.length;p++){
    if(turtleGroup.get(p).isTouching(sparkleGroup)){
     turtleGroup.get(p).destroy()
      sparkleGroup.destroyEach()
      score = score+20
      sparkleSound.play()
    }
  }
  for(var q = 0;q<dragonGroup.length;q++){
    if(dragonGroup.get(q).isTouching(sparkleGroup)){
     dragonGroup.get(q).destroy()
      sparkleGroup.destroyEach()
      score = score+20
      sparkleSound.play()
    }
  }

  if(count ===1000){
    tower.velocityX = -1
    tower.x = 700
    tower.visible = true
  }
  
  if(tower.visible===false){
    Snail()
    turtle()
    dragon()
  }
  
  if(Princess.isTouching(tower)||Princess.isTouching(snailGroup)||Princess.isTouching(turtleGroup)||Princess.isTouching(dragonGroup)){
    gamestate = end
    gameoverSound.play()

  }
}
else if(gamestate === end){
  bg.velocityX = 0
    tower.velocityX = 0
    gameover.visible = true
    restart.visible=true
    turtleGroup.setVelocityXEach(0)
    snailGroup.setVelocityXEach(0)
    dragonGroup.setVelocityXEach(0)
    if(mousePressedOver(restart)){
      reset()
    }
}
  drawSprites()

  textSize(20)
  fill("black")
  textFont("comic sans ms")
  textStyle(BOLD)
  text("SCORE: "+score,20,40)
}

function createSparkle(){
  sparkle = createSprite(125,320)
  sparkle.addImage(sparkleImage)
  sparkle.velocityX = +3
  sparkle.lifetime=233
  sparkle.scale=0.2
  sparkleGroup.add(sparkle)
  
}

function Snail(){
  if(frameCount%100===0){
    var snail = createSprite(700,450)
    snail.addImage(snailImage)
    snail.velocityX = -2
    snail.scale=0.3
    //give lifetime to snail
    snail.lifetime = 230
    snailGroup.add(snail)
    
  }
}


function turtle(){
  if(frameCount%110===0){
    var turtle = createSprite(500,350)
    turtle.addImage(turtleImage)
    turtle.velocityX = -3
    turtle.scale=0.6
    turtle.lifetime = 230
    turtleGroup.add(turtle)
  }
}



function reset(){
  gamestate = play
  gameover.visible = false
  restart.visible = false
  snailGroup.destroyEach()
    turtleGroup.destroyEach()
    dragonGroup.destroyEach()
    score = 0
    count = 0
    tower.x = 700
    tower.visible = false
  
}

function dragon(){
  if(frameCount%300===0){
    var dragon = createSprite(700,160)
    dragon.addImage(dragonImage)
    dragonSound.play()
    dragon.velocityX = -4
    dragon.scale=0.6
    dragonGroup.add(dragon)
  }
}








