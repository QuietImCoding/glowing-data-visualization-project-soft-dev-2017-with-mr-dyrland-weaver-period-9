var pichart = function(slices,data,cx, cy, radius, radii, color) {
    if (!color) {
	color = "hsl(" + (Math.floor(Math.random()*360)) + ", 80%, 80%)";
    }
    var lastangle = 0;
    var lastslice = [cx, cy-radius];
    slices = slices.data(data);
    if (slices.size() == 0) {
	slices = slices.enter().append("path");
    }
    slices.transition().duration(100).attr("d", function(d, i) {
	var angle = (360 * (d/100));
	var endx = cx+(radius*(Math.cos(toRadians(lastangle+angle-90))));
	var endy = cy+(radius*(Math.sin(toRadians(lastangle+angle-90))));
	var pathstr = "M "+ lastslice[0] + " " + lastslice[1] + " ";
	pathstr += "A " + radius + " " + radius + " " + 1 + " " + (d > 180)*1 + " " + 1 + " " + endx + " " + endy;
	lastslice = [endx, endy];
	endx = (cx+((radius+radii[i])*(Math.cos(toRadians(lastangle+angle-90)))));
	endy = (cy+((radius+radii[i])*(Math.sin(toRadians(lastangle+angle-90)))));
	pathstr += " L " + endx + " " + endy;
	endx = cx+((radius+radii[i])*(Math.cos(toRadians(lastangle-90))));
	endy = cy+((radius+radii[i])*(Math.sin(toRadians(lastangle-90))));
	pathstr += "A " + (radius+radii[i]) + " " + (radius+radii[i]) + " " + 1 + " " + (d > 180)*1 + " " + 0 + " " + endx + " " + endy;
	lastangle += angle;
	return pathstr;
    }).attr("fill", color).attr("stroke", "black").attr("count", function(d, i){return i;}).attr("fill-opacity", function(d, i) {
	return (i+1) / data.length;
    });
};


    
