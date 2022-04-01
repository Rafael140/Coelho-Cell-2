const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;

var fruit, melancia;

var linkagem, link2 , link3;

var ropeObj, rope2, rope3;

var coelhoImg, coelho, fundo;

var button, button2, button3;

var blink, eat, sad;

var musica, comendo, triste, ar, cordaR ,paraMusica;

var canW, canH;

function preload(){

  fundo = loadImage("/assets/background.png");
  melancia = loadImage("/assets/melon.png");
  coelhoImg = loadImage("/assets/Rabbit-01.png");

  musica = loadSound("assets/sound1.mp3");
  comendo = loadSound("assets/eating_sound.mp3");
  triste = loadSound("assets/sad.wav");
  ar = loadSound("assets/air.wav"); 
  cordaR = loadSound("assets/rope_cut.mp3");

  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png"," assets/blink_3.png");
  eat = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png");
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  eat.looping = false;
  sad.looping = false;
}

function setup() {

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth + 80, displayHeight)
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
    // createCanvas(375, 750);
  }


  frameRate(80);

  musica.play();
  musica.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200, canH, 600, 20);

  //imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  ropeObj = new Rope(7, {x:50 ,y:100})
  rope2 = new Rope(6, {x:250 ,y:100 })
  rope3 = new Rope(4 ,{x:300 ,y:250 })
  
  fruit = Bodies.circle(250, 200, 15, {density: 0.0001});
  Matter.Composite.add(ropeObj.body, fruit);
  World.add(world, fruit);

  linkagem = new Link(ropeObj, fruit);
  link2 = new Link(rope2, fruit);
  link3 = new Link(rope3, fruit);

  blink.frameDelay = 19;
  eat.frameDelay = 19;
  sad.frameDelay = 19;

  coelho = createSprite(250, canH - 80, 50, 50);
  //coelho.addImage("coelhoImg", coelhoImg);
  coelho.scale = 0.25;
  coelho.addAnimation("pisca", blink);
  coelho.addAnimation("come", eat);
  coelho.addAnimation("triste", sad);

  button = createImg("/assets/cut_button.png");
  button.position(25, 100);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("assets/cut_button.png")
  button2.position(225, 75);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg("assets/cut_button.png")
  button3.position(275, 225);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  paraMusica = createImg("assets/mute.png");
  paraMusica.position(320, 50);
  paraMusica.size(40,40);
  paraMusica.mouseClicked(pararMusica);
}

function draw() {

  background(51);

  image(fundo, 0, 0, canW + 80, canH);
  
  //ground.show();
  
  Engine.update(engine);
  
  ropeObj.show();
  rope2.show();
  rope3.show();
 
  push();
  imageMode(CENTER);
  if(fruit != null){
    image(melancia, fruit.position.x, fruit.position.y, 60, 60);
  }
  pop();

  if(collide(fruit, coelho) == true){
    coelho.changeAnimation("come");
    comendo.play();
  }
  if(fruit != null && fruit.position.y >= 680){
    coelho.changeAnimation("triste");
    triste.play();
    fruit = null;
    musica.stop();
  }

  drawSprites();
}

function drop(){

  ropeObj.break();
  linkagem.detach();
  linkagem = null;
  cordaR.play();

}

function drop2(){

  rope2.break();
  link2.detach();
  link2 = null;
  cordaR.play();

}

function drop3(){

  rope3.break();
  link3.detach();
  link3 = null;
  cordaR.play();

}

function collide(body, sprite){

  if(body != null){
  
    var colidiu = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);

    if(colidiu <= 30){
      World.remove(world, fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}

function pararMusica(){

  if(musica.isPlaying()){
    musica.stop();
  }else{
    musica.play();
  }

}

