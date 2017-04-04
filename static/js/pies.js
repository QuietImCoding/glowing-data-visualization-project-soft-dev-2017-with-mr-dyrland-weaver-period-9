var svg, data;
var width, height;
var outradii = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cx, cy, radius;

var setup = function() {
    svg = d3.select("#svg");
    d3.csv("/static/csv/labor.csv", function(err, d) {
	if (err) throw err;
	data = d;
    });
    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;
    radius = Math.min(width/2, height/2);
    cx = width/2;
    cy = height/2;
    var slices = svg.select("#inslices").selectAll("path");
    data = [];
    var radii = [];
    var radii2 = [];
    var parts = 8;
    for (i = 0; i < parts; i++) {
	data.push(100/parts); 
	radii.push(radius/8);
    }
    pichart(slices, data, cx, cy, radius/3, radii, "#64FFDA");
    data = [];
    slices = svg.select("#outslices").selectAll("path");
    parts = 16
    for (i = 0; i < parts; i++) {
	data.push(100/parts); 
	radii2.push(((i%3)+1)*(radius/8));
    }
    pichart(slices, data, cx, cy, radius/3+(radius/8), outradii, "#FC6471");

    svg.on("mousemove", function(d) {
	var newradius = dist(d3.event.clientX, d3.event.clientY, width/2, height/2)/2-outradii.shift();;
	outradii.push(newradius);

	slices = svg.select("#outslices").selectAll("path");
	var data = []
	for (i = 0; i < outradii.length; i++) {
	    data.push(100/outradii.length);
	}
	pichart(slices, data, cx, cy, radius/3+(radius/8), outradii, "#FC6471");	
    });

}

var dist = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}
function toRadians (angle) {
    return angle * (Math.PI / 180);
}
window.onload = setup;
