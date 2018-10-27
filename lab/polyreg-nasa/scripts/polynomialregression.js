function polynomialRegression(theObject, order){
            
    var n = Object.keys(theObject).length;
            
    var matrix = new Array(order+1);
    for (var i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(order+1);
    }

    var matrixY = new Array(order+1);
    for (var i = 0; i < matrixY.length; i++) {
        matrixY[i] = [];
    }

    var matrixGJ = new Array(order+1);
    for (var i = 0; i < matrixGJ.length; i++) {
        matrixGJ[i] = new Array(order+2);
    }

    var a,b;

    for(a = 0; a <= order; a++){
        for(b = 0; b <= order; b++){
            if(a==0 && b==0){
                matrix[a][b] = n;
            }else{
                var SigmaX = 0;
                Object.keys(theObject).forEach(function(x){
                    SigmaX += Math.pow(x,(a+b));
                    //console.log(x+" ^"+(a+b)+" -> "+Math.pow(x,(a+b)));
                });
                //matrix[y][x]
                matrix[a][b] = SigmaX;
            }
        }
    }

    b = 0;
    for(a = 0; a <= order; a++){
        var SigmaXY = 0;
        Object.keys(theObject).forEach(function(x){
            SigmaXY += theObject[x] * Math.pow(x,(a));
        });
        matrixY[a][b] = SigmaXY;
    }

    //fill gauss jordan matrix
    for(a = 0; a <= order; a++){
        for(b = 0; b <= order+1; b++){
            if(b==order+1){
                matrixGJ[a][b] = matrixY[a][0];
            }else{
                matrixGJ[a][b] = matrix[a][b];
            }

        }
    }

    consoleMat(matrix); //print in console
    console.log(" ");
    consoleMat(matrixY);
    console.log(" ");
    consoleMat(matrixGJ);
    console.log(" ");


    var GJ = GaussJordan(matrixGJ);
    var sizeGJ = GJ.length;
    console.log(sizeGJ);

    console.log(" ");
    console.log("Gauss Jordan");
    consoleMat(GJ);

    var GaussJordanResult = new Array(sizeGJ);
    var a = 0;
    for(a=0;a<sizeGJ;a++){
        var arrtemp = [];
        arrtemp.push(GJ[a][sizeGJ]);
        GaussJordanResult[a] = arrtemp;
    }


    consoleMat(GaussJordanResult);
    console.log(" ");

    return GaussJordanResult;

}
        
function consoleMat(myObject){
    myObject.forEach(function(myArr){
        var row="";
        myArr.forEach(function(num){
            var spaceS = num.toExponential(3).length;
            var space = "";
            for(i=0;i<(12-spaceS);i++){
                space+=" ";
            }
            row += num.toExponential(3)+space;    

        });
        console.log(row);
    });

}



function GaussJordan(mat){
    var it = 0; //iteration number
    var ord = mat.length; //order
    
    for(it = 0; it < ord; it++){
        var i = []; //adjusted data array to get 1 on desired column
        var rn = 0; //row number
        var c = 0; //column for i
        mat[it].forEach(function(val){
            i[c] = val / mat[it][it];
            c++;
        });

        mat.forEach(function(row){
            var focusSubstractVal = mat[rn][it]; //the value that we want to turn to zero
            if(rn == it){
                var cn = 0; //column number
                row.forEach(function(val){
                    mat[rn][cn] = i[cn];
                    cn++;
                });
            }else{
                var cn = 0; //column number
                row.forEach(function(val){
                    mat[rn][cn] = mat[rn][cn] - (i[cn] * focusSubstractVal);
                    cn++;
                });
            }                    


            console.log("iteration "+it+"."+rn);
            consoleMat(mat);

            rn++;
        });
        

    }
    return mat;
}
