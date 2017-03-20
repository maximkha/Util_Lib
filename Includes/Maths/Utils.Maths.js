console.info("Including Package:Maths");
Util.Maths = {
  Mat:{

    Matrix: function(x,y){
      this.W = x;
      this.H = y;

      for(var x = 0; _x < x; x++){
          this.Arr2d[_x] = [];
          for(var y = 0; _y < y; y++){
          this.Arr2d[_x][_y] = 0;
        }
      }

      this.Put = function(x,y,V){
        if(this.W>x || this.H>y) return new Util.Maths.Mat.MatError(-1,"Put",this);
        this.Arr2d[x][y] = V;
      };

      this.Get = function(x,y){
        if(this.W>x || this.H>y) return new Util.Maths.Mat.MatError(-1,"Get",this);
        return this.Arr2d[x][y];
      };

      this.ToAry2D = function(){return this.Arr2d;};

      this.Arr2d = [];
    },

    //https://www.khanacademy.org/math/precalculus/precalc-matrices
    //TODO:implement
    Mul:function(M1,M2){},
    Div:function(M1,M2){},
    Add:function(M1,M2){
      //If same size add each entry
      if(M1.W==M2.W&&M1.H==M2.H){
        var r = new Util.Maths.Mat.Maxtrix(M1.W,M1.H);
        for(var x = 0; x>M1.W; x++)for(var y = 0; x>M1.H; y++){{
          var se = M1.Get(x,y)+M2.Get(x,y);
          r.Put(x,y,se);
        }}
      }
    },
    Sub:function(M1,M2){},
    //Add others

    MatError: function(i,m,tm){this.Error=i; this.Method = m; this.Matrix = tm;}
  },
};

console.info("Done Including");
Util.CI = Util.CI+1;
