var svg, data;
var width, height;
var outradii = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cx, cy, radius;

var setup = function() {
    svg = d3.select("#svg");


    var black = [];
    var asian = [];
    var white = [];

    d3.csv("/static/csv/labor.csv", function(err, d) {
	if (err) throw err;
	data = d;
	
	var i = 28*12;
	while (i < data.length) {
	    var b = data[i]["Civilian Labor Force.Black or African American.Counts.All"];
	    if (!isNaN(b)) { black.push(b); };
	    var a = data[i]["Civilian Labor Force.Asian.Counts"];
	    if (!isNaN(b)) { asian.push(a); };
	    var w = data[i]["Civilian Labor Force.White.Counts.All"];
	    if (!isNaN(b)) { white.push(w); };
	    i += 1;
	}
    
    
    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;
    radius = Math.min(width/2, height/2);
    cx = width/2;
    cy = height/2;
    var slices = svg.select("#inslices").selectAll("path");
    data = [];
    var radii = [];
    var radii2 = [];
    var parts = 3;

    var btotal = black.reduce(function (a, b) { return a + b; });
    var atotal = asian.reduce(function (a, b) { return a + b; });
    var wtotal = white.reduce(function (a, b) { return a + b; });
    var total = btotal + wtotal + atotal;

    data.push(btotal/total);
    data.push(atotal/total);
    data.push(wtotal/total);
 
    radii.push(radius/8);
    radii.push(radius/8);
    radii.push(radius/8);
    
    pichart(slices, data, cx, cy, radius/3, radii, "#64FFDA");
    
    slices = svg.select("#midslices").selectAll("path");
    data = [];
    var radii3 = [];
    var parts = 12;
    for (i = 0; i < parts; i++) {
	data.push((100/parts)*pORm()); 
	radii3.push(radius/8);
    }
    pichart(slices, data, cx, cy, radius/3+(radius/8), radii3);
    
    data = [];
    slices = svg.select("#outslices").selectAll("path");
    pichart(slices, data, cx, cy, radius/3+radius/4, outradii, "#FC6471");

    svg.on("mousemove", function(d) {
	var newradius = dist(d3.event.clientX, d3.event.clientY, width/2, height/2)/4-outradii.shift();;
	outradii.push(newradius);

	slices = svg.select("#outslices").selectAll("path");
	var data = []
	for (i = 0; i < outradii.length; i++) {
	    data.push(100/outradii.length * pORm());
	}
	pichart(slices, data, cx, cy, radius/3+(radius/4), outradii, "#FC6471");	
    });
	});
};

var pORm = function() { if (Math.random() > 0.5) { return 1; } else { return -1; } };

var dist = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
};
function toRadians (angle) {
    return angle * (Math.PI / 180);
}
window.onload = setup;
