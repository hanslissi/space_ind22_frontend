import { P5CanvasInstance, Sketch, SketchProps } from '@p5-wrapper/react';
import vert from './baseVertexShader.vert';
import frag from './noiseShader.frag';

type GradientColors = {
  color1: number[];
  color2: number[];
  color3: number[];
  color4: number[];
};

type NoiseInteractionSketchProps = SketchProps & {
  currentColorIdx: number;
};

const noiseInteractionSketch = (p5: P5CanvasInstance<NoiseInteractionSketchProps>) => {
  let myShader: any;
  let lerpedMousepos: any;
  let currentColorIdx: number;
  let lerpedGradientColors: GradientColors;

  let colors: GradientColors[] = [
    {
      // Communication Design
      color1: [231, 45, 60],
      color2: [229, 163, 50],
      color3: [229, 112, 168],
      color4: [146, 107, 161],
    },
    {
      // Interaction Design
      color1: [210, 220, 120],
      color2: [223, 228, 138],
      color3: [239, 235, 130],
      color4: [34, 102, 110],
    },
    {
      // Media Design
      color1: [50, 63, 146],
      color2: [69, 64, 146],
      color3: [148, 156, 206],
      color4: [61, 103, 175],
    },
  ];

  p5.updateWithProps = (props: NoiseInteractionSketchProps) => {
    currentColorIdx = props.currentColorIdx;
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    myShader = p5.createShader(vert, frag);

    lerpedMousepos = p5.createVector(0, 0);

    lerpedGradientColors = {
      ...colors[0],
    };
  };

  p5.draw = () => {
    const effectiveColorIdx =
      currentColorIdx >= 0 && currentColorIdx < colors.length
        ? currentColorIdx
        : p5.floor(p5.millis() / 2000) % colors.length;

    lerpedMousepos = lerpedMousepos.lerp(p5.createVector(p5.mouseX, p5.mouseY), 0.05);
    lerpGradientColors(lerpedGradientColors, colors[effectiveColorIdx]);

    p5.shader(myShader);

    // Set the resolution uniform (width, height of the canvas)
    myShader.setUniform('u_resolution', [p5.width, p5.height]);

    // Pass the mouse position to the scale uniform
    myShader.setUniform('u_scale', [
      p5.map(lerpedMousepos.y, 0, p5.height, 2, 3),
      p5.map(lerpedMousepos.x, 0, p5.width, 1, 1.5),
    ]);

    // Pass the time from p5
    myShader.setUniform('u_time', p5.millis());

    // Pass the mouse position as the spread intensity
    myShader.setUniform(
      'u_spread',
      p5.map(lerpedMousepos.y, 0, p5.height, 0.5, 1.5)
    );

    // Pass the mouse position as the evolution
    myShader.setUniform('u_evolution', p5.map(lerpedMousepos.y, 0, p5.height, 0.3, 0.9));

    // Pass the mouse position as the intensity
    myShader.setUniform(
      'u_intensity',
      p5.map(p5.abs(lerpedMousepos.x - p5.width / 2), 0, p5.width / 2, 4, 1)
    );

    //Pass the colors
    myShader.setUniform(
      'u_color1',
      lerpedGradientColors.color1.map((value) => p5.map(value, 0, 255, 0, 1))
    );
    myShader.setUniform(
      'u_color2',
      lerpedGradientColors.color2.map((value) => p5.map(value, 0, 255, 0, 1))
    );
    myShader.setUniform(
      'u_color3',
      lerpedGradientColors.color3.map((value) => p5.map(value, 0, 255, 0, 1))
    );
    myShader.setUniform(
      'u_color4',
      lerpedGradientColors.color4.map((value) => p5.map(value, 0, 255, 0, 1))
    );

    // Draw a shape using the shader
    p5.rect(0, 0, p5.width, p5.height);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  const lerpGradientColors = (
    currentColors: GradientColors,
    targetColors: GradientColors
  ) => {
    // Interpolates all colors dynamically
    Object.keys(currentColors).forEach((key) => {
      (currentColors as any)[key] = (currentColors as any)[key].map(
        (value: number, index: number) =>
          p5.lerp(value, (targetColors as any)[key][index], 0.03)
      );
    });
  };
};

export default noiseInteractionSketch;
