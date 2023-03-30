let lines = [  
    {x: 1, y: 1, z: 1, stroke: '#F9DC5C'},  
    {x: 1.01, y: 1.01, z: 1.01, stroke: '#EE5A5A'},
    {x: 1.02, y: 1.02, z: 1.02, stroke: '#8BC34A'},
    {x: 1.03, y: 1.03, z: 1.03, stroke: '#00BFFF'},
    {x: 1.04, y: 1.04, z: 1.04, stroke: '#FF69B4'}
]
let dx, dy, dz
const prandtlNumber = 10
const rayleighNumber = 28
const aspectRatio = 8/3
const dt = 0.01
let trail = {}
for(let i = 0; i < 5; i++) {
    trail['trail' + i] = []
}
  
function addVertexToTrail (i) {
    dx = prandtlNumber * ( lines[i].y - lines[i].x )
    dy = lines[i].x * ( rayleighNumber - lines[i].z ) - lines[i].y
    dz = lines[i].x * lines[i].y - aspectRatio * lines[i].z
    
    lines[i].x += dx * dt
    lines[i].y += dy * dt
    lines[i].z += dz * dt
  
    trail['trail' + i].push([lines[i].x, lines[i].y, lines[i].z])
    
    if(trail['trail' + i].length > 1000) {
      trail['trail' + i].splice(0, 1)
    }
}
  
function setup() {
    createCanvas (800, 800, WEBGL);
}
  
function draw() {
    background('#2C2A4A')
    orbitControl()
    
    for(let i = 0; i < 5; i++) {
        addVertexToTrail(i)
      
        beginShape()
        noFill()
        strokeWeight(1)
        stroke(lines[i].stroke)
        for(let j = 0; j < trail['trail' + i].length; j++) {
            let [xpos, ypos, zpos] = trail['trail' + i][j]
            vertex(xpos * 6, ypos * 6, zpos * 6)
        }
        endShape()
    }
}