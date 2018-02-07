// Context + Canvas
var c = document.getElementById("canvas");
var context = c.getContext('2d');
context.fillStyle = "#ffa500";

//buttons
var clearButton = document.getElementById("clearButton");
var stopButton = document.getElementById("stopButton");

//temp variables
var requestId;

//animate method
var animate = function(){
    //temp variables
    var radius = 0;
    var x = 0;
    //max holds the max possible radius the circle can have (depending on canvas size)
    var max = 0;
    var expand = true;
    //check and store max radius possible for circle
    if (c.width < c.height){
        console.log("max is found");
        max = c.width / 2;
    }
    else{
        console.log("max is found");
        max = c.height / 2;
    }
    console.log(max);

    //draw the circle
    var drawCircle = function(){
        console.log("starting to draw circle...");
        //clear previous frame
        clear();

        context.beginPath();

        //if max is achieved, start to contract
        if(radius >= max && expand == true){
            console.log("Beginning to contract... radius = " + radius + " max = " + max);
            context.arc(c.width/2, c.height/2, radius, 0, 2 * Math.PI);
            expand=false;
        }

        //else if circle is at 0 radius and has finished contracting, start to grow smaller
        else if(radius == 0 && expand == false){
            console.log("Beginning to expand...radius = " + radius + " max = " + max);
            context.arc(c.width/2, c.height/2, radius, 0, 2 * Math.PI);
            expand=true;
        }

        //else if circle is not at max and is still increasing, continue to expand
        else if (radius <= max && expand == true){
            console.log("increasing circle size; radius = " + radius + " max = " + max);
            context.arc(c.width/2, c.height/2, radius, 0, 2 * Math.PI);
            radius++;
        }
        
        //technically an else statement will be fine since all outcomes can be achieved but I like cases...
        //else if radius is less than max and it was to decrease then decrease...
        else if(radius <= max && expand == false){
            console.log("decreasing circle size; radius = " + radius + " max = " + max);
            context.arc(c.width/2, c.height/2, radius, 0, 2 * Math.PI);
            radius--;
        }

        //fill circle
        context.fill();
        context.stroke();
        //console.log("finished drawing circle");
        
        //log next frame
        requestID = window.requestAnimationFrame(drawCircle);
        console.log(requestID);
    };
    //recursive callback
    drawCircle();
};

var stop = function(){
    window.cancelAnimationFrame(requestID);
};

var clear = function(e){
    context.clearRect(0,0, c.width, c.height);
};

clearButton.addEventListener("click", clear);
stopButton.addEventListener("click", stop);

c.addEventListener("click", animate);
