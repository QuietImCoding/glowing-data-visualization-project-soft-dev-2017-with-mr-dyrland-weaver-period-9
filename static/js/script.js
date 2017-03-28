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
	console.log(d);
	console.log(i);
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
