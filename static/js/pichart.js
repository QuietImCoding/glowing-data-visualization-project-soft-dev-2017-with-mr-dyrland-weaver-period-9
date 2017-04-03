var pichart = function(slices,data,cx, cy, radius, radii) {
    var lastangle = 0;
    var lastslice = [cx, cy-radius];
    slices.data(data).enter().append("path").attr("d", function(d, i) {
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
    }).attr("fill", function(d) {return "hsl(" + Math.floor(360 * Math.random()) + ", 80%, 60%)"}).attr("stroke", "black").attr("count", function(d, i){return i;});
};
