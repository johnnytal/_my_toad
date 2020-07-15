var audioDevices;	
var BUFF_SIZE = 16384;

averageValue = 0;
largestFreq = 0;
largestValue = 0;
lastAverageValue = 0;

async function getDevices() {
	const devices = await navigator.mediaDevices.enumerateDevices();
	audioDevices = devices.filter(device => device.kind === 'audioinput');

	navigator.getUserMedia( { audio: {deviceId: audioDevices[2].deviceId} },
        function(stream) {
    		start_stream(stream);
        },
        function(e) {
            alert(e);
        }
	);
}

function start_stream(stream){
	  var audioContext = new AudioContext();

      gain_node = audioContext.createGain();
      gain_node.connect( audioContext.destination );

      line_stream = audioContext.createMediaStreamSource(stream);
      line_stream.connect(gain_node); 

      script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);

      line_stream.connect(script_processor_node);

      gain_node.gain.value = 0;

      script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
      script_processor_fft_node.connect(gain_node);

      analyserNode = audioContext.createAnalyser();

      analyserNode.smoothingTimeConstant = 0;
      analyserNode.fftSize = 2048;

      line_stream.connect(analyserNode);

      analyserNode.connect(script_processor_fft_node);

      script_processor_fft_node.onaudioprocess = function() {
      	 var array = new Uint8Array(analyserNode.frequencyBinCount);
      	 analyserNode.getByteFrequencyData(array);

         for (var i = 0; i < array.length; i++) {
        	 averageValue += array[i];
         }
         
         averageValue = averageValue / array.length;
         largestValue = Math.max.apply(null, array);
         largestFreq = array.indexOf(largestValue);

		 //dominance = largestValue / averageValue;

		 middleLogo.scale.set(1 - averageValue / 100, 1 - averageValue / 100);
		 ascendLogos(largestFreq * (game.scale.width / 120), averageValue * ((game.scale.height - 200) / 20));
		   	 	 
  	 	 lastAverageValue = averageValue;
 	};
}

function isMobile(){
    return /Mobi|Android/i.test(navigator.userAgent);
}