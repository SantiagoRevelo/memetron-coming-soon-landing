const noise = () => {
  let noiseCanvas, noiseCtx;

  let wWidth, wHeight;

  let noiseData = [];
  let frame = 0;

  let loopTimeout;


  // Create Noise
  const createNoise = () => {
      const idata = noiseCtx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
          if (Math.random() < 0.05) {
              buffer32[i] = 0x080000ff; /* Set smallest dots of noise red */
        
          } else if(Math.random() < 0.1) {
        buffer32[i] = 0x0800ff00; /* Set small dots of noise green */
        
      } else if(Math.random() < 0.15) {
        buffer32[i] = 0x08ff0000; /* Set big dots of noise blue */
        
      } else if(Math.random() < 0.2) {
        buffer32[i] = 0xccdddddd; /* Set biggest dots of noise gray */
        
      }
      }

      noiseData.push(idata);
  };


  // Play Noise
  const paintNoise = () => {
      if (frame === 5) {
          frame = 0;
      } else {
          frame++;
      }

      noiseCtx.putImageData(noiseData[frame], 0, 0);
  };


  // Loop
  const loop = () => {
      paintNoise(frame);

      loopTimeout = window.setTimeout(() => {
          window.requestAnimationFrame(loop);
      }, (1000 / 25));
  };


  // Setup
  const setup = () => {
      wWidth = window.innerWidth;
      wHeight = window.innerHeight;

      noiseCanvas.width = wWidth;
      noiseCanvas.height = wHeight;

      for (let i = 0; i < 10; i++) {
          createNoise();
      }
   
      loop();
  };


  // Reset
  let resizeThrottle;
  const reset = () => {
      window.addEventListener('resize', () => {
          window.clearTimeout(resizeThrottle);

          resizeThrottle = window.setTimeout(() => {
              window.clearTimeout(loopTimeout);
              setup();
          }, 200);
      }, false);
  };


  // Init
  const init = (() => {
      noiseCanvas = document.querySelector('#noiseBg');
      noiseCtx = noiseCanvas.getContext('2d');
      noiseCanvas.addEventListener('resize', setup)
      setup();
  })();
};

noise();