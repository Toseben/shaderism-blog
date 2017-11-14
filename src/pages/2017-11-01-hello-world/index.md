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
image: bokehshader.jpg
excerpt: Tutorial for setting up a custom autofocus that finds the closest point on the geometry!
draft: false
---

# _Autofocus or: How We Learn to Love Linear Algebra_

In case you've stumbled your way to this post about [Three.js][Three.js] and some bizarre sounding words relating to it, I'm assuming that you know what post-processing is. It refers to per-pixel operations on images. Which could be your relaxing holiday photos in Lightroom or that sick [1st person snowboarding][snowboarding] video footage in Premiere!

**Real-time post-processing** is an art form in itself. I've had a pleasure to learn more about it during the past year. In general it's the same as the examples mentioned above, however the goal is to make it execute in real-time. What a surprise! I had to brush up those [dusty old math books][StackExchange] to figure out a solution for the problem we're facing. The autofocus feature of the classic [BokehShader][BokehShader2] was not doing what we required. Instead of focusing on the cursor location, it should focus on the closest point on the bounding box of our geometry surface. So a custom solution was built!

## **Boilerplates as Starters**
Generally it's beneficial to not have a completely blank slate to start from with a brand new project.
That's why I prefer to look for a good [boilerplate code][boilerplate] from GitHub to use as a starting point.
One of the exceptional ones that's around which combines both Three.js and Webpack, is [webpack-threejs-boilerplate][webpack-threejs-boilerplate] by [fazeaction][fazeaction].

Let's get started by cloning the repository!

```bash
git clone https://github.com/fazeaction/webpack-threejs-boilerplate.git
```

### Updating Packages
After cloning the repository to your local drive, it's a excellent time to update the packages before actually installing them. Lucky you, there's a tool called [npm-check-updates][npm-check-updates] which does all the hard work for you! Run the code below in your terminal to proceed...

```bash
npm-check-updates -a
npm install
npm run dev
```

### Cleaning Up the Project
The boilerplate we are using has a couple of different starting points in the following path: `./src/js/main*.js`.
Since I thought [Wagner][Wagner] would be required, my choice was the one which contained Wagner by default.

The only thing left to do before moving on to the 3D programación, was to do a bit of housekeeping. To be specific I removed all the geometry generation and enabled [OrbitControls][OrbitControls] for those sweet camera moves!


## **Scene Setup**

### Objects as Focal Points
Let there be a sky! Although it's a rather dark one...
```javascript
this._renderer.setClearColor(0x2a363b, 1);
```

Our world is still looking rather empty so let us populate it with pretty boxes. The amount of scattered small boxes is based on `boxRes` as that guides the resolution of the larger box!

```javascript{9}
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
<div style="overflow: hidden">
<video style="width: 100%" playsinline autoplay loop muted class="responsive">
  <source type="video/mp4" src="./media/focusGeometry.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>
</div>

### Depth of Field with BokehShader
The scope of this blog post is focused around custom autofocus. Pun intended.
Meaning I don't want to spend too much time on showing how to get the basic version of BokehShader working. There's no comments explaining what each line is doing, but the example in Three.js GitHub is easy to follow.

[Take a look here!][BokehShader2-setup]

## **Custom Autofocus**
We've reached a point where s**t's about to get real. In this next and final step we need to:
* Find out the bounding box of the geometry
* Create a point on each of the six faces and visualize them
* Finally figure out which one is the closest to the camera

### Creating Focus Helpers
```javascript{}
// Finding the bounding box of the object
let focusObject = this.sceneObjects;
let bbox = new THREE.Box3();
bbox.setFromObject(focusObject);

// Create the bounding box geometry for scattering points
let bboxSize = bbox.getSize();
let bboxGeo = new THREE.BoxGeometry(bboxSize.x, bboxSize.y, bboxSize.z);
```

It's always easier to work if you can actually see what you're doing. Thus, while creating points for each face, I decided to also visualize them using sprites. First off the helpers were included in the same scene, but I ran into a few occlusion issues and created a new scene. This way in our render loop, we can render the helpers on top of everything.

```javascript{5-6,14-16}
let colors = [0xe74c3c, 0x2ecc71, 0x3498db];
let dofHelperGroup = new THREE.Group;
let helperTex = new THREE.TextureLoader().load("assets/textures/focusPoint.png");

// Execute for every other face (two triangles per quad)
for ( let id = 0; id < bboxGeo.faces.length; id += 2 ) {
  let colorIdx = Math.floor(id / 2);
  let helperMat = new THREE.SpriteMaterial({ map: helperTex, color: colors[colorIdx] });
  let helperCube = new THREE.Sprite(helperMat);
  helperCube.name = 'helperCube_' + id;
  dofHelperGroup.add(helperCube);
}

// Separate scene to be able to render helpers on top of other geometry
this.dof.helperScene = new THREE.Scene();
this.dof.helperScene.add(dofHelperGroup);

```
<div style="overflow: hidden">
<video style="width: 100%" playsinline autoplay loop muted class="responsive">
  <source type="video/mp4" src="./media/focusHelpers.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>
</div>

### Closest Point & Autofocusing

**Brace yourself for the incoming wall of code!**

So the following code is running in the render/animate loop, whatever you want to call it. One important thing to remember for avoiding errors is to wait for Box3 to be generated!
Let's begin by refreshing our minds with [the equation of a plane:][PlaneEquation]

`ax + by + cz + d = 0`

*Where at least one of the numbers a, b and c must be non-zero.*

With this block of code we find the closest point to the camera for each side of the bounding box. Here's [a useful website][3D-Plotter] that has a 3D plane plotter that I was checking out a couple of times!
Additionally, I heavily referenced [this video][ClosestPointVideo] with the equations!

```javascript{7-8,24,28-30,33}
let minDistance = 0.0;
let distanceArray = [];
let camPos = this._camera.position;

for ( let id = 0; id < bboxGeo.faces.length; id += 2 ) {
  let face = bboxGeo.faces[id];
  // Normal.xyz represents our x + y + z = 0 values of plane
  let normal = face.normal;

  // Finding the centroid of the triangle
  var vertices = bboxGeo.vertices;
  var v1 = vertices[ face.a ];
  var v2 = vertices[ face.b ];
  var v3 = vertices[ face.c ];

  var facePos = new THREE.Vector3();
  facePos.x = (v1.x + v2.x + v3.x) / 3;
  facePos.y = (v1.y + v2.y + v3.y) / 3;
  facePos.z = (v1.z + v2.z + v3.z) / 3;

  // This is the offset of the plane aka d
  let offsetMult = new THREE.Vector3(Math.abs(normal.x), Math.abs(normal.y), Math.abs(normal.z));
  let offset = facePos.multiply(offsetMult);
  let offsetScalar = offset.x + offset.y + offset.z;

  // Calculating the closest point to camera on same plane as bounding box
  // (point.x + planeNormal.x * t) + (point.x + planeNormal.x * t) + (point.x + planeNormal.x * t) = offset
  let camValue = -offsetScalar - (camPos.x * normal.x + camPos.y * normal.y + camPos.z * normal.z);
  let normalValue = normal.x + normal.y + normal.z;
  let t = camValue / normalValue;

  // The value we were after is now solved, now just place it in equation
  let point = new THREE.Vector3(camPos.x + normal.x * t, camPos.y + normal.y * t, camPos.z + normal.z * t);

  // The value is from infinite plane, need clamping to Box3 size
  point.clamp(bbox.min, bbox.max);

  // Push the distances to array for finding the smallest
  let distance = point.distanceTo(camPos);
  distanceArray.push(distance);
};
```

Nearly done now! We need to find out which of the six values is the smallest and then plug it into the shader uniforms. One solution is to find the index of the smallest value in our array.

```javascript{12}
function indexOfSmallest(a) {
 var lowest = 0;
 for (var i = 1; i < a.length; i++) {
  if (a[i] < a[lowest]) lowest = i;
 }
 return lowest;
}

// Find the smallest value out and update shader uniform
let idxSmallest = indexOfSmallest(distanceArray);
let minDistance = distanceArray[idxSmallest];
this.dof.bokeh_uniforms[ 'focalDepth' ].value = minDistance;
```

## And that's it for today folks!
Quite a journey, but we hope you enjoyed reading through it!

<div style="overflow: hidden">
<video style="width: 100%" playsinline autoplay loop muted class="responsive">
  <source type="video/mp4" src="./media/autofocus.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>
</div>

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
[PlaneEquation]: https://brilliant.org/wiki/3d-coordinate-geometry-equation-of-a-plane/
[3D-Plotter]: https://technology.cpm.org/general/3dgraph/
[ClosestPointVideo]: https://www.youtube.com/watch?v=nd5quoKOe-w
