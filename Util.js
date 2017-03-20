//Author: Maxim Khanov
//Version:5.0
var Util = {
        Tasks: {
            AsyncTaskPool: new Array(),
            AsyncReapeatTask: function(Func){
                var self = this;
                Func=(function(){var cacheFunc = Func; return function(){cacheFunc.apply(this,arguments);self.step();};}());
                Util.Tasks.AsyncTaskPool.push(self);
                var DoTick = true;
                this.step = function(){
                    if(DoTick){
                        setTimeout(function(){Func();})
                        return;
                    }
                };
                this.stop = function(){
                    DoTick = false;
                };
                self.step();
            },
            KillAllAysncTasks: function(){
            Util.Tasks.AsyncTaskPool.forEach(function(AsyncTask) {
                AsyncTask.stop();
            }, this);
            AsyncTaskPool=new Array();
            },
            TestVal(Func,Callback){
                if (Func()==true){
                    Callback();
                }else{
                    setTimeout( function(){Util.Tasks.TestVal(Func,Callback);}, 500);
                }
            }
        },
        Filing: {
            InterInclude: function(file,callback) {
                var script_tag = document.createElement('script');
                script_tag.src = file;
                script_tag.type = 'text/javascript';
                script_tag.defer = true;
                script_tag.onload = function(){callback();};
                document.head.appendChild(script_tag);
            },
            Include: function(file) {
                var script_tag = document.createElement('script');
                script_tag.src = file;
                script_tag.type = 'text/javascript';
                script_tag.defer = true;
                document.head.appendChild(script_tag);
            },
            SaveAs: function(filetype,filedata,linkname,filename){
                var URL = window.URL || window.webkitURL;

                var blob = new Blob([filedata], {type: filedata});

                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                //link.textContent = linkname;
                link.id = linkname;
                link.download = filename;
                link.style="display:none";
                document.body.appendChild(link);
                link.click();
            },

            Load: function(Element, ExeFunction) {
                Element.Func = ExeFunction;
                Element.addEventListener('change', this.InternalLoad, false);
            },
            InternalLoad: function(Evnt)
            {
                var files = Evnt.target.files;
                var file = files[0];
                var reader = new FileReader();
                reader.onload = function() {
                    var Filedata = this.result;
                    Evnt.target.Func(Filedata);
                }
                reader.readAsText(file);
            }
        },

        Networking: {
            ListenFuncs: new Array(),
            AddIntercept: function(Callback){
                ListenFuncs.push(Callback);
            },
            CORSRequest: function(method, url){
                var xhr = new XMLHttpRequest();
                if ("withCredentials" in xhr){
                // XHR has 'withCredentials' property only if it supports CORS
                    xhr.open(method, url, true);
                } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
                    xhr = new XDomainRequest();
                    xhr.open(method, url);
                } else {
                    xhr = null;
                }
                return xhr;
            }
        },
        Using: function(_Lib){
            var Lib = _Lib.toLowerCase();
            if(Lib=="drawing"){
                Util.Filing.Include("https://cdn.rawgit.com/maximkha/Util_Lib/9ec079d0/Includes/Drawing/Utils.Drawing.js");
            }else if(Lib=="maths"){console.warn("This is an Experimental version of Maths Package");
                Util.Filing.Include("https://cdn.rawgit.com/maximkha/Util_Lib/9ec079d0/Includes/Maths/Utils.Maths.js");
            }else{
                console.error("No library exists with the name:" + Lib);
            }
        },
        Start: function(UseIncNum,Callback){
            Util.CC = UseIncNum;
            Util.CI=0;
            Util.Tasks.TestVal(function(){return Boolean(Util.CC==Util.CI);},Callback);
        },
};


    (function(send) {

    XMLHttpRequest.prototype.send = function(data) {

        // in this case I'm injecting an access token (eg. accessToken) in the request headers before it gets sent
        //this.setRequestHeader('x-access-token', accessToken);
        //console.log(typeof this);
        var self = this;
        var Mself = self;

        Util.Networking.ListenFuncs.forEach(function(Func) {
            var tmp = Func(Mself);
            if(typeof tmp == "object") Mself = tmp;
        }, this);

        send.call(this, data);
    };

    })(XMLHttpRequest.prototype.send);
