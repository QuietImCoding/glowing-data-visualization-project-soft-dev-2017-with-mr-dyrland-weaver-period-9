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
    for (i = 0; i < 10; i++) { data.push(100/3); }
    var radii = [];
    for (i = 0; i < 3; i++) { radii.push(30); }
    slices = svg.select("#inslices").selectAll("path");
    pichart(slices, data, cx, cy, radius/3, radii);
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}
window.onload = setup;
