/**
 * @name Frequency Spectrum
 * @description <p>Visualize the frequency spectrum of live audio input.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
var mic, fft;

function setup() {
   createCanvas(1024,400);
   noFill();
   strokeWeight(4);
   stroke(22,22,22,75);

   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT(0.4,1024);
   fft.setInput(mic);
   frameRate(5)
}

function draw() {


   background(157,188,31);

   var wav = fft.waveform();

   //waveform = analyzer.waveform();

   beginShape();
   for (i = 0; i<wav.length; i++) {
    vertex(i, map(wav[i], -1.0, 1.0, height, 0) );
   }
   endShape();
}
