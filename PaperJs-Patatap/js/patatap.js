// Make the paper scope global, by injecting it into window:
paper.install(window);
window.onload = function() {
	// Setup directly from canvas id:
	paper.setup('myCanvas');
	var path = new Path();
	path.strokeColor = 'green';
	var start = new Point(100, 100);
	path.moveTo(start);
	path.lineTo(start.add([ 200, -50 ]));


	var tool = new Tool();
	var path;

	// Define a mousedown and mousedrag handler
	tool.onKeyDown = function(event) {

		var maxPoint = new Point(view.size.width, view.size.height);

		console.log(maxPoint);
		path = new Path();

		new Path.Circle(maxPoint, 10).fillColor = "yellow";

	};
	//
	// tool.onMouseDrag = function(event) {
	// 	path.add(event.point);
	// }


	paper.view.draw();
}