import gsap from "gsap";
export default function modifyCityMaterial(mesh) {
  mesh.material.onBeforeCompile = (shader) => {
    console.log(shader.vertexShader);
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `#include <dithering_fragment>
        //#end#
        `
    );
    console.log(shader.fragmentShader);
    // 添加城市模型渐变效果
    addGradColor(mesh, shader);
    // 添加光圈发现效果
    addSpread(shader);
    // 添加直线光带掠过
    addLightLineSpread(shader);
    // 从上到下扫过城市
    addToTop(shader);
  };
}
export function addGradColor(mesh, shader) {
  mesh.geometry.computeBoundingBox();
  // 获取物体的高度差
  let { min, max } = mesh.geometry.boundingBox;
  let uHeight = max.y - min.y;
  shader.uniforms.uHeight = {
    value: uHeight,
  };
  shader.uniforms.uTopColor = {
    value: new THREE.Color("#aaaeff"),
  };
  // 顶点着色器
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
      #include <common>
      varying vec3 vPosition;
      `
  );
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
      #include <begin_vertex>
      // 将顶点传递给片元着色器
       vPosition = position;
      `
  );
  // 片元着色器
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `#include <common>
          uniform vec3 uTopColor;
          uniform float uHeight;
        varying vec3 vPosition;

        `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `//#end#
        vec4 distGradColor = gl_FragColor;
        // 设置混合的百分比
        float gradMix = (vPosition.y+uHeight/2.0)/uHeight;
        // 计算出混合颜色
        vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
        gl_FragColor =vec4(gradMixColor,1.0);
        //#end#
        `
  );
}
export function addSpread(shader) {
  // 设置扩散的中心点
  shader.uniforms.uSpreadCenter = { value: new THREE.Vector2(0, 0) };
  // 扩散的时间
  shader.uniforms.uSpreadTime = { value: 0 };
  // 设置条带的宽度
  shader.uniforms.uSpreadWidth = { value: 40 };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform vec2 uSpreadCenter;
    uniform float uSpreadTime;
    uniform float uSpreadWidth;
  `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      // 求距离
      float spreadRadius = distance(vPosition.xz,uSpreadCenter);
      // 扩散范围的函数  -x²+要超出的高度
      float spreadIndex = -(spreadRadius-uSpreadTime)*(spreadRadius-uSpreadTime)+uSpreadWidth;
      if(spreadIndex>0.0){
        gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uSpreadWidth);
      }
  //#end#
  `
  );
  gsap.to(shader.uniforms.uSpreadTime, {
    value: 400,
    duration: 2,
    ease: "none",
    repeat: -1,
  });
}

export function addLightLineSpread(shader) {
  // 扩散的时间
  shader.uniforms.uLightLineTime = { value: -1000 };
  // 设置条带的宽度
  shader.uniforms.uLightLineWidth = { value: 40 };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uLightLineTime;
    uniform float uLightLineWidth;
  `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      // 扩散范围的函数  -x²+要超出的高度
      float LightLineIndex = -(vPosition.x+vPosition.z-uLightLineTime)*(vPosition.x+vPosition.z-uLightLineTime)+uLightLineWidth;
      if(LightLineIndex>0.0){
        gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),LightLineIndex/uLightLineWidth);
      }
  //#end#
  `
  );
  gsap.to(shader.uniforms.uLightLineTime, {
    value: 1000,
    duration: 5,
    ease: "none",
    repeat: -1,
  });
}
export function addToTop(shader) {
  // 扩散的时间
  shader.uniforms.uToTopTime = { value: 0 };
  // 设置条带的宽度
  shader.uniforms.uToTopWidth = { value: 40 };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uToTopTime;
    uniform float uToTopWidth;
  `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      // 扩散范围的函数  -x²+要超出的高度
      float ToTopIndex = -(vPosition.y-uToTopTime)*(vPosition.y-uToTopTime)+uToTopWidth;
      if(ToTopIndex>0.0){
        gl_FragColor = mix(gl_FragColor,vec4(0.8,1,0.8,1),ToTopIndex/uToTopWidth);
      }
  //#end#
  `
  );
  gsap.to(shader.uniforms.uToTopTime, {
    value: 500,
    duration: 8,
    ease: "none",
    repeat: -1,
  });
}
