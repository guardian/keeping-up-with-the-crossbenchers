import * as graphScroll from 'graph-scroll'
import * as d3 from 'd3'

var features,svg,simulation;
var pageWidth = document.documentElement.clientWidth;
var pageHeight = document.documentElement.clientHeight;
var activateFunctions = [];
var width,height,headerHeight;
var startPhase = 1;
var oldData;
var circleRad = 25;
var circleStroke = 5;
var path = process.env.PATH;
var mobile = false;
var margin = {top: 0, right: 0, bottom: 0, left:0};
var functionCounter = 0;
var positionOffset = 50;

if (pageWidth < 640) {
	mobile = true;
}

if (mobile) {
	circleRad = 20;
	circleStroke = 3;
}

var headerOffset = 48;
var gndHeader = document.getElementById("bannerandheader");

if (gndHeader != null) {
	headerOffset = gndHeader.getBoundingClientRect().height
}

width = document.querySelector("#container1").getBoundingClientRect().width - margin.left - margin.right;

headerHeight = document.querySelector(".interactive-container .header").getBoundingClientRect().height;

console.log("headerOffset:",headerOffset, "headerHeight:", headerHeight);

if (functionCounter > 0) {
	height = pageHeight * 0.66 - margin.top - margin.bottom;
	d3.select("#graphic svg")
		.transition()
		.attr("height",height + margin.top + margin.bottom);
}

else {
	// height = pageHeight - headerHeight - headerOffset - margin.top - margin.bottom;
	height = pageHeight*0.66 - margin.top - margin.bottom;
}

if (width > 1260) {
	width = 1260;
}

var scaleFactor = width/1300;
var divs = d3.selectAll('#sections > div')

divs.each(function (d,i) {

	d3.select(this).style("min-height", pageHeight*0.4 + "px")
	
});

d3.select('#gv-footer')
	.style("height", pageHeight*0.70 + "px");

var parties = ["Jacqui Lambie Network","One Nation","Liberal Democrats","Family First","Independent","Australian Conservatives","Nick Xenophon Team","Centre Alliance","DH's Justice party"]
var colours  = ["#FFA1E1","#996633","#666699","#333333","#767676","#ff9b0b","rgb(255, 88, 0)","rgb(255, 88, 0)","#4a7801"]
var img_defs = ["david_leyonhjelm","pauline_hanson","brian_burston","rod_culleton","malcolm_roberts","skye_kakoschke-moore","nick_xenophon","stirling_griff","bob_day","jacqui_lambie","peter_georgiou","lucy_gichuhi","cory_bernardi","fraser_anning","rex_patrick","steve_martin","tim_storer","derryn_hinch"]


var color = d3.scaleOrdinal()
				.domain(parties)
				.range(colours);

svg = d3.select("#graphic").append("svg")
				.attr("width", width - margin.left - margin.right)
				.attr("height", height - margin.top - margin.bottom)
				.attr("id", "svg")
				.attr("overflow", "hidden");


var defs = svg.append("defs").attr("id", "imgdefs");

defs.selectAll(".patterns")
    .data(img_defs, function(d) {
        return d
    })
    .enter().append("pattern")
    .attr("id", function(d) {
        return d;
    })
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", function(d) {
        return "<%= path %>/assets/" + d + ".jpeg"
    })
    .attr("width", circleRad*2)
    .attr("height", circleRad*2);


var tau = 2 * Math.PI;
		
var arc = d3.arc()
    .innerRadius(circleRad)
    .outerRadius(circleRad + circleStroke + 7)
    .startAngle(0.75 * tau)
    .endAngle(0.25 * tau);

// function getPathData() {
//     var pathRad = circleRad;
//     var startX = width/2 - pathRad;
//     return 'm' + 0 + ',' + (circleRad*2) + ' ' +
//       'a' + pathRad + ',' + pathRad + ' 0 0 0 ' + (2*pathRad) + ',0';
// }

// console.log(getPathData());


// defs.selectAll(".textPaths")
// 	.data(img_defs, function(d) {
//         return d
//     })
//     .enter().append('path')
// 	.attr("d", getPathData())
// 	.attr("id",function (d) { return d + "_textPath"});


features = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var quarter = width * 0.25;
var fifth = width * 0.20;


if (!mobile) {

features.append("text")
	.attr("x", quarter)
	.attr("y", height * 0.2)
	.attr("text-anchor","middle")
	.attr("class", "label")
	.attr("id","label1")
	.attr("opacity",1)
	.text("One Nation");

features.append("text")
	.attr("x", 2*quarter)
	.attr("y", height * 0.2)
	.attr("text-anchor","middle")
	.attr("class", "label")
	.attr("id","label2")
	.attr("opacity",1)
	.text("Xenophon Team");

features.append("text")
	.attr("x", 3*quarter)
	.attr("y", height * 0.2)
	.attr("text-anchor","middle")
	.attr("class", "label")
	.attr("id","label3")
	.attr("opacity",1)
	.text("Family First");

features.append("text")
	.attr("x", fifth)
	.attr("y", height * 0.55)
	.attr("text-anchor","middle")
	.attr("class", "label")
	.attr("id","label4")
	.attr("opacity",1)
	.text("Liberal Democrats");

features.append("text")
	.attr("x", 2*fifth)
	.attr("y", height * 0.55)
	.attr("text-anchor","middle")
	.attr("class", "label")
	.attr("id","label5")
	.attr("opacity",1)
	.text("DH's Justice party");	

features.append("text")
	.attr("x", 3*fifth)
	.attr("y", height * 0.55)
	.attr("text-anchor","middle")
	.attr("class", "label")
	.attr("id","label6")
	.attr("opacity",1)
	.text("Jacqui Lambie Network");		

features.append("text")
	.attr("x", 4*fifth)
	.attr("y", height * 0.55)
	.attr("text-anchor","middle")
	.attr("class", "label")
	.attr("id","label7")
	.attr("opacity",0)
	.text("Australian Conservatives");	
}

features.append("text")
	.attr("x", width/2)
	.attr("y", "30")
	.attr("text-anchor","middle")
	.attr("id", "crossbenchThe")
	.text("the");	

features.append("text")
	.attr("x", width/2)
	.attr("y", "55")
	.attr("text-anchor","middle")
	.attr("id", "crossbenchMain")
	.text("Crossbench");		

features.append("text")
	.attr("text-anchor","middle")
	.attr("class", "categoryLabel")
	.attr("transform", "translate(15," + height/2 + ") rotate(90)")
	.text("Non-politicians");	

features.append("text")
	.attr("text-anchor","middle")
	.attr("class", "categoryLabel")
	.attr("transform", "translate(" + (width - 15) + "," + height/2 + ") rotate(-90)")
	.text("Major parties");

features.append("rect")
	.attr("x", "5")
	.attr("y", height/2 - 100)
	.attr("height", "200")
	.attr("width", "2")
	.attr("fill", "#bdbdbd")

features.append("rect")
	.attr("x", width - 5)
	.attr("y", height/2 - 100)
	.attr("height", "200")
	.attr("width", "2")
	.attr("fill", "#bdbdbd")	

// 'https://interactive.guim.co.uk/docsdata/14r3QSC0ILMwG3ZemlE_QIl_O5Cjgb_qV9L_Njwi9kbo.json'

Promise.all([
	d3.json('<%= path %>/assets/' + '14r3QSC0ILMwG3ZemlE_QIl_O5Cjgb_qV9L_Njwi9kbo.json')
])
.then((data) =>  {
	setUpGraphic(data[0].sheets);
});



function setUpGraphic(data) {

	var filteredData = data['crossbench-groupings'].filter(function(d){return d.phase == startPhase;});
	
	// console.log(filteredData)

	var center = {x: width / 2, y: height / 2};
	var forceStrength = 0.03;

	simulation = d3.forceSimulation(filteredData)
		.force('x', d3.forceX().x(center.x))
		.force('y', d3.forceY().y(center.y))
		.force("collide",d3.forceCollide(circleRad + circleStroke + 1).iterations(16) )
		.force('charge', d3.forceManyBody().strength(-4))
	    .alphaTarget(1)
	    .on("tick", ticked);

	function ticked() {

		features.selectAll(".nodes").attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" });

		// node.attr("cx", function(d) { return d.x; })
  		//     .attr("cy", function(d) { return d.y; })
	}

	oldData = filteredData;
	simulation.nodes(filteredData);   

	function updateBubbles(phase) {

		var keyedOldData = {}

		oldData.forEach( function(d) {
			keyedOldData[d.name.replace(" ","_")] = d
		})

		// console.log("old data",keyedOldData)

		var newData = data['crossbench-groupings'].filter(function(d){ return d.phase == phase; });

		newData.forEach( function (node) {
			if (phase == 1) {
				node.x = 0
		       	node.y = height/2
			}
			else {
				if (node.name.replace(" ","_") in keyedOldData) {
			       	node.x = keyedOldData[node.name.replace(" ","_")].x
			       	node.y = keyedOldData[node.name.replace(" ","_")].y
	    		}

	    		else {
	    			if (node.comesFrom != "coalition") {
	    				node.x = 0
		       			node.y = height/2
	    			}
	    			
	    			else {
	    				node.x = width + (circleRad*2)
		       			node.y = height/2
	    			}
	    		}
			}
	    

	  })

		var node = features.selectAll(".nodes").data(newData, function (d) {return d.name.replace(" ", "_")})
		// node.data(filteredData, function (d) {return d.name.replace(" ", "_")}).merge(node);
		
		node.exit()
			.transition()
			.attr("transform", function(d) { 
				if (d.leavesTo != "coalition") {
					return "translate(" + 0 + "," + height/2 + ")" 
				}

				else {
					return "translate(" + width + "," + height/2 + ")" 	
				}
				
			})
			.remove();

		var nodeContainer = node.enter()
			.append("g")
			.attr("class", function(d) { return "nodes"; })	

		nodeContainer
				.append("circle")
				.attr("class", function(d) { return d.name.replace(" ", "_") + " nodeCircle" })
				.attr("title", function(d) { return d.name + " " + d.phase})		
				.attr("fill", function(d) { 
					return "url(#" + d.img + ")";
				})
				.attr("stroke", function(d) {
			 		return color(d.party)
				})
				.attr("stroke-width", circleStroke)
				.attr("id", function(d) { return d.name.replace(" ", "_") + "_circle" })
				.attr("r", circleRad)
		
	
		nodeContainer.append("path")
		    .attr("opacity",0)
		   	.attr("id", function(d) { return d.name.toLowerCase().replace(" ", "_") + "_textPath"})
		    .attr("d", arc);

		nodeContainer		
			.append("text")
		    .append("textPath")
		    .attr("xlink:href", function(d) { 
		    	return "#" + d.name.toLowerCase().replace(" ", "_") + "_textPath" 
		    })
		    .attr("startOffset", "26%")
		    .style("font-size",12)
		    .attr("text-anchor","middle")
		    .text(function(d) { return d.lastName; });	    


		newData.forEach(function (nd) {
			d3.select("."+ nd.name.replace(" ", "_") + ".nodeCircle")
				.transition('strokeColour')
				.attr("stroke", function() {
					return color(nd.party) 
				})

		});

		forceStrength = 0.03;
		simulation.nodes(newData);
	    simulation.force('x', d3.forceX().x(nodePosX))
	    simulation.force('y', d3.forceY().y(nodePosY))
	    simulation.alpha(1).restart();
	    oldData = newData;

	    // ["Jaqui Lambie Network","One Nation","Liberal Democrats","Family First","Independent","Australian Conservatives","Nick Xenophon Team","Centre Alliance"]

	 	function nodePosX(d) {

	 		var quarter = width * 0.25;
	 		var fifth = width * 0.20;

	 		if (!mobile) {
		 		if (d.party === "One Nation") {

		 			return quarter
		 		}

		 		else if (d.party == "Nick Xenophon Team" || d.party == "Centre Alliance") {
		 			return 2*quarter
		 		}

		 		else if (d.party == "Independent" || d.party == "Family First") {
		 			return 3*quarter
		 		}
		 		
		 		else if (d.party == "Liberal Democrats") {
		 			return fifth
		 		}

		 		else if (d.party == "DH's Justice party") {
		 			return 2*fifth
		 		}

		 		else if (d.party == "Jacqui Lambie Network") {
		 			return 3*fifth
		 		}

		 		else if (d.party == "Australian Conservatives") {
		 			return 4*fifth
		 		}

		 		else {
		 			return - 100
		 		}
	 		}

	 		else {
	 			return width/2
	 		}
	 	
	 	}

	 	function nodePosY(d) {

	 		var quarter = width * 0.25;
	 		var fifth = width * 0.20;

	 		if (!mobile) {
	 				if (d.party === "One Nation") {

		 			return height*0.33
		 		}

		 		else if (d.party == "Nick Xenophon Team" || d.party == "Centre Alliance") {
		 			return height*0.33
		 		}

		 		else if (d.party == "Independent" || d.party == "Family First") {
		 			return height*0.33
		 		}

		 		else if (d.party == "Liberal Democrats") {
		 			return height*0.66
		 		}

		 		else if (d.party == "DH's Justice party") {
		 			return height*0.66
		 		}

		 		else if (d.party == "Jacqui Lambie Network") {
		 			return height*0.66
		 		}

		 		else if (d.party == "Australian Conservatives") {
		 			return height*0.66
		 		}

		 		else {
		 			return - 100
		 		}

	 		}

	 		else {
	 			return height/2
	 		}

	 	
	 	}


	}

	var yearText = d3.select("#yearText");
	var timer = 0
	var totalYears = 17

	function update1() {

		pageHeight = document.documentElement.clientHeight;
		height = pageHeight*0.66 - margin.top - margin.bottom;

		d3.select("#graphic svg")
			.transition("svgHeight")
			.attr("height",height + margin.top + margin.bottom);
		updateBubbles(1);
		d3.select("#label3").text("Family First")
		d3.select("#label7").transition().attr("opacity",0)
		d3.select("#label2").text("Xenophon Team")
	}

	function update2() {
		updateBubbles(2);
		d3.select("#label3").text("Independent")
		d3.select("#label3").transition().attr("opacity",1)
		d3.select("#label67").transition().attr("opacity",0)
		d3.select("#label2").text("Xenophon Team")
		d3.select("#label7").transition().attr("opacity",0)
	}
	function update3() {
		updateBubbles(3);
		d3.select("#label7").transition().attr("opacity",1)
		d3.select("#label2").text("Xenophon Team")
	}
	function update4() {
		updateBubbles(4);	
		d3.select("#label2").text("Xenophon Team")
	}
	function update5() {
		updateBubbles(5);
		d3.select("#label2").text("Xenophon Team")
		d3.select("#label6").transition().attr("opacity",1)
	}
	function update6() {
		updateBubbles(6);
		d3.select("#label2").text("Xenophon Team")
		d3.select("#label6").transition().attr("opacity",0)

	}
	function update7() {
		updateBubbles(7);
		d3.select("#label3").transition().attr("opacity",1)		
		d3.select("#label2").text("Xenophon Team")
	}
	function update8() {
		updateBubbles(8);	
		
		d3.select("#label2").text("Xenophon Team")
	}
	function update9() {
		updateBubbles(9);
		d3.select("#label2").text("Xenophon Team")	
	}
	function update10() {
		updateBubbles(10);
		d3.select("#label2").text("Xenophon Team")
	}
	function update11() {
		updateBubbles(11);
		d3.select("#label2").text("Centre Alliance")	
	}
	function update12() {
		updateBubbles(12);
		d3.select("#label2").text("Centre Alliance")
	}
	function update13() {
		updateBubbles(13);
		d3.select("#label2").text("Centre Alliance")
	}

	activateFunctions[0] = update1
	activateFunctions[1] = update2
	activateFunctions[2] = update3
	activateFunctions[3] = update4
	activateFunctions[4] = update5
	activateFunctions[5] = update6
	activateFunctions[6] = update7
	activateFunctions[7] = update8
	activateFunctions[8] = update9
	activateFunctions[9] = update10
	activateFunctions[10] = update11
	activateFunctions[11] = update12
	activateFunctions[12] = update13

	console.log("top bt", height * 0.33)

	var gs = graphScroll.graphScroll()
		.container(d3.select('#container1'))
		.graph(d3.selectAll('.graphicContainer'))
		.sections(d3.selectAll('#sections > div'))
		.offset(height * 0.33 + 10)
		.on('active', function(i){
			activateFunctions[i]();
		});

	var initDivBottom = document.getElementById("graphicCol").getBoundingClientRect().bottom;	

	window.addEventListener('scroll', function(e) {

	var windowBottom = scrollY + window.innerHeight;
	var divBottom = scrollY + document.getElementById("graphicCol").getBoundingClientRect().bottom;


  	if (windowBottom > divBottom) {
  		initDivBottom = scrollY + document.getElementById("graphicCol").getBoundingClientRect().bottom;
  		document.getElementById("graphicCol").setAttribute('style', "position: fixed;");
  	}

  	if (windowBottom <= initDivBottom) {
  		document.getElementById("graphicCol").setAttribute('style', "position: static;");
  	}
	});	

	console.log(document.getElementById("graphicCol").getBoundingClientRect())
	console.log("headerOffset:",headerOffset)

}



// var data = d3.csvParse(speciesData);// javascript goes here