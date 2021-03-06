function XYZSystem(in_gl, x, y){
	
	
	var currentObj = this;
	console.log(currentObj);

	this.localInit = function(){
		
		currentObj.refSysPositionX = new Float32Array(3 * 2);
		currentObj.refSysPositionY = new Float32Array(3 * 2);
		currentObj.refSysPositionZ = new Float32Array(3 * 2);
		
		
		var rect = in_gl_canvas.getBoundingClientRect();
		
		var canvasMX = in_gl_canvas.clientWidth - 50;
		var canvasMY = in_gl_canvas.clientHeight - 50;
		
		var x = ( 2.0 * canvasMX ) / in_gl_canvas.clientWidth - 1.0;
		var y = 1.0 - ( 2.0 * canvasMY ) / in_gl_canvas.clientHeight;
		var z = 1.0;
		
		currentObj.T = mat4.create();
		mat4.identity(currentObj.T);
		
		var T_inverse = mat4.create();
		mat4.inverse(currentObj.T, T_inverse);
		
		var R_inverse = mat4.create();
		mat4.inverse(currentObj.R, R_inverse);
		
		
		mat4.multiply(T_inverse, R_inverse,  currentObj.vMatrix);
		
		
		mat4.translate(currentObj.T, [x, y, z])
		
		currentObj.R = mat4.create();
		mat4.identity(currentObj.R);
		
	};
	
	this.initBuffer = function(){
		
	
//		var versors = [
//			[1.5, 0.0, 0.0],
//			[0.0, 1.5, 0.0],
//			[0.0, 0.0, 1.5]
//			];
		
		currentObj.refSysPositionX[0] = 0.0;
		currentObj.refSysPositionX[1] = 0.0;
		currentObj.refSysPositionX[2] = 0.0;
		currentObj.refSysPositionX[3] = 1.5;
		currentObj.refSysPositionX[4] = 0.0;
		currentObj.refSysPositionX[5] = 0.0;
		
		currentObj.refSysPositionY[0] = 0.0;
		currentObj.refSysPositionY[1] = 0.0;
		currentObj.refSysPositionY[2] = 0.0;
		currentObj.refSysPositionY[3] = 0.0;
		currentObj.refSysPositionY[4] = 1.5;
		currentObj.refSysPositionY[5] = 0.0;
		
		currentObj.refSysPositionZ[0] = 0.0;
		currentObj.refSysPositionZ[1] = 0.0;
		currentObj.refSysPositionZ[2] = 0.0;
		currentObj.refSysPositionZ[3] = 0.0;
		currentObj.refSysPositionZ[4] = 0.0;
		currentObj.refSysPositionZ[5] = 1.5;
				
		
		currentObj.refSysPositionXBuffer = in_gl.createBuffer();
		currentObj.refSysPositionYBuffer = in_gl.createBuffer();
		currentObj.refSysPositionZBuffer = in_gl.createBuffer();
	};
	
	
	this.enableBuffer = function(shaderProgram){
		
		shaderProgram.sphericalGridEnabledUniform = in_gl.getUniformLocation(shaderProgram, "uSphericalGrid");
		
		
		
		/*
		 * x: red
		 * y: green
		 * z: blue
		 */
		// rendering X axes
		in_gl.uniform1f(shaderProgram.sphericalGridEnabledUniform, 2.0);
		in_gl.bindBuffer(in_gl.ARRAY_BUFFER, currentObj.refSysPositionXBuffer);
		in_gl.bufferData(in_gl.ARRAY_BUFFER, currentObj.refSysPositionX, in_gl.STATIC_DRAW);
		in_gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, in_gl.FLOAT, false, 0, 0);
		in_gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
		in_gl.drawArrays(in_gl.LINE_STRIP, 0, 2);

		// rendering Y axes
		in_gl.uniform1f(shaderProgram.sphericalGridEnabledUniform, 3.0);
		in_gl.bindBuffer(in_gl.ARRAY_BUFFER, currentObj.refSysPositionYBuffer);
		in_gl.bufferData(in_gl.ARRAY_BUFFER, currentObj.refSysPositionY, in_gl.STATIC_DRAW);
		in_gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, in_gl.FLOAT, false, 0, 0);
		in_gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
		in_gl.drawArrays(in_gl.LINE_STRIP, 0, 2);

		// rendering Z axes
		in_gl.uniform1f(shaderProgram.sphericalGridEnabledUniform, 4.0);
		in_gl.bindBuffer(in_gl.ARRAY_BUFFER, currentObj.refSysPositionZBuffer);
		in_gl.bufferData(in_gl.ARRAY_BUFFER, currentObj.refSysPositionZ, in_gl.STATIC_DRAW);
		in_gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, in_gl.FLOAT, false, 0, 0);
		in_gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
		in_gl.drawArrays(in_gl.LINE_STRIP, 0, 2);

	};
	
	this.draw = function(shaderProgram){
		
		currentObj.enableBuffer(shaderProgram);
		
	};
	
	this.localInit();
	this.initBuffer();
	
	
}