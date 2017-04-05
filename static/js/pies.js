var svg, data;
var width, height;
var cx, cy, radius;
var widths = [];

var getPiesForYear = function(year) {

    var black = [];
    var asian = [];
    var white = [];

    var i = year*12;
    while (i < (year * 12) + 12) {
	var b = data[i]["Civilian Labor Force.Black or African American.Counts.All"];
	if (!isNaN(b)) { black.push(b); };
	var a = data[i]["Civilian Labor Force.Asian.Counts"];
	if (!isNaN(b)) { asian.push(a); };
	var w = data[i]["Civilian Labor Force.White.Counts.All"];
	if (!isNaN(b)) { white.push(w); };
	i += 1;
    }
    
    var btotal = black.reduce(function (a, b) { return parseInt(a) + parseInt(b); });
    var atotal = asian.reduce(function (a, b) { return parseInt(a) + parseInt(b); });
    var wtotal = white.reduce(function (a, b) { return parseInt(a) + parseInt(b); });
    var total = btotal + wtotal + atotal;

    widths = [];
    widths.push(btotal/total*100);
    widths.push(wtotal/total*100);
    widths.push(atotal/total*100);

    var radii = []; 
    radii.push(radius/8);
    radii.push(radius/8);
    radii.push(radius/8);
    
    var slices = svg.select("#inslices").selectAll("path");
    pichart(slices, widths, cx, cy, radius/3, radii, "#64FFDA");

    widths = [];
    radii=[];
    racelengths = [btotal, wtotal, atotal];
    for (i = 0; i < racelengths.length; i++) {
	
	for (j = 0; j < 12; j++) {
	    widths.push((racelengths[i]/total)*100/12);
	    var percentEmployed;
	    if (i==0) {
		percentEmployed = parseFloat(data[(year*12)+j]["Black or African American.Employment-Population Ratio.All"])/100;
	    } else if (i==1) {
		percentEmployed = parseFloat(data[(year*12)+j]["White.Employment-Population Ratio.All"])/100;
	    } else if (i==2) {
		console.log(parseFloat(data[(year*12)+j]["Employed.Asian.Unemployment Rate"]));
		if (parseFloat(data[(year*12)+j]["Employed.Asian.Unemployment Rate"]) != 0) {
		    percentEmployed = (100 - parseFloat(data[(year*12)+j]["Employed.Asian.Unemployment Rate"]))/100;
		} else {
		    percentEmployed = 0;
		}
	    }
	    radii.push((radius/4) * Math.abs(percentEmployed-0.25)*4);
	}
    }
    var slices = svg.select("#outslices").selectAll("path");
    pichart(slices, widths, cx, cy, radius/3+(radius/8), radii, "#FC6471");

}

var setup = function() {
    svg = d3.select("#svg");


    d3.csv("/static/csv/labor.csv", function(err, d) {
	if (err) throw err;
	data = d;
	getPiesForYear(40);
    });    
    
    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;
    radius = Math.min(width/2, height/2);
    cx = width/2;
    cy = height/2;
    
   /* slices = svg.select("#midslices").selectAll("path");
    var radii3 = []
    data = [];
    var parts = 3;
    var total = 0;
    for (i=0; i < parts; i++)  {
	data.push(Math.random()*(100/parts)); 
	radii3.push(radius/8);
    }

    console.log(data);
    console.log(radii3);
    pichart(slices, data, cx, cy, radius/3+(radius/8), radii3);
    
    /*slices = svg.select("#outslices").selectAll("path");
    pichart(slices, data, cx, cy, radius/3+radius/4, outradii, );*/

};

var pORm = function() { if (Math.random() > 0.5) { return 1; } else { return -1; } };

var dist = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
};
function toRadians (angle) {
    return angle * (Math.PI / 180);
}
window.onload = setup;
