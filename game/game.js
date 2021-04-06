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
var i=0

function getQuestions(){
    questions=[  {
        "answer1": "1",
        "answer2": "2",
        "answer3": "3",
        "correctAnswer": "helll",
        "question": "hello1"
    },
    {
        "answer1": "1",
        "answer2": "2",
        "answer3": "3",
        "correctAnswer": "helll",
        "question": "hello2"
    },
    {
        "answer1": "1",
        "answer2": "2",
        "answer3": "3",
        "correctAnswer": "helll",
        "question": "hello3"
    }]
    window.localStorage.setItem("questions",questions);

    window.localStorage.getItem("questions")
}
















getQuestions()






  const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
        // Add your code here matching the playground format
        const scene = createScene(); //Call the createScene function
        // Register a render loop to repeatedly render the scene
         
        
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
    dynamicTexture.drawText(text, null, null, questionFont, "#000000", "#ffffff", true);
 var myMaterial = new BABYLON.StandardMaterial("mat", scene);
    myMaterial.diffuseTexture = dynamicTexture;
    
    //apply material
    plane.material = myMaterial;
    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);

    plane.position.y=40
    plane.position.z=20

//answer pane 1

 var font_type = "Arial";
var planeWidth = 12;
var planeHeight = 10;
var answerPlane = BABYLON.MeshBuilder.CreatePlane("answerplane", {width:planeWidth, height:planeHeight}, scene);
var DTWidth = planeWidth * 60;
var DTHeight = planeHeight * 60;
text = "What is the name of the kindefsd sdafsadfa";
var answerTexture = new BABYLON.DynamicTexture("answerTexture", {width:DTWidth, height:DTHeight}, scene);
var questionCtx = answerTexture.getContext();
var size = 70; 
questionCtx.font = size + "px " + font_type;
var textWidth = questionCtx.measureText(text).width;
var ratio = textWidth/size;
var font_size = Math.floor(DTWidth / (ratio * 1)); 
var font = font_size + "px " + font_type;
var clearColor = "transparent";
var answerMaterial = new BABYLON.StandardMaterial("answerMat", scene);
answerMaterial.useAlphaFromDiffuseTexture = true;
answerTexture.drawText(text, null, null, font, "#000000", "#ffffff" ,true);
answerMaterial.diffuseTexture = answerTexture;
answerPlane.material = answerMaterial;
answerPlane.material.specularColor = new BABYLON.Color3(0, 0, 0);

answerPlane.position.y=20
answerPlane.position.z=20
answerPlane.position.x=-25

//answerpane2
var answerPlane = BABYLON.MeshBuilder.CreatePlane("answerplane", {width:planeWidth, height:planeHeight}, scene);
var answer2Texture = new BABYLON.DynamicTexture("answer2Texture", {width:DTWidth, height:DTHeight}, scene);
var ctx = answer2Texture.getContext();
var size = 70; 
ctx.font = size + "px " + font_type;
var textWidth = ctx.measureText(text).width;
var ratio = textWidth/size;
var font_size = Math.floor(DTWidth / (ratio * 1)); 
var font = font_size + "px " + font_type;
var clearColor = "transparent";
var answer2Material = new BABYLON.StandardMaterial("answerMat", scene);
answer2Material.useAlphaFromDiffuseTexture = true;
answer2Texture.drawText(text, null, null, font, "#000000", "#ffffff" ,true);
answer2Material.diffuseTexture = answer2Texture;
answerPlane.material = answer2Material;
answerPlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
answerPlane.position.y=20
answerPlane.position.z=20
answerPlane.position.x=-10



//answerpane3
var answerPlane = BABYLON.MeshBuilder.CreatePlane("answerplane", {width:planeWidth, height:planeHeight}, scene);
var answer3Texture = new BABYLON.DynamicTexture("answer3Texture", {width:DTWidth, height:DTHeight}, scene);
var ctx = answer3Texture.getContext();
var size = 70; 
ctx.font = size + "px " + font_type;
var textWidth = ctx.measureText(text).width;
var ratio = textWidth/size;
var font_size = Math.floor(DTWidth / (ratio * 1)); 
var font = font_size + "px " + font_type;
var clearColor = "transparent";
var answer3Material = new BABYLON.StandardMaterial("answerMat", scene);
answer3Material.useAlphaFromDiffuseTexture = true;
answer3Texture.drawText(text, null, null, font, "#000000", "#ffffff" ,true);
answer3Material.diffuseTexture = answer3Texture;
answerPlane.material = answer3Material;
answerPlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
answerPlane.position.y=20
answerPlane.position.z=20
answerPlane.position.x=5



//answerpane4
var answerPlane = BABYLON.MeshBuilder.CreatePlane("answerplane", {width:planeWidth, height:planeHeight}, scene);
var answer4Texture = new BABYLON.DynamicTexture("answer4Texture", {width:DTWidth, height:DTHeight}, scene);
var ctx = answer4Texture.getContext();
var size = 70; 
ctx.font = size + "px " + font_type;
var textWidth = ctx.measureText(text).width;
var ratio = textWidth/size;
var font_size = Math.floor(DTWidth / (ratio * 1)); 
var font = font_size + "px " + font_type;
var clearColor = "transparent";
var answer4Material = new BABYLON.StandardMaterial("answerMat", scene);
answer4Material.useAlphaFromDiffuseTexture = true;
answer4Texture.drawText(text, null, null, font, "#000000", "#ffffff" ,true);
answer4Material.diffuseTexture = answer4Texture;
answerPlane.material = answer4Material;
answerPlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
answerPlane.position.y=20
answerPlane.position.z=20
answerPlane.position.x=20
        answerTextures=[answerTexture,answer2Texture,answer3Texture,answer4Texture]


            nextQuestion()



    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
        camera.checkCollisions = true;
    scene.collisionsEnabled = true;

    camera.attachControl(canvas, true);
    var astronaut=null
    var runningAnim = null
        var idleAnim = null
    var image = BABYLON.MeshBuilder.Create
   var ground = BABYLON.MeshBuilder.CreateBox("ground", {width: 70, height: 1, depth: 70}, scene);

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1 , restitution: 0 }, scene);
            ground.checkCollisions = false;


    BABYLON.SceneLoader.ImportMesh('', "game/3dAssets/", "astronaut6.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        astronaut = newMeshes[0];
        newMeshes[0].position.y=0
        newMeshes[0].name='astronaut'
        //Scale the model down        
        astronaut.scaling.scaleInPlace(1);
        //Lock camera on the character 
        camera.target = astronaut;
        //Get the Samba animation Group
        runningAnim = scene.getAnimationGroupByName("running");
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
        
        // yBot.physicsImpostor = new BABYLON.PhysicsImpostor(yBot,
        //             BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.001 }, scene);

        // yBot.setPivotMatrix(BABYLON.Matrix.Translation(0,0,0), true);
        var mat = new BABYLON.StandardMaterial("astronaut", scene,true);
        mat.diffuseTexture = new BABYLON.Texture("game/3dAssets/Image_0.png", scene);
        astronaut.material = mat;


        scene.onReadyObservable.add(function() {
            setTimeout(function(){
                unit.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, .5, 0), unit.getAbsolutePosition());
            }, 4000)
        });
 
        //Play the Samba animation  
    });

        let collider = BABYLON.MeshBuilder.CreateBox("collider", {size: 6}, scene);
        collider.visability=0
        collider.actionManager = new BABYLON.ActionManager(scene);
 var materialSphere = new BABYLON.StandardMaterial("texture2", scene);
        materialSphere.diffuseColor = new BABYLON.Color3(0, 0, 0); //Red
        materialSphere.alpha = 0;
        collider.material = materialSphere;






     BABYLON.SceneLoader.ImportMesh('', "game/3dAssets/", "arch.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        exit=newMeshes[0]
        exit.name='arch1'
        exit.position.x = -25;
        exit.position.y = 0;
        exit.position.z =30;
        collider.parent = scene.getMeshByName('astronaut')
        
    let action = new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
            parameter: { 
                mesh: exit
            }
        },
        (evt) => {
            selection=1
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





        engine.runRenderLoop(function () {

                keydown=false
                animating=false
                const mesh= scene.getMeshByName('astronaut')
                if(scene.getMeshByName('astronaut')!=null){
                    if(scene.getMeshByName('astronaut').position.y<-20)
                    { 

                        mesh.position.x = 0; //(2, 2, 1)
                    mesh.position.y = 20; //(2, 3, 1)
                    mesh.position.z = 0;
                    nextQuestion()
                        

                    }
                   mesh.rotationQuaternion.x=0
                    mesh.rotationQuaternion.z=0
                    }
                
                if (inputMap["w"]) {
                    astronaut.moveWithCollisions(astronaut.forward.scaleInPlace(.1));
                    keydown = true;
                }
                if (inputMap["s"]) {
                    astronaut.moveWithCollisions(astronaut.forward.scaleInPlace(-.1));
                    keydown = true;
                }
                if (inputMap["a"]) {
                    astronaut.rotate(BABYLON.Vector3.Up(), -.1);
                    keydown = true;
                }
                if (inputMap["d"]) {
                    astronaut.rotate(BABYLON.Vector3.Up(), .1);
                    keydown = true;
                }
                if (inputMap["b"]) {
                    keydown = true;
                }
                if(animsLoaded())
              {  if (keydown) {
                    if (!animating) {
                        animating = true;
                        if (inputMap["w"]) {
                            //Walk backwards
                            runningAnim.start(true, 1.0, runningAnim.from, runningAnim.to, false);
                        }
                        else if
                            (inputMap["b"]) {
                            //Samba!
                            runningAnim.start(true, 1.0, runningAnim.from, runningAnim.to, false);
                        }
                        else {
                            //Walk
                            scene.stopAllAnimations()
                            idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
                        }
                    }
                }
                 else {
                            scene.stopAllAnimations()
                            idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
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
        console.log(i)

    if(selection!=null||i==0){
        console.log('drawing')
         dynamicTexture.drawText(questions[i].question, null, null, questionFont, "#000000", "#ffffff", true);
         i = answerTextures.length,
        j = 0;
        var ranTextures = []
        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            ranTextures.push(answerTextures[j]);
            answerTextures.splice(j,1);
            }
         selection=null;
        i++
         }
         ranTextures[0].drawText(questions[i].question, null, null, font, "#000000", "#ffffff", true);
        ranTextures[1].drawText(questions[i].answer1, null, null, font, "#000000", "#ffffff", true);
         ranTextures[2].drawText(questions[i].answer2, null, null, font, "#000000", "#ffffff", true);
         ranTextures[3].drawText(questions[i].answer3, null, null, font, "#000000", "#ffffff", true);
        answerTextures=ranTextures

}
