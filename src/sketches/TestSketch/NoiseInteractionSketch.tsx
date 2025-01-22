import { Sketch } from "@p5-wrapper/react";
import vert from './baseVertexShader.vert';
import frag from './noiseShader.frag';

const noiseInteractionSketch: Sketch = (p5) => {
  let myShader: any;
  let lerpedMousepos: any;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    myShader = p5.createShader(vert, frag);
    
    lerpedMousepos = p5.createVector(0,0);
  };

  p5.draw = () => {
    lerpedMousepos = lerpedMousepos.lerp(p5.createVector(p5.mouseX, p5.mouseY), 0.05);
    console.log(lerpedMousepos)
    p5.background(255);
    p5.noStroke();

    // Use our custom shader
    p5.shader(myShader);
    
    // Set the resolution uniform (width, height of the canvas)
    myShader.setUniform('u_resolution', [p5.width, p5.height]);

    // Pass the time from p5 to the shader
    myShader.setUniform("u_time", p5.millis());
    
    // Pass the mouse position as the spread intensity
    myShader.setUniform("u_spread", p5.map(lerpedMousepos.x, 0, p5.width, -1, 1)) 
    
    // Draw a shape using the shader
    p5.rect(0, 0, p5.width, p5.height);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }
};

export default noiseInteractionSketch;
