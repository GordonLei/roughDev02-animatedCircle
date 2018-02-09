// Context + Canvas
var c = document.getElementById("canvas");
var context = c.getContext('2d');
context.fillStyle = "#ffa500";

//buttons
var clearButton = document.getElementById("clearButton");
var stopButton = document.getElementById("stopButton");
var drawCircleButton = document.getElementById("drawCircleButton");
var DVDButton = document.getElementById("DVDButton");

//temp variables
var requestId = null;
var animation = "drawCircle"; 
//animate method
var animate = function(){
    //temp variables
    var radius = 0;

    var x= c.width/2;
    var y = c.height/2;
    //max holds the max possible radius the circle can have (depending on canvas size)
    var max = 0;
    var expand = true;

    //decide the random motion (neither increment = 0)
    var temp = [-1,1];
    var xIncrement= temp[Math.floor(Math.random() * 2)];
    var yIncrement = temp[Math.floor(Math.random() * 2)];

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
        console.log("finished drawing circle");
        
        //log next frame
        requestID = window.requestAnimationFrame(drawCircle);
        console.log(requestID);
    };

    var drawDVD = function(){
        console.log("starting to draw circle...");
        radius = 25;
        //clear previous frame
        clear();

        context.beginPath();

        //draw circle
        console.log("Drawing circle radius = " + radius + " max = " + max);
        context.arc(x, y, radius, 0, 2 * Math.PI);
        x += xIncrement;
        y += yIncrement;

        //check if circle is near the edges 
        if (x - (radius + Math.abs(xIncrement))<= 0 || x + (radius + Math.abs(xIncrement)) >= c.width) {
            //negate the increment to bounce back opposite direction.
            //Math.random() is to make sure that it doesn't just bounce back the same direction
                //However for some reason if you use too small of a number to minimize Math.random(),
                    //for example changing the .4 to a .2,  
                    //sometimes the circle spazzes out and sinks into the canvas edges. 
            xIncrement = -xIncrement + (Math.random() - .4);
            console.log("speed in X is now: " + xIncrement);
            //change fillcolor;
            context.fillStyle = "#" + Math.floor((Math.random()*16777215)).toString(16);
        }
        if (y - (radius + Math.abs(yIncrement))<= 0 || y + (radius + Math.abs(yIncrement))>= c.height) {
            yIncrement = -yIncrement + (Math.random() - .4);
            console.log("speed in Y is now: " + yIncrement);
            //change fillcolor;
            context.fillStyle = "#" + Math.floor((Math.random()*16777215)).toString(16);
        }
        
        //fill circle
        context.fill();
        context.stroke();
        console.log("finished drawing circle");
        
        //log next frame
        requestID = window.requestAnimationFrame(drawDVD);
        console.log(requestID);

        
    };

    //recursive callback
    if (animation == "drawCircle"){
        console.log("drawing circle next...");
        drawCircle();
    }
    else if (animation == "drawDVD"){
        console.log("drawing DVD animation next...");
        drawDVD();
    }
};

var stop = function(){
    window.cancelAnimationFrame(requestID);
};

var clear = function(){
    context.clearRect(0,0, c.width, c.height);
};

var toggleCircle = function(){
    animation = "drawCircle";
    console.log("Animation is now: " + animation)
};

var toggleDVD = function(){
    animation = "drawDVD";
    console.log("Animation is now: " + animation)
};

clearButton.addEventListener("click", clear);
stopButton.addEventListener("click", stop);
drawCircleButton.addEventListener("click", toggleCircle);
DVDButton.addEventListener("click", toggleDVD);

c.addEventListener("click", animate);
