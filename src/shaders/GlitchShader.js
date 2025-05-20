// https://stackblitz.com/edit/interactive-glitch-shader?file=GlitchShader.js

const GlitchShader = {
  vertex: `
    vec3 lerp (vec3 a, vec3 b, float t) {
        return (1. - t) * a + t * b;
    }
    float lerp (float a, float b, float t) {
        return (1. - t) * a + t * b;
    }
    float noise_hash_alt(vec3 p)
    {
        p = fract(p * 0.3183099 + .1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise_alt (vec3 x)
    {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f * f * (3. - 2. * f);

        return lerp(lerp(lerp(noise_hash_alt(p), noise_hash_alt(p + vec3(1.0, 0, 0)), f.x),
            lerp(noise_hash_alt(p + vec3(0, 1.0, 0)), noise_hash_alt(p + vec3(1.0, 1.0, 0)), f.x), f.y),
            lerp(lerp(noise_hash_alt(p + vec3(0, 0, 1.0)), noise_hash_alt(p + vec3(1.0, 0, 1.0)), f.x),
                lerp(noise_hash_alt(p + vec3(0, 1.0, 1.0)), noise_hash_alt(p + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
    }


      varying float glitchColorAmt;
      uniform float time;
      uniform vec3 mousePos;
      void main() {
        float glitchNoise = noise_alt(position.xyz + 10. * vec3(sin(time), cos(time), -sin(time))) - 0.5;
        vec3 newPos = position;
        float radialFalloff = 2.- min(length(mousePos - newPos)/.3, 2.);
        glitchColorAmt = step(fract(sin(0.1 * time) + 2. * cos(0.1 * time)), 0.03);
        glitchColorAmt = max(radialFalloff, glitchColorAmt);
        newPos.x += glitchColorAmt * glitchNoise;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
      }
    `,

  fragment: `
      varying float glitchColorAmt;
      uniform float time;

      vec3 lerp (vec3 a, vec3 b, float t) {
          return (1. - t) * a + t * b;
      }
      void main() {
        float rgbAmount = glitchColorAmt;
        vec3 fractBy3 = vec3(
            floor(fract(7. * time) + 0.5),
            floor(fract(7. * time+0.3) + 0.5),
            floor(fract(7. * time+0.6) + 0.5)
        );
        gl_FragColor = vec4(0.,0.,0.,0.);
        gl_FragColor.rgb = lerp(gl_FragColor.rgb, fractBy3, rgbAmount);
      }
    `,
};

export default GlitchShader;
