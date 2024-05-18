var groundHeight;
var mountain1;
var mountain2;

var tree;

var moon;
var sun;
var darkness;
var tavern;
var birds;
var stars;
var clouds;

function setup()
{
	createCanvas(800, 600);
	//set the groundHeight proportional to the canvas size
	groundHeight = (height / 3) * 2;

	//initalise the mountain objects with properties to help draw them to the canvas
	mountain1 = {
		x: 400,
		y: groundHeight,
		height: 320,
		width: 230
	};
	mountain2 = {
		x: 550,
		y: groundHeight,
		height: 200,
		width: 130
	};

	//initalise the tree object
	tree = {
		x: 150,
		y: groundHeight,
		trunkWidth: 40,
		trunkHeight: 150,
		canopyWidth: 120,
		canopyHeight: 100
	};

    //initalise the sun 
	sun = {
		x: 150,
		y: 70,
		diameter: 80,
	};
    
    //TASK: intialise a moon object with an extra property for brightness
    moon = {
        x: 650,
        y: 70,
        diameter: 80,
        brightness: 0
    }


	//set the initial darkness
	darkness = 0;
    
    // Initialize the tavern object
    tavern = {
        x: 300,
        y: groundHeight - 70,
        width: 200,
        height: 70,
        roofHeight: 50
    }
    
    birds = [
        {x: 100, y: 100},
        {x: 200, y: 150},
        {x: 300, y: 120},
    ]

    stars = [
        {x: 50, y: 50},
        {x: 100, y: 60},
        {x: 70, y: 70},
        {x: 120, y: 80},
        {x: 140, y: 90},
        {x: 160, y: 100},
        {x: 180, y: 50},
        {x: 220, y: 60},
        {x: 240, y: 70},
        {x: 280, y: 80},
        {x: 300, y: 90},
        {x: 320, y: 100},
    ]
    
    // Initialize clouds
    clouds = [];
    for (let i = 0; i < 5; i++) {
        clouds.push({
            x: random(width),
            y: random(100, 200),
            size: random(50, 150)
        });
    }

}



function draw()
{
	//TASK: update the values for the moons brightness, the sun's position and the darkness.
	//You can either map this to the mouse's location (i.e. the futher left the mouse is the more daylight) or you can just change the values gradually over time.
    sun.y = map(mouseX, 0, width, 70, height-100);
    moon.brightness = map(mouseX, 0, width,0, 255);
    darkness = map(mouseX, 0, width, 0, 100)

	//draw the sky
	background(150, 200, 255);
	noStroke();

	//draw the sun
	fill(255, 255, 0);
	ellipse(sun.x, sun.y, sun.diameter);
    
    //TASK: you'll need to draw the moon too. Make sure you use brightness to adjust the colour
    fill(255,255,255,moon.brightness)
    ellipse(moon.x, moon.y, moon.diameter);

	//draw the ground and make it green
	fill(70, 200, 0);
	rect(0, groundHeight, width, height - groundHeight);

	//draw the mountains
	fill(120);
	triangle(mountain1.x, mountain1.y,
		mountain1.x + mountain1.width, mountain1.y,
		mountain1.x + (mountain1.width / 2), mountain1.y - mountain1.height);

	triangle(mountain2.x, mountain2.y,
		mountain2.x + mountain2.width, mountain2.y,
		mountain2.x + (mountain2.width / 2), mountain2.y - mountain2.height);
    
    //TASK: You can draw the tree yourself
    fill(101,67,33);
    rect(tree.x, tree.y - tree.trunkHeight, tree.trunkWidth, tree.trunkHeight);
    fill(34,139,34);
    ellipse(tree.x + tree.trunkWidth / 2, tree.y - tree.trunkHeight, tree.canopyWidth, tree.canopyHeight)
    
    // Draw the tavern
    // Draw the main building
    fill(150, 75, 0);  // Brown color for the tavern's walls
    rect(tavern.x, tavern.y, tavern.width, tavern.height);

    // Draw the roof
    fill(139, 69, 19);  // Darker brown color for the roof
    triangle(tavern.x, tavern.y,
             tavern.x + tavern.width, tavern.y,
             tavern.x + tavern.width / 2, tavern.y - tavern.roofHeight);

    // Draw the door
    fill(101, 67, 33);  // Dark brown for the door
    rect(tavern.x + tavern.width / 2 - 20, tavern.y + tavern.height - 40, 40, 40);
    
    // Draw the windows
    fill(255);  // White color for the windows
    rect(tavern.x + 20, tavern.y + 20, 30, 30);
    rect(tavern.x + tavern.width - 50, tavern.y + 20, 30, 30);
    
    // Draw birds if it's daytime (low darkness)
    if (darkness < 50) {
        fill(0);  // Black color for birds
        for (let bird of birds) {
            ellipse(bird.x, bird.y, 10, 5);
            ellipse(bird.x + 10, bird.y, 10, 5);
        }
    }

    // Draw stars if it's nighttime (high darkness)
    if (darkness > 50) {
        fill(255);  // White color for stars
        for (let star of stars) {
            ellipse(star.x, star.y, 5, 5);
        }
    }
    
    // Draw clouds
    for (let cloud of clouds) {
        fill(255);  // White color for clouds
        ellipse(cloud.x, cloud.y, cloud.size, cloud.size / 2);
        ellipse(cloud.x + 20, cloud.y + 10, cloud.size, cloud.size / 2);
        ellipse(cloud.x - 20, cloud.y + 10, cloud.size, cloud.size / 2);

        // Update cloud position for drifting
        cloud.x += 0.5;
        if (cloud.x > width + cloud.size) {
            cloud.x = -cloud.size;
        }
    }

	//TASK: make the scene dark by drawing a rectangle that covers the whole canvas.
	//Use the alpha value of fill to determine how dark to make it
    fill(0,0,0, darkness);
    rect(0,0,width,height);

}