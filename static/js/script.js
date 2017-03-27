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
    d3.selectAll(".label").each(function(d, i) {
	var x = width/2 + ((i > 0) * -5) + ((i==0) * 5);;
	var y = height/2 + ((i > 0) * -50) + ((i==0) * 80);
	d3.select(this)
	    .attr("x", x)
	    .attr("y", y)
	    .attr("font-size", 100)
	    .attr("transform", "rotate(" + (90 + (180*i)) + ", " + x + ", " + y + ")");
	
    });
};

window.onresize = function() {
    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;
    d3.selectAll(".label").each(function(d, i) {
	var x = width/2 + ((i > 0) * -5) + ((i==0) * 5);;
	var y = height/2 + ((i > 0) * -50) + ((i==0) * 50);
	d3.select(this)
	    .attr("x", x)
	    .attr("y", y)
	    .attr("font-size", 100)
	    .attr("transform", "rotate(" + (90 + (180*i)) + ", " + x + ", " + y + ")");
    });
}

window.onload = setup;
