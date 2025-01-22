//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2024-11-07
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//
// I, Johannes Riedmüller, allowed myself to use the shader
// program and modify it, to fit my specific needs. I read
// the LICENSE file and therefore know that I can use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software without limitations. A copy of the
// LICENSE file is at: TODO

precision highp float;

uniform vec2 u_resolution;// Resolution of the canvas (width, height)
uniform float u_time;// Time for animation or movement
uniform float u_spread; // Spread of the noise ()

vec4 mod289(vec4 x)
{
  return x-floor(x*(1./289.))*289.;
}

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.)+10.)*x);
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159-.85373472095314*r;
}

vec2 fade(vec2 t){
  return t*t*t*(t*(t*6.-15.)+10.);
}

// Classic Perlin noise
float cnoise(vec2 P)
{
  vec4 Pi=floor(P.xyxy)+vec4(0.,0.,1.,1.);
  vec4 Pf=fract(P.xyxy)-vec4(0.,0.,1.,1.);
  Pi=mod289(Pi);// To avoid truncation effects in permutation
  vec4 ix=Pi.xzxz;
  vec4 iy=Pi.yyww;
  vec4 fx=Pf.xzxz;
  vec4 fy=Pf.yyww;
  
  vec4 i=permute(permute(ix)+iy);
  
  vec4 gx=fract(i*(1./41.))*2.-1.;
  vec4 gy=abs(gx)-.5;
  vec4 tx=floor(gx+.5);
  gx=gx-tx;
  
  vec2 g00=vec2(gx.x,gy.x);
  vec2 g10=vec2(gx.y,gy.y);
  vec2 g01=vec2(gx.z,gy.z);
  vec2 g11=vec2(gx.w,gy.w);
  
  vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));
  
  float n00=norm.x*dot(g00,vec2(fx.x,fy.x));
  float n10=norm.y*dot(g10,vec2(fx.y,fy.y));
  float n01=norm.z*dot(g01,vec2(fx.z,fy.z));
  float n11=norm.w*dot(g11,vec2(fx.w,fy.w));
  
  vec2 fade_xy=fade(Pf.xy);
  vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
  float n_xy=mix(n_x.x,n_x.y,fade_xy.y);
  return 2.3*n_xy;
}

// Classic Perlin noise, periodic variant
float pnoise(vec2 P,vec2 rep)
{
  vec4 Pi=floor(P.xyxy)+vec4(0.,0.,1.,1.);
  vec4 Pf=fract(P.xyxy)-vec4(0.,0.,1.,1.);
  Pi=mod(Pi,rep.xyxy);// To create noise with explicit period
  Pi=mod289(Pi);// To avoid truncation effects in permutation
  vec4 ix=Pi.xzxz;
  vec4 iy=Pi.yyww;
  vec4 fx=Pf.xzxz;
  vec4 fy=Pf.yyww;
  
  vec4 i=permute(permute(ix)+iy);
  
  vec4 gx=fract(i*(1./41.))*2.-1.;
  vec4 gy=abs(gx)-.5;
  vec4 tx=floor(gx+.5);
  gx=gx-tx;
  
  vec2 g00=vec2(gx.x,gy.x);
  vec2 g10=vec2(gx.y,gy.y);
  vec2 g01=vec2(gx.z,gy.z);
  vec2 g11=vec2(gx.w,gy.w);
  
  vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));
  
  float n00=norm.x*dot(g00,vec2(fx.x,fy.x));
  float n10=norm.y*dot(g10,vec2(fx.y,fy.y));
  float n01=norm.z*dot(g01,vec2(fx.z,fy.z));
  float n11=norm.w*dot(g11,vec2(fx.w,fy.w));
  
  vec2 fade_xy=fade(Pf.xy);
  vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
  float n_xy=mix(n_x.x,n_x.y,fade_xy.y);
  return 2.3*n_xy;
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  // First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  // Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  // Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

#ifndef FNC_SRANDOM
#define FNC_SRANDOM

float srandom(in float x) {
  return -1. + 2. * fract(sin(x) * 43758.5453);
}

float srandom(in vec2 st) {
  return -1. + 2. * fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float srandom(in vec3 pos) {
  return -1. + 2. * fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

float srandom(in vec4 pos) {
    float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
    return -1. + 2. * fract(sin(dot_product) * 43758.5453);
}

vec2 srandom2(in vec2 st) {
    const vec2 k = vec2(.3183099, .3678794);
    st = st * k + k.yx;
    return -1. + 2. * fract(16. * k * fract(st.x * st.y * (st.x + st.y)));
}

vec3 srandom3(in vec3 p) {
    p = vec3( dot(p, vec3(127.1, 311.7, 74.7)),
            dot(p, vec3(269.5, 183.3, 246.1)),
            dot(p, vec3(113.5, 271.9, 124.6)));
    return -1. + 2. * fract(sin(p) * 43758.5453123);
}

vec2 srandom2(in vec2 p, const in float tileLength) {
    p = mod(p, vec2(tileLength));
    return srandom2(p);
}

vec3 srandom3(in vec3 p, const in float tileLength) {
    p = mod(p, vec3(tileLength));
    return srandom3(p);
}

#endif


void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.x; 
  vec2 P=uv*2.;// Scale the noise
  
  float perlinNoise=cnoise(P);
  float randomNoise = srandom(P);
  //float perlinNoise=pnoise(P+u_time);
  //float perlinNoise=snoise(P);
  float noiseOutput = mix(perlinNoise, u_spread, 0.5); 
  vec4 myColor=vec4(noiseOutput,noiseOutput,noiseOutput,1.);
  gl_FragColor=myColor;
}
