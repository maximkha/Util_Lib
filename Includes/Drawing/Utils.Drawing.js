//Author: Maxim Khanov
//License: GNU General Public License
//Version:5.0 EXP
console.info("Fast Includer Started Parsing");
Util.Drawing = {
        InitDraw2d: function(Element)
        {
            //console.log(this);
            Element.C2D = Element.getContext("2d");
            Element.LineBegin = true;
            //All Canvas Function Utilities
            Element.color = function(color){Util.Drawing.Internal.C2D.Color(Element,color);};
            Element.clear = function(){ Util.Drawing.Internal.C2D.Clear(Element);};
            Element.font = function(font){Util.Drawing.Internal.C2D.setFont(Element,font);};
            //All Canvas Drawing Utilities
            Element.circle = function(x,y,x1,y1,r,fill,color){var c = Element.C2D.fillStyle; Util.Drawing.Internal.C2D.AbstractColor(Element,color); Util.Drawing.Internal.C2D.Circle(Element,x,y,x1,y1,r,fill); Util.Drawing.Internal.C2D.Color(Element,c);};
            Element.rect = function(x,y,x1,y1,fill,color){var c = Element.C2D.fillStyle; Util.Drawing.Internal.C2D.AbstractColor(Element,color); Util.Drawing.Internal.C2D.Rectangle(Element,x,y,x1,y1,fill); Util.Drawing.Internal.C2D.Color(Element,c);};
            Element.triangle = function(x,y,x1,y1,x2,y2,fill,color){var c = Element.C2D.fillStyle; Util.Drawing.Internal.C2D.AbstractColor(Element,color); Util.Drawing.Internal.C2D.Triangle(Element,x,y,x1,y1,x2,y2,fill); Util.Drawing.Internal.C2D.Color(Element,c);};
            Element.line = function(x,y){Util.Drawing.Internal.C2D.Line(Element,x,y)};
            Element.drawlines = function(fill,color){var c = Element.C2D.fillStyle; Util.Drawing.Internal.C2D.AbstractColor(Element,color); Util.Drawing.Internal.C2D.DrawLines(Element,fill); Util.Drawing.Internal.C2D.Color(Element,c);};
            Element.text = function(x,y,text,fill,color){var c = Element.C2D.fillStyle; Util.Drawing.Internal.C2D.AbstractColor(Element,color); Util.Drawing.Internal.C2D.Text(Element,x,y,text,fill); Util.Drawing.Internal.C2D.Color(Element,c);};
        },
        InitDraw3d: function(Element)
        {
            //Element.C3D = Element.getContext("webgl");
            console.error("Draw3D Not Implemented!");
            console.info("Use Draw2D to draw 3D Objects.");
        },
        Internal: {
            C2D: {
                Triangle: function(Element,x,y,x1,y1,x2,y2,fill)
                {
                    Element.C2D.beginPath();
                    Element.C2D.moveTo(x,y);
                    Element.C2D.lineTo(x1,y1);
                    Element.C2D.lineTo(x2,y2);
                    Element.C2D.closePath();
                    console.log(fill)
                    if(fill){
                      Element.C2D.fill();
                    }else{
                        Element.C2D.stroke();
                    }
                },
                Circle: function(Element,x,y,x1,y1,r,fill)
                {
                    Element.C2D.beginPath();
                    Element.C2D.arc(x,y,x1,y1,r);
                    if(fill){
                        Element.C2D.fill();
                    }else{
                        Element.C2D.stroke();
                    }
                    Element.C2D.closePath();
                },
                Rectangle: function(Element,x,y,x1,y1,fill)
                {
                    Element.C2D.beginPath();
                    if(fill){
                        Element.C2D.fillRect(x,y,x1,y1);
                    }else{
                        Element.C2D.rect(x,y,x1,y1);
                        Element.C2D.stroke();
                    }
                    Element.C2D.closePath();
                },
                Clear: function(Element)
                {
                    Element.C2D.beginPath();
                    var w = Element.C2D.width || Element.width;
                    var h = Element.C2D.height || Element.height;
                    var TmpFill = Element.C2D.fillStyle;
                    Element.C2D.fillStyle = "#FFFFFF";
                    //console.log(w,h);
                    Element.C2D.fillRect(0,0,w,h);
                    Element.C2D.fillStyle = TmpFill;
                    Element.C2D.closePath();
                },
                Color: function(Element,color)
                {
                    if (color === undefined || color === null) {
                        Element.C2D.strokeStyle = "#000000";
                        Element.C2D.fillStyle = "#000000";
                    } else {
                        Element.C2D.strokeStyle = color;
                        Element.C2D.fillStyle = color;
                    }
                },
                AbstractColor: function(Element,color)
                {
                    if (color === undefined || color === null) {
                        //console.log(color);
                    } else {
                        Element.C2D.strokeStyle = color;
                        Element.C2D.fillStyle = color;
                    }
                },
                Line: function(Element,x,y)
                {
                    //console.log(Element.LineBegin,Element.C2D)
                    //console.log(x,y);
                    if(Element.LineBegin){
                        //console.log("Begin!");
                        //Element.C2D.beginPath();
                        Element.C2D.moveTo(x,y);
                        Element.LineBegin = false;
                    }else{
                        //console.log("norm");
                        Element.C2D.lineTo(x,y)
                    }
                },
                DrawLines: function(Element,fill)
                {
                    //Element.C2D.closePath();
                    if(fill)
                    {
                        Element.C2D.fill();
                    }else{
                        //console.log(Element.C2D)
                        Element.C2D.stroke();
                        //console.log("draw");
                    }
                    Element.LineBegin = true;
                    //Element.C2D.closePath();
                },
                Text: function(Element,x,y,Text,fill) {
                    if(fill){
                        Element.C2D.fillText(Text,x,y);
                    }else{
                        Element.C2D.strokeText(Text,x,y);
                    }
                },
                setFont: function(Element,font){
                    Element.C2D.font = font;
                }

            },
        },
    }
    console.info("Done Including: Draw3D,Draw2D");
    Util.CI = Util.CI+1;
