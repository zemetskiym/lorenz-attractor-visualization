let x = 1
let y = 1 
let z = 1
let dx, dy, dz
const prandtlNumber = 10
const rayleighNumber = 28
const aspectRatio = 8/3
const dt = 0.01
let trail = []

function setup() {
    createCanvas (800, 800, WEBGL);
}

function draw() {
    background('#2C2A4A')

    dx = prandtlNumber * ( y - x )
    dy = x * ( rayleighNumber - z ) - y
    dz = x * y - aspectRatio * z

    x += dx * dt
    y += dy * dt
    z += dz * dt

    trail.push([x, y, z])

    if (trail.length > 100000) {
    trail.splice(0, 1)
    }

    beginShape()
    noFill()
    strokeWeight(1)
    stroke('#F9DC5C')
    scale(6)
    for(let i = 0; i < trail.length; i++) {
    const [xpos, ypos, zpos] = trail[i];
    vertex(xpos, ypos, zpos);
    }
    endShape()
}