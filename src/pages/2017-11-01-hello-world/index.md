---
path: "/depth-of-field-with-custom-autofocus"
date: "2017-11-01T20:24:50.791Z"
title: "Depth of Field, BokehShader: Autofocus to Closest Point with Three.js"
tags:
  - bokeh
  - depth of field
  - threejs
  - glsl
  - javascript
  - linear algebra
image: particles.jpg
excerpt: Open the link! Come on, there's something fun for you to play with.
draft: false
---

# _Autofocus or: How We Learn to Love Linear Algebra_

In case you've stumbled your way to this post about [Three.js][Three.js] and some bizarre sounding words relating to it, I'm assuming that you know what post-processing is. It refers to per-pixel operations on images. Which could be your relaxing holiday photos in Lightroom or that sick [1st person snowboarding][snowboarding] video footage in Premiere!

**Real-time post-processing** is an art form in itself. I've had a pleasure to learn more about it during the past year. In general it's the same as the examples mentioned above, but the goal is to make it execute in real-time. What a surprise! I had to brush up those [dusty old math books][StackExchange] to figure out a solution for the problem we're facing. The autofocus feature of the classic [BokehShader][BokehShader2] was not doing what we required. So a custom solution was built!

## **Boilerplates as Starters**
Generally it's beneficial to not have a a completely blank slate to start from with a brand new project.
That's why I prefer to look for a good [boilerplate code][boilerplate] from GitHub to use as a starting point.
One of the exceptional ones that's around which combines both Three.js and Webpack, is [webpack-threejs-boilerplate][webpack-threejs-boilerplate] by [fazeaction][fazeaction].

Let's get started by cloning the repository!

```bash
git clone https://github.com/fazeaction/webpack-threejs-boilerplate.git
```

### Updating Packages
After cloning the repository to your local drive, it's a good time to update the packages before actually installing them. Lucky you, there's a tool called [npm-check-updates][npm-check-updates] which does all the hard work for you! Run the code below in your terminal to proceed...

```bash
npm-check-updates -a
npm install
npm run dev
```

### Cleaning Up the Project
The boilerplate we are using has a couple of different starting points in the following path: `./src/js/main*.js`
Since I thought [Wagner][Wagner] would be required, my choice was the one which contained Wagner by default.

Only thing left to do before moving onto 3D programación, was to do a bit of housekeeping. To be specific I removed all the geometry generation code and enabled [OrbitControls][OrbitControls] for those sweet camera moves!


## **Scene Setup**

### Objects as Focal Points
Let there be a sky! Although it's a rather dark one...
```javascript
this._renderer.setClearColor(0x2a363b, 1);
```

Our world is still looking rather empty so let us populate it with pretty boxes. The amount of scattered small boxes is based on `boxRes` as that guides the resolution of the larger box!

```javascript{}
let boxRes = 4;
let scatterBox = new THREE.BoxGeometry(100, 100, 100, boxRes, boxRes, boxRes);

// Scatter a small BoxGeometry on each point on the scatterBox
for (let i = 0; i < scatterBox.vertices.length; i++) {
  let scatterPos = scatterBox.vertices[i];
  let scatterMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
  let scatterMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1), scatterMat);
  scatterMesh.position.set(scatterPos.x, scatterPos.y, scatterPos.z);
  this._scene.add(scatterMesh);
}
```

### Depth of Field with BokehShader
The scope for this blog post is mostly focused around custom autofocus. Pun intended.
Meaning I don't want to spend too much time on showing how to get the basic version of BokehShader working. There's no comments explaining what each line is doing but the example in Three.js GitHub is relatively easy to follow.

[Take a look here!][BokehShader2-setup]

## **Scene Setup**

### Custom Autofocus
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis sem ac porta laoreet. Nunc faucibus tincidunt viverra. Donec vulputate felis auctor erat feugiat tristique. Duis eu vulputate augue. Ut commodo vestibulum porttitor. Pellentesque sit amet mollis lorem. Donec at lorem sed augue elementum aliquam. Donec ligula libero, viverra id elit ac, suscipit sagittis mauris. Praesent placerat felis vel nibh.

### Closest Point
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis sem ac porta laoreet. Nunc faucibus tincidunt viverra. Donec vulputate felis auctor erat feugiat tristique. Duis eu vulputate augue. Ut commodo vestibulum porttitor. Pellentesque sit amet mollis lorem. Donec at lorem sed augue elementum aliquam. Donec ligula libero, viverra id elit ac, suscipit sagittis mauris. Praesent placerat felis vel nibh.

```javascript{2-5}
// Finding the centroid of the face
var vertices = bboxGeo.vertices;
var v1 = vertices[ face.a ];
var v2 = vertices[ face.b ];
var v3 = vertices[ face.c ];

var facePos = new THREE.Vector3();
facePos.x = ( v1.x + v2.x + v3.x ) / 3;
facePos.y = ( v1.y + v2.y + v3.y ) / 3;
facePos.z = ( v1.z + v2.z + v3.z ) / 3;
```

<!-- Turns out even [`<iframes>`][iframe] work here, wouwiee! But they seem to be also insanely slow.
Too bad... Most likely will have to resort to .mp4 / .gif -solution.

<div>
<video playsinline autoplay loop muted class="responsive">
  <source type="video/mp4" src="./media/video.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>
</div>

<div>
<video playsinline autoplay loop muted class="responsive">
  <source type="video/mp4" src="https://media.giphy.com/media/QQkyLVLAbQRKU/giphy.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>
</div>

<iframe width="630" height="394" src="https://www.useloom.com/embed/892aee22d38e4e8f9312a4c813c347bd" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<div style='position:relative; padding-bottom:60%;'><iframe src='https://cartrdge.com/ditto/separation/embed' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

<iframe width="300" height="300" src="http://arttukoskela.com/particles/" frameborder="0" allowfullscreen></iframe>
[iframe]: https://www.w3schools.com/tags/tag_iframe.asp -->

<!-- <div style="overflow: hidden">
<video playsinline autoplay loop muted class="responsive">
  <source type="video/mp4" src="./media/testVideoCrop.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>
</div> -->

<!-- <iframe width="630" height="394" src="https://www.useloom.com/embed/892aee22d38e4e8f9312a4c813c347bd" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->

[Three.js]: https://threejs.org/
[snowboarding]: https://www.youtube.com/watch?v=yy0zS0ZENkA
[StackExchange]: https://math.stackexchange.com/
[BokehShader2]: https://threejs.org/examples/webgl_postprocessing_dof2.html
[boilerplate]: https://en.wikipedia.org/wiki/Boilerplate_code
[webpack-threejs-boilerplate]: https://github.com/fazeaction/webpack-threejs-boilerplate
[fazeaction]: https://github.com/fazeaction/
[npm-check-updates]: https://www.npmjs.com/package/npm-check-updates
[Wagner]: https://github.com/spite/Wagner
[OrbitControls]: https://threejs.org/examples/misc_controls_orbit
[BokehShader2-setup]: https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_dof2.html
