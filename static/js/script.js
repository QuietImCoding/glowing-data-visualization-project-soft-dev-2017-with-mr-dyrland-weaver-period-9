var svg, data;
var width, height;
var year;

var setup = function() {
    svg = d3.select("#svg");
    d3.csv("/static/csv/labor.csv", function(err, d) {
	if (err) throw err;
	data = d;
	sizeBars();
    });
    svg.select("#year").attr("x", 10).attr("y", "10%").attr("font-size", 30).attr("fill", "#000000");
    svg.select("#month").attr("x", 10).attr("y", "5%").attr("font-size", 30).attr("fill", "#000000");
    svg.on("mousemove", function() {
	svg.select("#year").text(data[year]["Year"]);
	svg.select("#month").text(data[year]["Month Name"]);
	if (year) {
	    year = Math.round((d3.event.offsetX/width)*data.length-1);
	    sizeBars();
	}
    });
    year = 400;
    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;

    var slices = svg.select("#slices").selectAll("path");
    console.log(slices);
    var lastangle = 0;
    var cx = 5*width/6;
    var cy = 3*height/4;
    var radius = Math.min(width/4, height/4)/2;
    var lastslice = [cx, cy-radius];
    slices.data([10, 20, 30, 40]).enter().append("path").attr("d", function(d, i) {
	var angle = (360 * (d/100))
	var pathstr = "M "+ lastslice[0] + " " + lastslice[1] + " ";
	var endx = cx+(radius*(Math.cos(toRadians(lastangle+angle-90))));
	var endy = cy+(radius*(Math.sin(toRadians(lastangle+angle-90))));
	pathstr += "A " + radius + " " + radius + " " + 1 + " " + (d > 180)*1 + " " + 1 + " " + endx + " " + endy;
	pathstr += " L " + cx + " " + cy;
	lastslice = [endx, endy];
	lastangle += angle;
	return pathstr;
    }).attr("fill", function(d) {return "hsl(" + Math.floor(360 * Math.random(d)) + ", 80%, 60%)"}).attr("stroke", "black").attr("count", function(d, i){return i;});
    
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

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

var sizeBars = function() {
    var females = svg.select("#females").selectAll("rect");
    thisData = [data[year]["Black or African American.Employment-Population Ratio.Women"], data[year]["White.Employment-Population Ratio.Women"]]
    if(data[year]["Unemployed.Asian.Unemployment Rate"] != "0") {
	thisData.push(((100-parseFloat(data[year]["Unemployed.Asian.Unemployment Rate"]))/2).toString());
    } else{
	thisData.push("0");
    }
    females.data(thisData).enter();
    females.transition().attr("width", function(d, i) {
	return parseFloat(d)/2 + "%";
    });
    var males = svg.select("#males").selectAll("rect");
    thisData = [data[year]["Black or African American.Employment-Population Ratio.Men"], data[year]["White.Employment-Population Ratio.Men"]]
    if(data[year]["Unemployed.Asian.Unemployment Rate"] != "0") {
	thisData.push(((100-parseFloat(data[year]["Unemployed.Asian.Unemployment Rate"]))/2).toString());
    }else{
	thisData.push("0");
    }
    males.data(thisData).enter();
    males.transition().attr("width", function(d) {
	return parseFloat(d)/2 + "%";
    }).attr("x", function(d) {
	return 50-(parseFloat(d)/2) + "%";
    });

}



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
