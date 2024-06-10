video = "";
status = "";
objetos={}
function preload() {
    video = createVideo('video.mp4');
    video.hide();
}


function setup(){
    canvas=createCanvas(480, 380);
canvas.center();

}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status!=""){
     objectDetector.detect(video, gotResult)
     for(i=0;i<objetos.length;i++){
        document.getElementById("status").innerHTML = "Status: Objetos Detectados";
        document.getElementById("numero_de_objetos").innerHTML = "Quantidade de Objetos Detectados: "+objetos.length;
        fill("#FF0000");
        percent = floor(objetos[i].confidence * 100);
        text(objetos[i].label + " " + percent + "%", objetos[i].x + 15, objetos[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
     }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").dinnerHTML = "status : Detectando Objetos"
}
function modelLoaded(){
    console.log("Modelo Carregado!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results){
    if(error){
        console.log(error)
    }
    console.log(results);
    objetos=results;
}