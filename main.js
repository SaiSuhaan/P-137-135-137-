objects = [];
status = "";
video = "";

function setup()
{
    canvas = createCanvas(450, 350);
    canvas.center()
    video = createCapture(VIDEO);
    video.size(450, 350);
    video.hide();
}

function modelLoaded()
{
    console.log("Model has loaded");
    status = true;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video , 0, 0, 450, 350);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if(error){
    console.log(error);
    }
    console.log(results);
    objects = results;
}