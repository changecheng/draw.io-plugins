
Draw.loadPlugin(function(ui) {

	var graph = ui.editor.graph;
	var canvas = document.createElement('canvas')
	var imgDOM
	var w
	function addExportPanel() {
		imgDOM = document.createElement('img')
		imgDOM.className = 'my-test-img'
		imgDOM.style['max-width'] = '100%'
		w = new mxWindow('export',imgDOM,document.body.offsetWidth-300,120,200,200)
		w.setClosable(true)
		w.setVisible(true)
		w.setResizable(true)
		w.div.addEventListener('click',function (e) {
			drawInlineSVG()
		})
	}



	function drawInlineSVG(){ 
	  if(imgDOM){
	  	try{
			var svgData = graph.getSvg(null,null,null,false,null,false)
		  	var svgURL = new XMLSerializer().serializeToString(svgData);

		  	var img  = new Image();
		  	canvas.width = svgData.width.baseVal.value
		  	canvas.height = svgData.height.baseVal.value
		  	img.width = canvas.width
		  	img.height = canvas.height
		  	var ctx = canvas.getContext('2d')
		  	ctx.clearRect(0,0,canvas.width,canvas.height)
			img.onload = function(){
				ctx.drawImage(this, 0,0);
				imgDOM.src = canvas.toDataURL()
			}
			img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
	  	}catch(e){

	  	}
	  	
	  	
	  }
	  
	 }

	addExportPanel()

});
