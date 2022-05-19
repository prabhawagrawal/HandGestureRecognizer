Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera")

function captureImage(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot_view").innerHTML = "<img id='capturedImage' src='"+data_uri+"'>";
    });
}

console.log("ML5 version:" + ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VjUa0nf8n/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function check(){
    img = document.getElementById("capturedImage");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1 = results[0].label;
        document.getElementById("prediction").innerHTML = prediction_1;
        document.getElementById("confidence").innerHTML = results[0].confidence;
        speak();
        if(resuls[0].label == "Good Sign"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(resuls[0].label == "Not Good Sign"){
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if(resuls[0].label == "Victory Sign"){
            document.getElementById("update_emoji").innerHTML = "&#x270c;";
        }
        if(resuls[0].label == "Amazing Sign"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
    } 

}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The Prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}