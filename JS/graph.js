var content = [2,3,4,5];

/*$(".graph-me").click(function () {
new Morris.Line({
  // ID of the element in which to draw the chart.
  element: 'graph',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: data,
  // The name of the data record attribute that contains x-values.
  xkey: 'year',
  // A list of names of data record attributes that contain y-values.
  ykeys: ['value'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['Value']
});

    }

      )*/
var data = {
  labels:[],
};

var graphData=[[4,4],[0,5],[7,6],[22,7]]


$(".graph-me").click(function () {
var x_val= [];
graphData.sort();
    for (var i = 0; i < graphData.length; i++) {
        var array = graphData[i];   
        console.log(array)
        data.labels.push(array[0]);
        x_val.push(array[1]);
    }
data.datasets = [{data:x_val}];

var ctx = $("#graph").get(0).getContext("2d");
// This will get the first returned node in the jQuery collection.
var myNewChart = new Chart(ctx);
var options = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    datasetFill : false,

  }
var myLineChart = new Chart(ctx).Line(data, options);

})
