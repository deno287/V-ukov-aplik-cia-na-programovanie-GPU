module.exports = 
 { 
 start: function(){ 

var parallel = require('../../../denis.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var matrixA= [];
var matrixB= [];
var matrixC= [];

matrixA = parallel.createZeroMatrix(3, 3);
matrixB = parallel.createZeroMatrix(3, 3);
matrixC = parallel.createZeroMatrix(3, 3);

var numrows = 3, numcols = 3;
matrixA[0+0*numcols]=1;
matrixA[0+1*numcols]=4;
matrixA[0+2*numcols]=7;
matrixA[1+0*numcols]=2;
matrixA[1+1*numcols]=5;
matrixA[1+2*numcols]=8;
matrixA[2+0*numcols]=3;
matrixA[2+1*numcols]=6;
matrixA[2+2*numcols]=9;

matrixB[0+0*numcols]=9;
matrixB[0+1*numcols]=6;
matrixB[0+2*numcols]=3;
matrixB[1+0*numcols]=8;
matrixB[1+1*numcols]=5;
matrixB[1+2*numcols]=2;
matrixB[2+0*numcols]=7;
matrixB[2+1*numcols]=4;
matrixB[2+2*numcols]=1;

bufA = parallel.copy(matrixA);
bufB = parallel.copy(matrixB);
bufC = parallel.copy(matrixC);
parallel.parameter(kern, 0, bufA);
parallel.parameter(kern, 1, bufB);
parallel.parameter(kern, 2, bufC);

var cq = parallel.run(kern, 2, 9);

parallel.read(kern,cq,bufC, matrixC);

return [matrixA,matrixB,matrixC]} 
 }