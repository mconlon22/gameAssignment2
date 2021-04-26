//<reference path="libs/babylon.d.ts" />



const createScene =  () => {
    const scene = new BABYLON.Scene(engine);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0));
    var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
var physicsPlugin = new BABYLON.CannonJSPlugin();
var options = new BABYLON.SceneOptimizerOptions();
options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));
// Optimizer
var optimizer = new BABYLON.SceneOptimizer(scene, options);
scene.enablePhysics();

    return scene;
}
var questions=null
var selection=null
var correctSelection=null
var answersCorrect=0
var questionNumber=0
var i=0

function getQuestions(){

    questions=JSON.parse(window.localStorage.getItem("Questions"))
    console.log(questions)
}






function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}


//socket logic
let players = {};
let leaderboard = {}
var knockedOut=false
const socket = io("http://178.62.61.92:6600");
var room=''
var playerid=''
socket.on("connection", (socket) =>{
    console.log("connection")
})
socket.on("player_joined", ({playerid}) =>{
    console.log("playerid")
    console.log(playerid)
    players[playerid]=new Player(playerid)

    addPlayer(playerid)

    
})
socket.on("knockout", ({id,playerPunching}) =>{
    console.log("knockout" + id)
    if(playerid==id){
        knockedOut=true
        setTimeout(function () {knockedOut=false}, 2000)

    knockout(playerPunching)

    
}
})
socket.on("players", (playersobj) =>{
    console.log("players")
    console.log(playersobj)
    var list =document.getElementById('playerlist')
    playersobj.forEach(playername =>{
        addPlayer(playername)
        if(playername!=playerid){
                        
        players[playername]=new Player(playername)
        }
    })

})

socket.on("start_game", (nah) =>{

    document.getElementById('join_game').style.display ='none'
    nextQuestion()
    
})
socket.on("score", ({playerid,playerscore}) =>{
    leaderboard[playerid] = playerscore
    drawScoreboard()
    console.log("player " + playerid + " scored " + playerscore)    
})
socket.on("player_moved", ({playerid:playername,x,y,z}) =>{


    players[playername].movePlayer(x,y,z)
})

function addPlayer(playerid){
    leaderboard[playerid] =-1
    var list =document.getElementById('playerlist')
    var list1 =document.getElementById('playerlist1')

    const playeritem=document.createElement('li')
    const playeritem1=document.createElement('li')

    playeritem.innerHTML=playerid
        playeritem1.innerHTML=playerid
    list.appendChild(playeritem)
    list1.appendChild(playeritem1)
   

    

}





 ///handing the socket  gui
                document.getElementById('single').addEventListener('click', function (evt) {
                    document.getElementById('gui').style.display = "none"
                    nextQuestion()
                })
                 document.getElementById('multi').addEventListener('click', function (evt) {
                    document.getElementById('gui').style.display = "none"
                    document.getElementById('multigui').style.display = "block"

                })
                 document.getElementById('create').addEventListener('click', function (evt) {
                    document.getElementById('multigui').style.display = "none"
                    document.getElementById('create1').style.display = "block"
                    playerid=document.getElementById('username').value

                    room=makeid(4)
                    document.getElementById('gamepin').innerHTML =room
                    socket.emit('join_room',{room,playerid})

                })
                 document.getElementById('joinl').addEventListener('click', function (evt) {
                    document.getElementById('multigui').style.display = "none"
                    playerid=document.getElementById('username').value
                    document.getElementById('join').style.display = "block"
                })
                document.getElementById('joinGame').addEventListener('click', function (evt) {
                    document.getElementById('join').style.display = "none"
                    room=document.getElementById('pin').value
                    document.getElementById('join_game').style.display ='block'
                    socket.emit('join_room',{room,playerid})

                })
                document.getElementById('startGame').addEventListener('click', function (evt) {
                    console.log('start game')
                    document.getElementById('create1').style.display ='none'
                    socket.emit('start_game',{room})
                    nextQuestion()

                })
                 document.getElementById('scoreboard').addEventListener('click', function (evt) {
                    console.log('scoreboard')
                    document.getElementById('scoreboardcard').style.display ='block'
                    drawScoreboard()

                })
                function drawScoreboard() {
                    document.getElementById('answers').style.display ='none'

                                var list=document.getElementById('scorelist')

                    console.log(leaderboard)
                     while (list.firstChild) {
                        list.removeChild(list.lastChild);
                    }
                    for (var key in leaderboard) {
                        const value=leaderboard[key]
                        console.log(key)
                    var element=document.createElement('li',)

                    if(value!=-1){
                    element.innerHTML=key+'     '+value
                    }
                    else{
                        console.log(key+'     Not Finished')
                        element.innerHTML=key+'     Not Finished'
                    }
                    list.appendChild(element)
                    }
                }
        







getQuestions()






  const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
        // Add your code here matching the playground format
        const scene = createScene(); //Call the createScene function
        // Register a render loop to repeatedly render the scene
         var manager = new BABYLON.GUI.Container();
         
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
   
document.getElementById('forward').style.display ='block'
document.getElementById('backward').style.display ='block'
document.getElementById('left').style.display ='block'
document.getElementById('right').style.display ='block'
document.getElementById('punch').style.display ='block'



}


const forwardbtn=document.getElementById('forward')
const backwardbtn=document.getElementById('backward')
const leftbtn=document.getElementById('left')
const rightbtn=document.getElementById('right')
const punchbtn=document.getElementById('punch')


var forward=false
var backward=false
var left=false
var right=false
var punch=false
punchbtn.ontouchstart=() => {
    punch = true
}
punchbtn.ontouchend=() => {
    punch=false
}

forwardbtn.ontouchstart=() => {
    forward = true
}
forwardbtn.ontouchend=() => {
    forward=false
}
backwardbtn.ontouchstart=() => {
    backward = true
}
backwardbtn.ontouchend=() => {
    backward=false
}
leftbtn.ontouchstart=() => {
    left = true
}
leftbtn.ontouchend=() => {
    left=false
}
rightbtn.ontouchstart=() => {
    right = true
}
rightbtn.ontouchend=() => {
    right=false
}

        
        //creating the question box

//question plane


    var font_type = "Arial";
	
	//Set width an height for plane
    var planeWidth = 50;
    var planeHeight = 10;

    //Create plane
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, scene);
   

    //Set width and height for dynamic texture using same multiplier
    var DTWidth = planeWidth * 60;
    var DTHeight = planeHeight * 60;

    //Set text
    var text = "What is the largest country in the world?";
    
    //Create dynamic texture
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene);

    //Check width of text for given font type at any size of font
    var ctx = dynamicTexture.getContext();
	var size = 70; //any value will work
    ctx.font = size + "px " + font_type;
    var textWidth = ctx.measureText(text).width;
    
    //Calculate ratio of text width to size of font used
    var ratio = textWidth/size;
	
	//set font to be actually used to write text on dynamic texture
    var font_size = Math.floor(DTWidth / (ratio * 1)); //size of multiplier (1) can be adjusted, increase for smaller text
    var questionFont = font_size + "px " + font_type;
	
	//Draw text
 var myMaterial = new BABYLON.StandardMaterial("mat", scene);
    myMaterial.diffuseTexture = dynamicTexture;
    
    //apply material
    plane.material = myMaterial;
    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);

    plane.position.y=40
    plane.position.z=20

//answer pane 1

font_type = "Arial";
    planeWidth = 12;
    planeHeight = 10;

DTWidth = planeWidth * 60;
DTHeight = planeHeight * 60;
size = 140; 



var answerPlane = BABYLON.MeshBuilder.CreatePlane("answerplane", {width:planeWidth, height:planeHeight}, scene);
var answerTexture = new BABYLON.DynamicTexture("answerTexture", {width:DTWidth, height:DTHeight}, scene,true);
answerTexture.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
answerTexture.drawText('1', null, null, size + "px " + font_type,  "white", null, true);
var answerMaterial = new BABYLON.StandardMaterial("answerMat", scene);
answerMaterial.useAlphaFromDiffuseTexture = true;
answerMaterial.diffuseTexture = answerTexture;
answerPlane.material = answerMaterial;
answerPlane.material.diffuseTexture.hasAlpha = true;
answerPlane.useAlphaFromDiffuseTexture = true;
answerPlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
answerPlane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
var context2D = answerTexture.getContext();
context2D.clearRect(0, 200, 512, 512);
answerPlane.material.backFaceCulling = false;


answerPlane.position.y=20
answerPlane.position.z=30
answerPlane.position.x=-25


//answerpane2
var answerPlane2 = BABYLON.MeshBuilder.CreatePlane("answerplane", {width:planeWidth, height:planeHeight}, scene);
var answer2Texture = new BABYLON.DynamicTexture("answerTexture", {width:DTWidth, height:DTHeight}, scene,true);
answer2Texture.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
answer2Texture.drawText('2', null, null, size + "px " + font_type,  "white", null, true);
var answerMaterial = new BABYLON.StandardMaterial("answerMat", scene);
answerMaterial.useAlphaFromDiffuseTexture = true;
answerMaterial.diffuseTexture = answer2Texture;
answerPlane2.material = answerMaterial;
answerPlane2.material.diffuseTexture.hasAlpha = true;
answerPlane2.useAlphaFromDiffuseTexture = true;
answerPlane2.material.specularColor = new BABYLON.Color3(0, 0, 0);
answerPlane2.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
var context2D = answer2Texture.getContext();
context2D.clearRect(0, 200, 512, 512);
answerPlane2.material.backFaceCulling = false;

answerPlane2.position.y=20
answerPlane2.position.z=30
answerPlane2.position.x=-10



//answerpane3
var answerPlane3 = BABYLON.MeshBuilder.CreatePlane("answerplane", {width:planeWidth, height:planeHeight}, scene);
var answer3Texture = new BABYLON.DynamicTexture("answerTexture", {width:DTWidth, height:DTHeight}, scene,true);
answer3Texture.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
answer3Texture.drawText('3', null, null, size + "px " + font_type,  "white", null, true);
var answer3Material = new BABYLON.StandardMaterial("answerMat", scene);
answer3Material.useAlphaFromDiffuseTexture = true;
answer3Material.diffuseTexture = answer3Texture;
answerPlane3.material = answer3Material;
answerPlane3.material.diffuseTexture.hasAlpha = true;
answerPlane3.useAlphaFromDiffuseTexture = true;
answerPlane3.material.specularColor = new BABYLON.Color3(0, 0, 0);
answerPlane3.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
var context2D = answer3Texture.getContext();
context2D.clearRect(0, 200, 512, 512);
answerPlane3.material.backFaceCulling = false;

answer3Material.useAlphaFromDiffuseTexture = true;
answer3Material.diffuseTexture = answer3Texture;
answerPlane3.position.y=20
answerPlane3.position.z=30
answerPlane3.position.x=5



//answerpane4
var answerPlane4 = BABYLON.MeshBuilder.CreatePlane("answerplane", {width:planeWidth, height:planeHeight}, scene);
var answer4Texture = new BABYLON.DynamicTexture("answerTexture", {width:DTWidth, height:DTHeight}, scene,true);
answer4Texture.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
answer4Texture.drawText('4', null, null, size + "px " + font_type,  "white", null, true);
var answer3Material = new BABYLON.StandardMaterial("answerMat", scene);
answer3Material.useAlphaFromDiffuseTexture = true;
answer3Material.diffuseTexture = answer4Texture;
answerPlane4.material = answer3Material;
answerPlane4.material.diffuseTexture.hasAlpha = true;
answerPlane4.useAlphaFromDiffuseTexture = true;
answerPlane4.material.specularColor = new BABYLON.Color3(0, 0, 0);
answerPlane4.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
var context2D = answer4Texture.getContext();
context2D.clearRect(0, 200, 512, 512);
answerPlane4.material.backFaceCulling = false;

answerPlane4.position.y=20
answerPlane4.position.z=30
answerPlane4.position.x=20
       var answerTextures=[answerTexture,answer2Texture,answer3Texture,answer4Texture]





    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
        camera.checkCollisions = true;
    scene.collisionsEnabled = true;

    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 40;
camera.upperRadiusLimit = 50;
    var astronaut=null
    var runningAnim = null
        var righthookAnim = null
            var knockoutAnim = null


        var idleAnim = null

        var faceColors = new Array(6);
  faceColors[4] = new BABYLON.Color4(0,1,0,1);   // red top

        var goptions = {
   width: 70, 
   height: 1,
    depth: 70,
    faceColors : faceColors
  };
    var image = BABYLON.MeshBuilder.Create
   var ground = BABYLON.MeshBuilder.CreateBox("ground", goptions, scene);

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1 , restitution: 0 }, scene);
            ground.checkCollisions = false;
             var grassMaterial = new BABYLON.StandardMaterial(name + "bawl", scene);
class Player {
  constructor(playerid) {
    this.playerid= playerid
    BABYLON.SceneLoader.ImportMesh('', "game/3dAssets/", "astronaut13.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        const player = newMeshes[0];
        newMeshes[0].position.y=0
        newMeshes[0].name=playerid
        //Scale the model down        
        player.scaling.scaleInPlace(4);
        //Lock camera on the character 
        //Get the Samba animation Group
        var skeleton = skeletons[0];
        // do something
    });


       


            
            }

    getPlayerId(){
        return this.playerid
    }
    
  getLocation(){
                  var mesh = scene.getMeshByName(this.playerid)
    return mesh.position
  }


     movePlayer(x,y,z){
            var mesh = scene.getMeshByName(this.playerid)

            mesh.position.x =x
            mesh.position.y =y
            mesh.position.z =z

    }
 };

        let collider = BABYLON.MeshBuilder.CreateBox("collider", {size: 3}, scene);
        collider.visability=0
        collider.actionManager = new BABYLON.ActionManager(scene);
 var materialSphere = new BABYLON.StandardMaterial("texture2", scene);
        materialSphere.diffuseColor = new BABYLON.Color3(0, 0, 0); //Red
        materialSphere.alpha = 0;
        collider.material = materialSphere;






     BABYLON.SceneLoader.ImportMesh('', "game/3dAssets/", "astronaut13.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        astronaut = newMeshes[0];
        newMeshes[0].position.y=0
        newMeshes[0].name='astronaut'
        //Scale the model down        
        astronaut.scaling.scaleInPlace(4);
        //Lock camera on the character 
        camera.target = astronaut;
        //Get the Samba animation Group
        runningAnim = scene.getAnimationGroupByName("run");
        righthookAnim = scene.getAnimationGroupByName("righthook");
        knockoutAnim = scene.getAnimationGroupByName("knockout");

        idleAnim = scene.getAnimationGroupByName("idle");

        var skeleton = skeletons[0];

        var unit = newMeshes[0];
        unit.showBoundingBox = true;

        var yBot = newMeshes[1]
        // yBot.showBoundingBox = true;

        unit.position.y = 2;
        yBot.position.y = 0;
        unit.parent = null;

        unit.physicsImpostor = new BABYLON.PhysicsImpostor(unit, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1 ,height:2,width:1}, scene);
        collider.parent=unit
     })
     BABYLON.SceneLoader.ImportMesh('', "game/3dAssets/", "arch.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        exit=newMeshes[0]
        exit.name='arch1'
        exit.position.x = -25;
        exit.position.y = 0;
        exit.position.z =30;
        
    let action = new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
            parameter: { 
                mesh: exit
            }
        },
        (evt) => {
            selection=1
            console.log(selection)
        }
    );
        collider.actionManager.registerAction(action);

  
    });
     BABYLON.SceneLoader.ImportMesh('', "game/3dAssets/", "arch.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        exit=newMeshes[0]
        exit.name='arch2'
        exit.material = myMaterial;
        exit.position.x = -10;
        exit.position.y = 0;
        exit.position.z =30;
        let action = new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
            parameter: { 
                mesh: exit
            }
        },
        (evt) => {
            selection=2
                        console.log(selection)

        }
    );
        collider.actionManager.registerAction(action);
    });

 BABYLON.SceneLoader.ImportMesh('', "game/3dAssets/", "arch.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        exit=newMeshes[0]
        exit.name='arch3'
        exit.material = myMaterial;
        exit.position.x = 5;
        exit.position.y = 0;
        exit.position.z =30;
        let action = new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
            parameter: { 
                mesh: exit
            }
        },
        (evt) => {
            selection=3
                        console.log(selection)

        }
    );
        collider.actionManager.registerAction(action);
    });
 BABYLON.SceneLoader.ImportMesh('', "game/3dAssets/", "arch.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        exit=newMeshes[0]
        exit.name='arch4'
        exit.material = myMaterial;
        exit.position.x = 20;
        exit.position.y = 0;
        exit.position.z =30;
        let action = new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
            parameter: { 
                mesh: exit
            }
        },
        (evt) => {
            selection=4
        }
    );
        collider.actionManager.registerAction(action);
    });






 















                var animating=false
                var keydown=false
                var inputMap = {};
                scene.actionManager = new BABYLON.ActionManager(scene);
                scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                }));
                scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                }));

               





        
        
        
        
            //draw the image to the mesh
        
        function knockout(playerPunching){
            var knockoutText=document.getElementById('knockout')
            knockoutText.innerHTML=playerPunching+' KNOCKED YOU OUT'
            knockoutText.style.display = "block";
            setTimeout(function () {document.getElementById('knockout').style.display = "none";}, 2000)
            knockoutText.display=""
            knockoutAnim.start(true, 1.0, knockoutAnim.from, knockoutAnim.to, false);
        }

        function checkForKnockout(){
            if(animsLoaded()){
            const playerLocation=scene.getMeshByName('astronaut').position
            for (const [key, value] of Object.entries(players)) {
                const location=value.getLocation()
                if(BABYLON.Vector3.Distance(playerLocation, location)<5){
                    console.log("player knocked" +key)
                    socket.emit('knockout',{room,playerid:key,playerPunching:playerid})
                }
            }}
        }


                animating=false
        engine.runRenderLoop(function () {
                keydown=false
                mesh= scene.getMeshByName('astronaut')
                if(scene.getMeshByName('astronaut')!=null){
                    if(scene.getMeshByName('astronaut').position.y<-20)
                    { 

                        mesh.position.x = 0; //(2, 2, 1)
                    mesh.position.y = 20; //(2, 3, 1)
                    mesh.position.z = 0;
                    if(selection!=null){

                        nextQuestion()
                        }

                    }
                   mesh.rotationQuaternion.x=0
                    mesh.rotationQuaternion.z=0
                    }
                
                if(!animating&&!knockedOut){
                if (inputMap["w"]|| forward) {
                    astronaut.moveWithCollisions(astronaut.forward.scaleInPlace(.15));
                    keydown = true;
                }
                if (inputMap["s"]||backward) {
                    astronaut.moveWithCollisions(astronaut.forward.scaleInPlace(-.15));
                    keydown = true;
                }
                if (inputMap["a"]||left) {
                    astronaut.rotate(BABYLON.Vector3.Up(), -.15);
                    keydown = true;
                }
                if (inputMap["d"]||right) {
                    astronaut.rotate(BABYLON.Vector3.Up(), .15);
                    keydown = true;
                }
                if (inputMap["b"]) {
                    keydown = true;
                }
                 if (inputMap["e"]||punch) {
                    keydown = true;
                }
                if(keydown){

                    socket.emit('moved',{room,playerid,x:astronaut.position.x,y:astronaut.position.y,z:astronaut.position.z})
                }
                if(animsLoaded())
              {  if (keydown) {
                    if (!animating) {
                        if (inputMap["w"]|| forward) {
                            //Walk backwards
                            runningAnim.start(true, 1.0, runningAnim.from, runningAnim.to, false);

                        }
                         if (inputMap["e"]||punch) {
                            //Walk backwards
                            checkForKnockout()
                            setTimeout(function () {animating=false;}, 1000)
                            animating=true;
                            righthookAnim.start(true, 2.0, righthookAnim.from, righthookAnim.to, false);
                            punch=false
                        }
                        else if
                            (inputMap["b"]) {
                            //Samba!
                            runningAnim.start(true, 1.0, runningAnim.from, runningAnim.to, false);

                        }
                    }
                      
                }
                 else {
                            if(!knockedOut&&!animating){
                            scene.stopAllAnimations()
                            idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
                        }
                        }
                        }
                }
                scene.render();
                
        });

        window.addEventListener("resize", function () {
                engine.resize();
        });

        scene.clearColor = new BABYLON.Color3(0,.5, 1);

        const options = {
            width:50,
            height:50,
            updatable:false,
            subdivisions:2
        }
       

function playPlayerAnimation(name,anim){
    switch(name){
        case "upper":

    }
}

function animsLoaded(){
    if(runningAnim!=null){
        return true
    }
    else{
        return false
    }
}
var choseOption=false



function nextQuestion(){
    console.log('nextQuestion')
    if((selection!=null||questionNumber==0)&&questionNumber<questions.length){
        var textures=[...answerTextures];
        console.log('drawing')
        if(selection==correctSelection&&selection!=null){
            console.log('correct')
            document.getElementById('correct').style.display = "block";
            setTimeout(function () {document.getElementById('correct').style.display = "none";}, 2000)
            questions[questionNumber-1].correct=true
            answersCorrect++
        }
        if(selection!=correctSelection&&selection!=null){
            console.log('wrong')
              document.getElementById('incorrect').style.display = "block";
            setTimeout(function () {document.getElementById('incorrect').style.display = "none";}, 2000)
            questions[questionNumber-1].correct=false

        }
         dynamicTexture.drawText(questions[questionNumber].question, null, null, questionFont,  "white", null, true);
         i = textures.length,
        j = 0;
        
        const title = document.getElementById('title')
        while (title.firstChild) {
            title.removeChild(title.lastChild);
          }
        var atitle = document.createElement("h2");
        atitle.innerHTML='Question:    '
        var titlequestion = document.createElement("h3");
        document.getElementById('question').innerHTML='Question: '+questions[questionNumber].question
        titlequestion.innerHTML=questions[questionNumber].question

        title.appendChild(atitle)
        title.appendChild(titlequestion)

        // and give it some content
        const content = document.getElementById('content')
        var answers=[questions[questionNumber].correctAnswer,questions[questionNumber].answer1,questions[questionNumber].answer2,questions[questionNumber].answer3]
        answers=shuffle(answers)
        while (content.firstChild) {
            content.removeChild(content.lastChild);
          }
          document.getElementById('qcard').style.display = "block";
          myVar = setTimeout(function () {document.getElementById('qcard').style.display = "none";}, 5000)

          const answer1 = document.createElement("div");
          var qtitle = document.createElement("h2");
          qtitle.innerHTML='Arch 1:    '
          document.getElementById('answer1').innerHTML='1. '+answers[0]
          answer1.innerHTML=answers[0]
          content.appendChild(qtitle)
          content.appendChild(answer1)

          const answer2 = document.createElement("div");
           qtitle = document.createElement("h2");
          qtitle.innerHTML='Arch 2:    '
            document.getElementById('answer2').innerHTML='2. '+answers[1]

          answer2.innerHTML=answers[1]

          content.appendChild(qtitle)
          content.appendChild(answer2)  
          const answer3 = document.createElement("div");
           qtitle = document.createElement("h2");
          qtitle.innerHTML='Arch 3:    '
          answer3.innerHTML=answers[2]
                      document.getElementById('answer3').innerHTML='3. '+answers[2]

          content.appendChild(qtitle)
          content.appendChild(answer3)  
          const answer4 = document.createElement("div");
           qtitle = document.createElement("h2");
          qtitle.innerHTML='Arch 4:    '
             document.getElementById('answer4').innerHTML='4. '+answers[3]

          answer4.innerHTML=answers[3]
          content.appendChild(qtitle)
          content.appendChild(answer4)
         
          

       
            for(var i=0; i<answers.length; i++){
                if(!answers[i].localeCompare(questions[questionNumber].correctAnswer)){
                    correctSelection=i+1
                    console.log('correctSelection')

                    console.log(correctSelection)
                }
            }
        // add the text node to the newly created div
       
        questionNumber++
         }
         else{
            if(selection!=correctSelection&&selection!=null){
                console.log('wrong')
                  document.getElementById('incorrect').style.display = "block";
                setTimeout(function () {document.getElementById('incorrect').style.display = "none";}, 2000)
                questions[questionNumber-1].correct=false
    
            }
            if(selection==correctSelection&&selection!=null){
                console.log('correct')
                document.getElementById('correct').style.display = "block";
                setTimeout(function () {document.getElementById('correct').style.display = "none";}, 2000)
                questions[questionNumber-1].correct=true
                answersCorrect++
            }
            showScore()
             console.log(questions)
         }
         function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function showScore(){
    console.log(answersCorrect)
    socket.emit('score',{room,playerid,playerscore:answersCorrect})
    leaderboard[playerid] = answersCorrect
    document.getElementById('answers').style.display="block"
    document.getElementById('answerlisttitle').innerHTML="You Scored "+answersCorrect +"/"+questions.length
    var list=document.getElementById('answerlist')
    while (list.firstChild) {
        list.removeChild(list.lastChild);
      }
    for(var i=0;i<questions.length;i++){
        var listitem=document.createElement('ul')
        listitem.className='list-group-item'
        listitem.innerHTML='Question ' + (i+1) + ":   " +questions[i].question
        var listitem1=document.createElement('ul')
        listitem1.className='list-group-item'
        listitem1.innerHTML='Answer :   ' +questions[i].correctAnswer
        var listitem2=document.createElement('ul')
        listitem2.className='list-group-item'
        
        if(questions[i].correct){
            listitem2.innerHTML='Correct'
            listitem2.className='greentext'
        }
       else{
            listitem2.innerHTML='Incorrect'
            listitem2.className='redtext'
        }
        list.appendChild(listitem)
        list.appendChild(listitem1)
        list.appendChild(listitem2)
        
    }

}

}


