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
	var angle = (360 * (Math.abs(d)/100));
	var endx = cx+(Math.abs(radius)*(Math.cos(toRadians(lastangle+angle-90))));
	var endy = cy+(Math.abs(radius)*(Math.sin(toRadians(lastangle+angle-90))));
	if (d < 0) {
	    lastslice = [endx, endy];
	    lastangle += angle;
	    return "";
	}
	var pathstr = "M "+ lastslice[0] + " " + lastslice[1] + " ";
	pathstr += "A " + radius + " " + radius + " " + 1 + " " + (angle > 180)*1 + " " + 1 + " " + endx + " " + endy;
	lastslice = [endx, endy];
	endx = (cx+((radius+radii[i])*(Math.cos(toRadians(lastangle+angle-90)))));
	endy = (cy+((radius+radii[i])*(Math.sin(toRadians(lastangle+angle-90)))));
	pathstr += " L " + endx + " " + endy;
	endx = cx+((radius+radii[i])*(Math.cos(toRadians(lastangle-90))));
	endy = cy+((radius+radii[i])*(Math.sin(toRadians(lastangle-90))));
	pathstr += "A " + (radius+radii[i]) + " " + (radius+radii[i]) + " " + 0 + " " + (angle > 180)*1 + " " + 0 + " " + endx + " " + endy;
	lastangle += angle;
	return pathstr;
    }).attr("fill", color).attr("stroke", "black").attr("count", function(d, i){return i;}).attr("fill-opacity", function(d, i) {
	if (data.length > 3) {
	    return (i < data.length/3)*.33 + (i >= data.length/3 && i < 2 * data.length/3)*.66 + (i >= 2*data.length/3)*1;
	} else {
	    return (i+1) / data.length;
	}
    });
};
    
