var data;

var setup = function() {
    d3.csv("/static/csv/labor.csv", function(err, d) {
	if (err) throw err;
	data = d;
    });
};

window.onload = setup;
