$(document).ready(function(){
url=window.location.search;
var param=url.replace("?geo=","");

if(param==5){
	$("#geo5").prop("checked",true);
	/*Initiate the map*/
    var map = new Datamap({
      element: document.getElementById('container'),
      geographyConfig: {
        dataUrl: 'maps/sldu.json',
		/*popupTemplate: function(geography, data){
			  return '<div class=hoverinfo><strong>' + data.tractName + '</strong><div><b>County: </b>' + data.countyName + '</div><div><b>Percent of Population Below Poverty, 2016: </b>' + data.povPer + '</div></div>';

		}*/
      },
      scope: "tl_2015_06_sldu",
	  fills: {
		'defaultFill': 'grey',
		1: '#bdd7e7',
		2: '#6baed6',
		3: '#3182bd',
		4: '#08519c',
		'Insufficient data':'grey'
	  },
	  dataUrl:'csv/senate.csv',
	  dataType:'csv',
      setProjection: function(element, options) {
         var projection = d3.geo.mercator()
           .center([-119.417931, 36.778259])
           //.rotate([4.4, 0])
           .scale(4000)
           .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var path = d3.geo.path()
               .projection(projection);
                                               
        return {path: path, projection: projection};
        },
		done: function(datamapClick) {
			datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
				console.log(geography.id);
			});
		},
		done: function(datamap) {
           datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));

           function redraw() {
                datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
           }
        }
		
    });
	
	//map.legend({legendTitle:"Percent of Population Below Poverty, 2016 by Census Tracts"});
}
});
