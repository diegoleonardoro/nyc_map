
var width = 1000;
var height = 530;

d3.select('svg')
    .attr('width', width)
    .attr('height', height);


d3.json('data.json').then(function (data) {

    //..................................................................................//

    var geoID = function (d) {
        return "c" + d.properties.boro_code;
    };

    var click = function (d) {
        d3.selectAll('path').attr('fill-opacity', 0.2)
        d3.select('#' + geoID(d)).attr('fill-opacity', 1);
    };

    //..................................................................................//

    var projection = d3.geoEquirectangular()
        .scale(300)
        .center([-3.0026, 16.7666])
        .translate([480, 250])
        .fitExtent([[0, 0], [870, 500]], data)
    //.fitSize([900, 800], data);

    var geoGenerator = d3.geoPath()
        .projection(projection);

    var u = d3.select('svg')
        .selectAll('path')
        .data(data.features)

    var color = d3.scaleLinear()
        .domain([0, 4])
        .range(["grey", "black"]);

    u.enter()
        .append('path')
        .attr('d', geoGenerator)
        .attr('fill', function (d, i) { return color(i); })
        .attr('id', geoID)
        .on("click", click);

    click(data.features[3]);
    u.exit().remove();

    console.log("try", data.features[3])



});






//Data.findIndex(item => item.name === 'John');


// 1. --> GeoJSON: (a JSON-based format for specifying geographic data)

// 2. --> Projections: (functions that convert from latitude/longitude 
//        co-ordinates to x & y co-ordinates)

// 3. --> Geographic Path Generators: (functions that convert GeoJSON 
//        shapes into SVG or Canvas paths)



//.............................................................................//


// 1. --> GeoJSON: 

/*

"type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Africa"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-6, 36], [33, 30], ... , [-6, 36]]]
      }
*/

// Each feature consists of geometry (simple 
// polygons in the case of the countries and a point for Timbuktu) 
// and properties.

// Properties can contain any information about the 
// feature such as name, id, and other data such as population, GDP etc.




//.............................................................................//




// 2. --> Projections:

//  A projection function takes a longitude and latitude
//  co-ordinate (in the form of an array [lon, lat]) 
//  and transforms it into an x and y co-ordinate:

/*

var projection = d3.geoEquirectangular();

projection( [-3.0026, 16.7666] )
// returns [474.7594743879618, 220.7367625635119]

*/



// Projections have configuration functions for setting the following parameters:

// Scale: Scale factor of the projection. The higher the number the larger the map.
// Center: Projection center [longitude, latitude]. Center specifies the center of projection 
// Translate: Pixel [x,y] location of the projection center. Specifies where the center of projection is located on the screen (with a [x, y] array)
// Rotate: Rotation of the projection [lambda, phi, gamma] (or [yaw, pitch, roll])

// .fitExtent() method sets the projection’s scale and translate such that the geometry fits within a given bounding box:






//.............................................................................//



// 3. --> Geographic Path Generators: 

// A geographic path generator is a function that takes a GeoJSON object 
// and converts it into an SVG path string:

/*

var projection = d3.geoEquirectangular();

var geoGenerator = d3.geoPath()
  .projection(projection);

var geoJson = {
  "type": "Feature",
  "properties": {
    "name": "Africa"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[-6, 36], [33, 30], ... , [-6, 36]]]
  }
}
geoGenerator(geoJson);
// returns "M464.0166237760863,154.09974265651798L491.1506253268278,154.8895088551978

*/




//.............................................................................//



// Putting it all together:

/*
var geoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Africa"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-6, 36], [33, 30], ... , [-6, 36]]]
            }
        }}

--> var projection = d3.geoEquirectangular();

--> var geoGenerator = d3.geoPath()
       .projection(projection);

--> var u = d3.select('#content g.map')
       .selectAll('path')
       .data(geojson.features);

--> u.enter()
       .append('path')
       .attr('d', geoGenerator);

*/







//.............................................................................//










/*
d3.json('data.json').then(function (data) {


    var width = 960;
    var height = 490;

    var boroughs = data.features


    d3.select('svg')
        .attr('width', width)
        .attr('height', height);


    var CityProjection = d3.geoEquirectangular()



    console.log(boroughs.map(x => x.geometry.coordinates))


    d3.select('svg').selectAll('path')
        .data(boroughs.map(x => x.geometry))
        .enter()
        .append('path')
        .attr('fill', '#099')

    var dAttributeFunction = d3.geoPath()
        .projection(CityProjection);



    d3.selectAll('path').attr('d', dAttributeFunction);

});

*/





/*

(function () {
    //...............................................................//
    // 1. Create the dimensions for the svg canvas
    var height = 600,
        width = 900,
        projection = d3.geoMercator(), // geoMercator allows you to go from a cartographic space (latitude and longitude) to a Cartesian space (x, y)—basically a mapping of latitude and longitude to coordinate
        nyc = void 0;
    //...............................................................//



    //...............................................................//
    // 2. geoPath  is a special D3 function that will map the JSON-formatted geographic data into SVG paths
    var path = d3.geoPath().projection(projection);
    //...............................................................//

    //...............................................................//
    // 3.  Create the svg with its dimensions:
    var svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    //...............................................................//

    //...............................................................//
    // 4. load the data and print it:
    d3.json('data.json').then(function (data) {
        //...............................................................//

        //...............................................................//
        // 5. Create a variable that contains the coordinates of each borough
        var boroughs = topojson.feature(data[0], data[0]);
        console.log("1", boroughs)
        // boroughs = boroughs.map(x => x.geometry)
        //...............................................................//




        //...............................................................//
        // 6. Set up the scale and translate:
        var b, s, t;
        projection.scale(1).translate([0, 0]);
        //...............................................................//




        //...............................................................//
        // 7. The bounding box is a spherical box that returns a two-dimensional array of min/max coordinates
        var b = path.bounds(boroughs);
        console.log("2", b)
        //...............................................................//





        //...............................................................//
        // 8. The following programmatically sets the scale and translation of the map
        var s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
        projection.scale(s).translate(t);
        //...............................................................//


        //...............................................................//
        // 9. Here, we will create a map variable that will group all of the following SVG elements into a <g> SVG tag.
        var map = svg.append('g').attr('class', 'boundary');
        nyc = map.selectAll('path').data(boroughs);
        console.log("3", nyc)

        //...............................................................//




        //...............................................................//
        // 10. Enter:
        nyc.enter()
            .append('path')
            .attr('d', path);
        //Update
        nyc.attr('fill', '#eee');
        //Exit
        nyc.exit().remove();
        //...............................................................//

    });

})();

*/















