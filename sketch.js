function preload(){

// Load All Images
 bg=loadImage("bg.jpg");
 IronManImg=loadImage("Iron.png");
 stoneI=loadImage("stone.png");
 diamondI=loadImage("diamond.png");
 spikeI=loadImage("Spikes.png");

}

function setup(){
     
    //Create the canvas
    createCanvas(1200,600);

    //Create Background
    back=createSprite(600,300,1200,600);
    back.addImage(bg);
    
    //Create Iron Man and Adjust Image
    IronMan=createSprite(random(300,700),450,80,200);
    IronMan.addImage(IronManImg);
    IronMan.scale=0.25;
    IronMan.setCollider("rectangle",20,0,250,850);

    //Creating Stones and Diamonds group
    stoneGroup=new Group();
    spikes=new Group();
    diamonds=new Group();

    //Create all edges
    edges=createEdgeSprites();

    //Initializing Score to 0 
    Score=0;

}

function draw(){

//Make Scrollable background from top to bottom
back.velocityY=5+(0.005*frameCount);
if(back.y>1000){
    back.y=700;
}
//Make background and draw all Sprites
background(0);
drawSprites();

//Display Scores with all styles
textSize(40);
strokeWeight(2.5);
stroke("crimson") 
fill("whitesmoke")
text("Diamonds 💎💎💎: "+Score,700,60); 

//Make Iron Man Move up Using up arrow
if(keyDown("up")){
    IronMan.velocityY=-10;
}

//Make Iron Man Move left Using left arrow
if(keyDown("left")){
    IronMan.velocityX=-6;
    IronMan.velocityY=0;
}

//Make Iron Man Move right Using right arrow
if(keyDown("right")){
    IronMan.velocityX=6;
    IronMan.velocityY=0;
}

//Make Iron Man Bounce off edges and Give Gravity
IronMan.bounceOff(edges)
IronMan.velocityY+=0.275;

//Colliding Iron Man With Stones(Whole of the Stone Group)
for(var s=0;s<stoneGroup.length;s++){
    currentStone=stoneGroup[s];
    currentStone.collide(IronMan);  
    }

//Check For Collecting Diamonds
for(var d=0;d<diamonds.length;d++){
    currentDiamond=diamonds[d];
    if(IronMan.isTouching(currentDiamond)){
    Score+=Math.round(random(50,100));
    currentDiamond.destroy();
    }
}

//Check For Spikes Colliding With Iron Man
for(var p=0;p<spikes.length;p++){
    currentSpike=spikes[p];
    if(IronMan.isTouching(currentSpike)){
    Score-=Math.round(random(50,100));
    currentSpike.destroy();
    }
}

//Generate Stones And Add Them To Stones Group
if(frameCount%45==0){
    stone=createSprite(random(100,1100),random(50,300),150,30);
    stone.addImage(stoneI);
    stone.lifetime=400;
    stone.scale=0.1;
   
    stone.velocityY=back.velocityY;
    stoneGroup.add(stone);
}

//Generate Diamons And Add Them To Diamonds Group
if(frameCount%75==0){
    diamond=createSprite(random(250,800),random(0,250),50,50);
    diamond.addImage(diamondI);
    diamond.lifetime=400;
    diamond.scale=0.25;
    diamond.velocityY=back.velocityY;
    diamonds.add(diamond);
}
 
//Generate Spikes And Add Them To Stones Group
if(frameCount%40==0){
    spike=createSprite(random(150,1100),0,50,50);
    spike.addImage(spikeI);
    spike.lifetime=400;
    spike.scale=0.125;
    spike.velocityY=back.velocityY;
    spikes.add(spike);
}

}