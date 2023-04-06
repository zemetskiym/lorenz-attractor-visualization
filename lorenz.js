// Define the initial position and stroke of each shape
let lines = [  
    {x: 1, y: 1, z: 1, stroke: '#F9DC5C'},  
    {x: 1.01, y: 1.01, z: 1.01, stroke: '#EE5A5A'},
    {x: 1.02, y: 1.02, z: 1.02, stroke: '#8BC34A'},
    {x: 1.03, y: 1.03, z: 1.03, stroke: '#00BFFF'},
    {x: 1.04, y: 1.04, z: 1.04, stroke: '#FF69B4'}
]

// Define the change in x, y, and z
let dx, dy, dz

// Define the constants, including the change in time
const prandtlNumber = 10
const rayleighNumber = 28
const aspectRatio = 8/3
const dt = 0.01

// Define a trail array to hold arrays for each shape
let trail = []
for(let i = 0; i < 5; i++) {
    trail[i] = []
}

// Function that calculates and adds a new vertex to the trail of the specified shape
function addVertexToTrail (i) {
    // Calculate the change in x, y, and z
    dx = prandtlNumber * ( lines[i].y - lines[i].x )
    dy = lines[i].x * ( rayleighNumber - lines[i].z ) - lines[i].y
    dz = lines[i].x * lines[i].y - aspectRatio * lines[i].z
    
    // Set new x, y, and z positions based on change in position and time
    lines[i].x += dx * dt
    lines[i].y += dy * dt
    lines[i].z += dz * dt
  
    if (trail[i].length > 0) {
        // Calculate the distance between the current point and the previous point in the trail
        let prevPoint = trail[i][trail[i].length - 1]
        let dist = sqrt(pow(lines[i].x - prevPoint[0], 2) + pow(lines[i].y - prevPoint[1], 2) + pow(lines[i].z - prevPoint[2], 2))

        // Add the new vertex to the trail array if the distance is greater than 0.1 units
        if(dist > 1) {
          trail[i].push([lines[i].x, lines[i].y, lines[i].z])
        }
    } else {
        // If no vertices exist, add one
        trail[i].push([lines[i].x, lines[i].y, lines[i].z])
    }
    
    // If the trail has more than 500 positions, remove the oldest position
    if(trail[i].length > 500) {
      trail[i].splice(0, 1)
    }
}
  
function setup() {
    // Create a 3D canvas
    createCanvas (1000, 1000, WEBGL);
}
  
function draw() {
    background('#2C2A4A')

    // Enable mouse orbit control
    orbitControl()
    
    for(let i = 0; i < 5; i++) {
        // Add a new position to the line's trail
        addVertexToTrail(i)
      
        // Draw the line's trail as a shape
        beginShape()
        noFill()
        strokeWeight(1)
        stroke(lines[i].stroke)
        for(let j = 0; j < trail[i].length; j++) {
            // Get the x, y, and z position of the current vertex in the trail
            let [xpos, ypos, zpos] = trail[i][j]
            // Draw the curved vertex, scaled by a factor of 8.75 for visual purposes
            curveVertex(xpos * 8.75, ypos * 8.75, zpos * 8.75)
        }
        endShape()
    }
}