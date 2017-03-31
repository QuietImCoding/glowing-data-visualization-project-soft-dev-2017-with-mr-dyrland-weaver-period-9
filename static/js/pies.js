var width, height;

var setup = function() {
    d3.csv("/static/csv/labor.csv", function(err, d) {
	if (err) throw err;
	data = d;
    });
    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;
}

window.onload = setup;
