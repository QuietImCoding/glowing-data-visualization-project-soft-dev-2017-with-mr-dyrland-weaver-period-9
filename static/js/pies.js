var svg, data;
var width, height;

var setup = function() {
    svg = d3.select("#svg");
    d3.csv("/static/csv/labor.csv", function(err, d) {
	if (err) throw err;
	data = d;
    });
    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;
    var radius = Math.min(width/2, height/2);
    var cx = width/2;
    var cy = height/2;
    var slices = svg.select("#outslices").selectAll("path");
    data = [];
    radii = [];
    radii2 = [];
    var parts = 10
    for (i = 0; i < parts; i++) {
	data.push(100/parts); 
	radii.push(radius/8);
	radii2.push(10 * i + 10);
    }
    pichart(slices, data, cx, cy, radius/3+(radius/8), radii2);
    slices = svg.select("#inslices").selectAll("path");
    parts = 20;
    for (i = 0; i < parts; i++) {
	data.push(100/parts); 
	radii.push(radius/8);
    }
    pichart(slices, data, cx, cy, radius/3, radii);
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}
window.onload = setup;
