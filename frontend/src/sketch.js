const seed = parseInt(tokenData.hash.slice(0, 16), 16);

function setup() {
    createCanvas(1805, 225, SVG);
    background(random(255),random(255), random(255), random(69, 255));
    fill(random(255));
    stroke(random(255));
}

function draw() {

    console.log(this.seed);

    beginShape();

    translate(width/random(2,8), height/2);

    v = p5.Vector.random2D();
    v.mult(random(42,1000));

    // noFill();
    count = 0;

    for (var x = 0; x < random(69,420); x++) {
        strokeWeight(random(343)*random(sin(cos(random(seed)),seed - 69)/random(4)));
        stroke(random(266), random(77), random(99), random(255));
        line(random(cos(1805)), random(-1805), -v.y+69, v.y-420);
        line(1805,0,v.x,v.y+420);
        line(random(1805),1805,v.y,v.x);
        triangle(0,random(cos(1805)),v.x,v.y);
        if (x % 21 == 0) {
            strokeWeight(random(343)*random(sin(cos(random(seed)),seed + 69)/random(4)));
            stroke(random(266), random(77), random(99), random(255));
            line(random(-cos(1805)*sin(999)), random(1805), -v.y+69, v.y-420);
            line(1805,0,v.x,v.y-420);
            triangle(random(-1805),-420,v.y,v.x);
            triangle(0,random(cos(1805)),v.x,v.y);

            translate(width/random(2,8), height/2);
        }
    }
    save(seed+".png");
    endShape();

    // noLoop();
}
