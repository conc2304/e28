/**
 *
 *    --  HERE ARE MY AMBITIONS - BEHOLD THEIR MULTITUDE!  --
 * todo - make a toggle to spin/rotate the inner and outer waves like the 3D ones
 * todo - make patterns by saving current config and make them triggerable (ie a pattern bank)
 * todo - put controls into an iFrame
 * todo - convert this entire thing into an angular web app #Angular8!
 * todo - loading animation
 *
 */


import CenterWave from '@/js/sketches/classCenterWave';

var registeredCtrlElements = registeredCtrlElements || [];


let audio;
let bgColor = 0;

const VisualizerSketch = (p5) => {
  'use strict';


  // keep all 'custom' code here

  p5.preload = () => {
    p5.objects = {};
    p5.objects.lambo = p5.loadModel('@/assets/3d_obj/lp670.obj', true);
    p5.objects.glock = p5.loadModel('@/assets/3d_obj/Glock 3d.obj', true);
    p5.objects.dolphin = p5.loadModel('@/assets/3d_obj/dolphin.obj', true);
    p5.objects.ducky = p5.loadModel('@/assets/3d_obj/ducky.obj', true);
    p5.objects.satellite = p5.loadModel('@/assets/3d_obj/satellite.obj', true);
    p5.objects.sword = p5.loadModel('@/assets/3d_obj/sword.obj', true);
    p5.objects.whale = p5.loadModel('@/assets/3d_obj/whale.obj', true);
    p5.objects.shuttle = p5.loadModel('@/assets/3d_obj/shuttle.obj', true);

    const centerWaveInstance = new CenterWave(window.innerWidth, window.innerHeight, p5);
    registeredCtrlElements.push(centerWaveInstance);

    p5.ctrlElementsArray = registeredCtrlElements;
  };


  p5.setup = () => {



    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.polygon = renderPolygon;
    p5.colorMode(p5.HSB);

    // make a method to retrieve the elements externally by the myp5 namespace
    for (let ctrlElement in p5.ctrlElementsArray) {
      if (!p5.ctrlElementsArray.hasOwnProperty(ctrlElement)) {
        continue;
      }
      let ctrlObjectName = p5.ctrlElementsArray[ctrlElement].constructor.name;
      p5[`get${ctrlObjectName}`] = () => p5.ctrlElementsArray[ctrlElement];
    }

    // add all of the elements to a global variable to 'register' them
    // createDOMControls(p5.ctrlElementsArray);

    // when everything is loaded open the control bar
    // $("#settings-open").click();

    // p5setupPoseNet(p5);
  };


  p5.windowResized = () => {

    // todo this is taxing on the browser find out how to optimize
    for (let ctrlElement in p5.ctrlElementsArray) {
      if (!p5.ctrlElementsArray.hasOwnProperty(ctrlElement)) {
        continue;
      }

      p5.ctrlElementsArray[ctrlElement].width = p5.windowWidth;
      p5.ctrlElementsArray[ctrlElement].waveWidth = p5.windowWidth + 200;
      p5.ctrlElementsArray[ctrlElement].height = p5.windowHeight;
    }
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };


  let fftAnalysis = {};
  let tempObj;
  p5.draw = () => {
    p5.background(bgColor);


    // if (audio && audio.isLoaded() && !audio.isPaused()) {
    //   let seconds = Math.floor(audio.currentTime() % 60);
    //   let minutes = Math.floor(audio.currentTime() / 60);

    //   let time = ('0' + minutes).substr(-2) + ':' + ('0' + seconds).substr(-2);
    //   songTime.html(time);
    //   let downloadProgress = 100 * (audio.currentTime() / audio.duration())
    //   progressBar.val(downloadProgress);
    // }

    // fftAnalysis = getEQEnergy(fft);
    // applyAudioEnergyValues(fftAnalysis);

    // playKeyboardKeys();
    // p5.keyReleased = () => {
    //   playPianoKey(p5.keyCode, false);
    // };

    for (let ctrlElement in p5.ctrlElementsArray) {
      if (!p5.ctrlElementsArray.hasOwnProperty(ctrlElement)) {
        continue;
      }
      tempObj =  p5.ctrlElementsArray[ctrlElement];
      // don't render an object if we have made it not visible it
      if (tempObj.bypass === true) {
        continue;
      }

      tempObj.easeInto();
      tempObj.render(p5);
    }
  };


};



// todo - this probably needs to be moved to a new file
const renderPolygon = function (x, y, radius, numPoints) {
  'use strict';
  const angle = p5.TWO_PI / numPoints;
  p5.beginShape();
  for (let a = 0; a < p5.TWO_PI; a += angle) {
    let sx = x + p5.cos(a) * radius;
    let sy = y + p5.sin(a) * radius;
    p5.vertex(sx, sy);
  }
  p5.endShape(p5.CLOSE);
};


export default VisualizerSketch;


