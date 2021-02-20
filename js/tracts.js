$(document).ready(function(){

	/*Initiate the map*/
    var map = new Datamap({
      element: document.getElementById('container'),
      geographyConfig: {
        dataUrl: 'maps/caTracts.json',
		popupTemplate: function(geography, data){
			  return '<div class=hoverinfo><strong>' + data.tractName + '</strong><div><b>County: </b>' + data.countyName + '</div><div><b>Percent of Population Below Poverty, 2016: </b>' + data.povPer + '</div></div>';

		}
      },
      scope: "tracts",
	  fills: {
		'defaultFill': 'grey',
		'Below 5%': '#eff3ff',
		'5% to 9%': '#bdd7e7',
		'10% to 19%': '#6baed6',
		'20% to 29%': '#3182bd',
		'30% and above': '#08519c',
		'Insufficient data':'grey'
	  },
	  dataUrl:'https://map.healthyplacesindex.org/data/tracts/hpi2score',
	  dataType:'json',
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
	
	map.legend({legendTitle:"Percent of Population Below Poverty, 2016 by Census Tracts"});
	
	/*d3.select("container").append("p")
		.attr("id","attribution")
		.html( "Basemap data &copy; <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> and <a href='http://www.naturalearthdata.com/' target='_blank'>Natural Earth</a>." );*/
});
