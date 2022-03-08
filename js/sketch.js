// The main code is in this file sketch.js. 
//
// Given the necessary TONE.js and p5.js libraries, just launch the root folder with VSCODE, setup a server, and view with Firefox/CHROME.
//
//
//



let introStartup_IS_available = 1;
let secondEngagedPress = 1;

let needToStart_TONE_element = 1;

let introSynth;

let triaSynth;
let sineSynth;
let seq;
let seq2;

let cheby;

let vib_effect;

let reverb;

let intro_melody = ["Bb4", ["Ab3","Eb3", "D3", "Fb2"], ["Ab2", "Eb3"], "Bb3", "Ab3", "Fb2", "Gb3", ["Gb2", "Fb2", "Gb3", "D2"]];

let myMelody =["Eb3", "Fb2", "Fb3", "Eb3", ["Ab3","Ab3"], "Bb3","Fb2", "D3", "D3", ["Gb2", "Eb3"], "Gb3", "Bb2", ["Bb3", "Fb3"], ["Gb3", "Fb2"], "D2", ["Eb3", "Bb3", "D3", "Bb3"], "D3", "Bb3", "Ab2", ["Bb3", "Eb3"], "Fb3", "Bb3", "Ab2", "D2", ["Ab3","Ab3"]];

let myMelody_sub2 =[["D3", "Gb2"], "D2", ["Eb2", "Bb3", "D2", "Eb3"], "Gb2", "D3", ["Bb3", "Ab3"], "Fb3", ["Gb3", "Fb2"], "D3", "Eb2", "D2", ["D2","Bb3"]];

let timer_being_set__bool = 0.000;

// to use with the p5 function millis() ..
let second_time = 0;



// initially retrieved temp variable ::
// for use as :: slider acquiring
//  value variable...
let val;

function preload(){

  image0 = loadImage("media/i0.jpg");
  image1 = loadImage("media/i1.jpg");
  image2 = loadImage("media/i2.jpg");
  image3 = loadImage("media/i3.jpg");
  //image4 = loadImage("media/i4.gif");
  
  

}


function mousePressed() {

  if( ! timer_being_set__bool) 
  {

      timer_being_set__bool = 1;

        // take current time at moment when a key is pressed.
        second_time = millis()/1000;

        // load this for the climactic appearance of a dark spider going to the surface
        image4 = loadImage("media/i4.gif");

  }

  // this is for fresh running forth with the main event.
  if (secondEngagedPress) {

    if(needToStart_TONE_element)
    {

      //Tone.start(); //You need to interact with your canvas and tell Tone to start before audio begins playing.
       Tone.start();

    }
    else 
    {
      seq_intro.stop();
    }


    seq.start(+ 0.33);

    seq2.start(+ 8);

    secondEngagedPress = 0;
  }

    // toggle press of the mouse orders that
    // all variables will be reset to the
    // starting defaults
  else {
    


    timer_being_set__bool = 0;

    needToStart_TONE_element = 1;

    secondEngagedPress = 1;

    introStartup_IS_available = 1;

    //Tone Sequence Stop();
    seq.stop();

    seq2.stop();

    Tone.Transport.stop();

    introSynth = new Tone.Synth({
      oscillator: {
        type: "sine"
      },
      resonance: .18,
      envelope: {
        attack: 0.23,
        decay: 0.09,
        sustain: 0.54,
        release: 0.17
      }
    });

    triaSynth = new Tone.Synth({
      oscillator: {
        type: "triangle"
      },
      resonance: .18,
      envelope: {
        attack: 0.035,
        decay: 0.19,
        sustain: .9,
        release: .7
      }
    }).toDestination();

    sineSynth = new Tone.Synth({
      oscillator: {
        type: "sine"
      },
      resonance: .42,
      envelope: {
        attack: 0.09,
        decay: 0.161,
        sustain: 0.88,
        release: 0.77
      }
    }).toDestination();

    seq_intro = new Tone.Sequence(function (time, note) {
      introSynth.triggerAttackRelease(note, 1.03);

      console.log(note);
    }, intro_melody, '4n');

    seq = new Tone.Sequence(function (time, note) {
      sineSynth.triggerAttackRelease(note, 1.85);

      console.log(note);
    }, myMelody, '4n');

    seq2 = new Tone.Sequence(function (time, note) {
      triaSynth.triggerAttackRelease(note, 2.4);

    }, myMelody_sub2, '4n');


    // create a new cheby
    // ,,
    cheby = new Tone.Chebyshev(6).toDestination();

    // ,,
    vib_effect = new Tone.Vibrato(500).connect(cheby);

    // ,,
    vib_effect.depth.value = 0.44;

    // create a monosynth connected to our cheby
    introSynth.connect(vib_effect);


    Tone.Transport.start();


  }

  introStartup_IS_available = 0;


}


function setup() {
  createCanvas(800, 602);


  introSynth = new Tone.Synth({
    oscillator: {
      type: "sine"
    },
    resonance: .18,
    envelope: {
      attack: 0.23,
      decay: 0.09,
      sustain: 0.54,
      release: 0.17
    }
  });

  triaSynth = new Tone.Synth({
    oscillator: {
      type: "triangle"
    },
    resonance: .18,
    envelope: {
      attack: 0.035,
      decay: 0.19,
      sustain: .9,
      release: .7
    }
  }).toDestination();

  sineSynth = new Tone.Synth({
    oscillator: {
      type: "sine"
    },
    resonance: .42,
    envelope: {
      attack: 0.09,
      decay: 0.161,
      sustain: 0.88,
      release: 0.77
    }
  }).toDestination();

  seq_intro = new Tone.Sequence(function (time, note) {
    introSynth.triggerAttackRelease(note, 1.03);

    console.log(note);
  }, intro_melody, '4n');

  seq = new Tone.Sequence(function (time, note) {
    sineSynth.triggerAttackRelease(note, 1.85);

    console.log(note);
  }, myMelody, '4n');

  seq2 = new Tone.Sequence(function (time, note) {
    triaSynth.triggerAttackRelease(note, 2.4);

  }, myMelody_sub2, '4n');


  // create a new cheby
  // ,,
  cheby = new Tone.Chebyshev(6).toDestination();

  // ,,
  vib_effect = new Tone.Vibrato(500).connect(cheby);

  // ,,
  vib_effect.depth.value = 0.44;

  // create a monosynth connected to our cheby
  introSynth.connect(vib_effect);


  Tone.Transport.start();


  // slider1 = createSlider(0, 100, 50, 02);

  // slider1.position(40, 690);

  // slider1.mouseReleased(()=>{
    
  //   val = slider1.value();

  //   if(val >= 86){
  //     slider_int_value = 0.93;
  //   } else if(val >= 72){
  //     slider_int_value = 0.78;
  //   } else if(val >= 58){
  //     slider_int_value = 0.68;
  //   } else if(val >= 44){
  //     slider_int_value = 0.58;
  //   } else if(val >= 30){
  //     slider_int_value = 0.48;
  //   } else if(val >= 16){
  //     slider_int_value = 0.44;
  //   } else if(val >= 2){
  //     slider_int_value = 0.35;
  //   } 

  //    __ Effect.frequency.value = start_freq_phaser * slider_int_value;
    
  // });


}


function draw() {
  background(160, 160, 160);

  // animation being finished..
  if (timer_being_set__bool && ( millis()/1000 - second_time ) > 14.4)
  {
    // reset all variables to the default 
    // settings for the program to start 
    // off in the beginning.


    timer_being_set__bool = 0;

    needToStart_TONE_element = 1;

    secondEngagedPress = 1;

    introStartup_IS_available = 1;

    //Tone Sequence Stop();
    seq.stop();

    seq2.stop();

    Tone.Transport.stop();

    introSynth = new Tone.Synth({
      oscillator: {
        type: "sine"
      },
      resonance: .18,
      envelope: {
        attack: 0.23,
        decay: 0.09,
        sustain: 0.54,
        release: 0.17
      }
    });
  
    triaSynth = new Tone.Synth({
      oscillator: {
        type: "triangle"
      },
      resonance: .18,
      envelope: {
        attack: 0.035,
        decay: 0.19,
        sustain: .9,
        release: .7
      }
    }).toDestination();
  
    sineSynth = new Tone.Synth({
      oscillator: {
        type: "sine"
      },
      resonance: .42,
      envelope: {
        attack: 0.09,
        decay: 0.161,
        sustain: 0.88,
        release: 0.77
      }
    }).toDestination();

    seq_intro = new Tone.Sequence(function (time, note) {
      introSynth.triggerAttackRelease(note, 1.03);
  
      console.log(note);
    }, intro_melody, '4n');
  
    seq = new Tone.Sequence(function (time, note) {
      sineSynth.triggerAttackRelease(note, 1.85);
  
      console.log(note);
    }, myMelody, '4n');
  
    seq2 = new Tone.Sequence(function (time, note) {
      triaSynth.triggerAttackRelease(note, 2.4);
  
    }, myMelody_sub2, '4n');
  
  
    // create a new cheby
    // ,,
    cheby = new Tone.Chebyshev(6).toDestination();
  
    // ,,
    vib_effect = new Tone.Vibrato(500).connect(cheby);
  
    // ,,
    vib_effect.depth.value = 0.44;
  
    // create a monosynth connected to our cheby
    introSynth.connect(vib_effect);
  
  
    Tone.Transport.start();


  }
  else if( timer_being_set__bool && ( millis()/1000 - second_time ) > 11)
  {
    image(image4, 30, 30);
  }
  else if( timer_being_set__bool && ( millis()/1000 - second_time ) > 8)
  {
    image(image3, 30, 30);
  }
  else if( timer_being_set__bool && ( millis()/1000 - second_time ) > 5.15)
  {
    image(image2, 30, 30);
  }
  else if( timer_being_set__bool && ( millis()/1000 - second_time ) > 2.13)
  {
    image(image1, 30, 30);

  }
  else 
  {
  
    image(image0, 30, 30);

  }


  if( ! timer_being_set__bool)
  {
    // Text label  for  "program's start".
    fill(23);
    textSize(27);
    text("Click a Mouse BUTTON to Start the Event", 83, 370);
  } else 
  {
    // Text label  for  "program's start".
    fill(23);
    textSize(27);
    text("Click a Mouse BUTTON to Stop the Event", 83, 348);
  }

  if( ! timer_being_set__bool)
  {
    // Text label  for  INTRO MUSIC GETTING PLAYED in the PROGRAM's startup SCREEN."
    fill(23);
    textSize(27);
    text("To Play Intro Music, press a key on the keyboaard", 73, 512);
  }

}

function keyPressed()
{
  if(introStartup_IS_available)
  {
    Tone.start();

    seq_intro.start();
  
    needToStart_TONE_element = 0;




    introStartup_IS_available = 0;
  }
}
