/**
* author: Martin Guggisberg (2015)
*/

(function() {
    // Create audio (context) container
    // Fix up prefixing
    var ps={};

  	window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ps.audioCtx = new AudioContext();

    ps.notesById = {
    	'time': {value: 500},
        'ping': { frequency: 261.6, buttonId: 'ping' },
        'pong': { frequency: 293.7, buttonId: 'pong' },
        'pingpong': { frequency: 329.6, buttonId: 'pingpong' },
        'tac': { frequency: 220, buttonId: 'tac' }
    };

    ps.play = function(name){
        var tmp=0.0;
        var fadeTime=0.01;
        if (typeof(ps.notesById[name].osc) === 'undefined'){
            ps.notesById[name].osc = ps.audioCtx.createOscillator(); 
            ps.notesById[name].vca = ps.audioCtx.createGain();
            ps.notesById[name].vca.gain.value=0; 
            ps.notesById[name].osc.type = 'triangle';
            ps.notesById[name].osc.start(0);
            ps.notesById[name].osc.connect(ps.notesById[name].vca);
            ps.notesById[name].vca.connect(ps.audioCtx.destination);
        } 
        ps.notesById[name].osc.frequency.value = ps.notesById[name].frequency;
        tmp = 0.0+ps.notesById["time"].value;
        tmp /= 1000.0;
        
        // Fade it in.
        ps.notesById[name].vca.gain.linearRampToValueAtTime(0, ps.audioCtx.currentTime); 
        ps.notesById[name].vca.gain.linearRampToValueAtTime(1, ps.audioCtx.currentTime + fadeTime);

        // Then fade it out.
        ps.notesById[name].vca.gain.linearRampToValueAtTime(1, ps.audioCtx.currentTime+tmp-fadeTime); 
        ps.notesById[name].vca.gain.linearRampToValueAtTime(0, ps.audioCtx.currentTime+tmp);
        
        
        
        //ps.notesById[name].vca.gain.setValueAtTime(1, ps.audioCtx.currentTime+0.005);
        //ps.notesById[name].vca.gain.setValueAtTime(0, ps.audioCtx.currentTime+tmp);
        //ps.notesById[name].vca.gain.value=1; 
        //setTimeout(function () {ps.notesById[name].vca.gain.value=0; }, ps.notesById["time"].value);
    };
    	
	function registerUI() {

        var setnewtime = function(event) {
            // var elId = event.target.id;

              if(typeof ps.notesById["time"] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                
                var tmp=event.target.value;
                document.getElementById("labeltime").value=""+tmp+" ms";
                ps.notesById["time"].value=tmp;
               
            }
        };

        var setpingfreq = function(event) {
            // var elId = event.target.id;

              if(typeof ps.notesById["ping"] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                
                var tmp=event.target.value;
                document.getElementById("labelpingfreq").value=""+tmp;
                ps.notesById["ping"].frequency=tmp;
               
            }
        };

        var setinputpingfreq = function(event) {
            // var elId = event.target.id;

              if(typeof ps.notesById["ping"] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                
                var tmp=event.target.value;

                if (tmp < 900 && tmp > 120){
                    document.getElementById("sliderping").value=""+tmp;
                    ps.notesById["ping"].frequency=tmp;
                }
            }
        };




        var setpongfreq = function(event) {
            // var elId = event.target.id;

              if(typeof ps.notesById["pong"] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                
                var tmp=event.target.value;
                document.getElementById("labelpongfreq").value=""+tmp;
                ps.notesById["pong"].frequency=tmp;
               
            }
        };

        var setinputpongfreq = function(event) {
            // var elId = event.target.id;

              if(typeof ps.notesById["pong"] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                
                var tmp=event.target.value;


                if (tmp < 900 && tmp > 120){
                    document.getElementById("sliderpong").value=""+tmp;
                    ps.notesById["pong"].frequency=tmp;
                }
            }
        };

        var setpingpongfreq = function(event) {
            // var elId = event.target.id;

              if(typeof ps.notesById["pingpong"] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                
                var tmp=event.target.value;
                document.getElementById("labelpingpongfreq").value=""+tmp;
                ps.notesById["pingpong"].frequency=tmp;
               
            }
        };

        var setinputpingpongfreq = function(event) {
            // var elId = event.target.id;

              if(typeof ps.notesById["pingpong"] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                
                var tmp=event.target.value;

                if (tmp < 900 && tmp > 120){
                    document.getElementById("sliderpingpong").value=""+tmp;
                    ps.notesById["pingpong"].frequency=tmp;
                }
            }
        };

        var setstepfreq = function(event) {
            // var elId = event.target.id;

              if(typeof ps.notesById["tac"] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                
                var tmp=event.target.value;
                document.getElementById("labelstepfreq").value=""+tmp;
                ps.notesById["tac"].frequency=tmp;
               
            }
        };

        var setinputstepfreq = function(event) {
            // var elId = event.target.id;

              if(typeof ps.notesById["tac"] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                
                var tmp=event.target.value;

                if (tmp < 900 && tmp > 120){
                    document.getElementById("sliderstep").value=""+tmp;
                    ps.notesById["tac"].frequency=tmp;
                }
            }
        };

        var setnumber = function(event) {
                var tmp=event.target.value;
                document.getElementById("labelnumber").value=""+tmp;
                Processing.getInstanceById('PingPongJS2014v1').setnumber(parseInt(tmp));           
        };

        var setpingnumber = function(event) {
                var tmp=event.target.value;
                document.getElementById("labelpingnumber").value=""+tmp;
                Processing.getInstanceById('PingPongJS2014v1').setpingnumber(parseInt(tmp));           
        };

        var setpongnumber = function(event) {
                var tmp=event.target.value;
                document.getElementById("labelpongnumber").value=""+tmp;
                Processing.getInstanceById('PingPongJS2014v1').setpongnumber(parseInt(tmp));           
        };

        var setgamespeed = function(event) {
                var tmp=event.target.value;
                document.getElementById("labelgamespeed").value=""+tmp;
                Processing.getInstanceById('PingPongJS2014v1').setspeed(parseInt(tmp));           
        };

		//register time slider
		var et1=document.getElementById("slidertime");
		et1.onchange=setnewtime;

		//register ping frequency
		var efp1=document.getElementById("sliderping");
		efp1.onchange=setpingfreq;

		//register pong frequency
		var efp2=document.getElementById("sliderpong");
		efp2.onchange=setpongfreq;

		//register pingpong frequency
		var efp3=document.getElementById("sliderpingpong");
		efp3.onchange=setpingpongfreq;

        //register step frequency
        var efp4=document.getElementById("sliderstep");
        efp4.onchange=setstepfreq;

        //register number control
        var efp5=document.getElementById("slidernumber");
        efp5.onchange=setnumber;

        //register ping number
        var efp6=document.getElementById("sliderpingnumber");
        efp6.onchange=setpingnumber;

        //register ping number
        var efp6=document.getElementById("sliderpongnumber");
        efp6.onchange=setpongnumber;

        //register game speed
        var efp6=document.getElementById("slidergamespeed");
        efp6.onchange=setgamespeed;

        //register input ping freq
        var efp7=document.getElementById("labelpingfreq");
        efp7.onchange=setinputpingfreq;

        //register input pong freq
        var efp8=document.getElementById("labelpongfreq");
        efp8.onchange=setinputpongfreq;

        //register input pingpong freq
        var efp9=document.getElementById("labelpingpongfreq");
        efp9.onchange=setinputpingpongfreq;

        //register input step freq
        var efp10=document.getElementById("labelstepfreq");
        efp10.onchange=setinputstepfreq;

    }
	// init 
	window.addEventListener('load', function() {
		registerUI();
        window.pingpongsound = ps;
    });
//end
})();
