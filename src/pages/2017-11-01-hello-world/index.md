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

Real time post-processing is an art form which I've had a pleasure to learn about these past months.
Recently I needed to brush up those old dusty math books to figure out a solution for the problem.
The autofocus of the classic BokehShader was not doing what was required so a custom solution was needed.

<div style="overflow: hidden">
<video playsinline autoplay loop muted class="responsive">
  <source type="video/mp4" src="./media/testVideoCrop.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>
</div>

<!-- <iframe width="630" height="394" src="https://www.useloom.com/embed/892aee22d38e4e8f9312a4c813c347bd" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->


## **Boilerplates as Starters**

Oftentimes it's beneficial to not have a completely blank slate to start from.
That's why I like to search for a good boilerplate from GitHub to use as a starting point.
One of the best ones which combine Three.js with Webpack that's around is webpack-threejs-boilerplate by fazeaction.

### Updating Packages

```bash
git clone https://github.com/fazeaction/webpack-threejs-boilerplate.git
```

After cloning the repository to your local drive it could be a good time to update the packages before actually installing them.

```bash
npm-check-updates -a
npm install
npm run dev
```

### Cleaning Up the Project
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis sem ac porta laoreet. Nunc faucibus tincidunt viverra. Donec vulputate felis auctor erat feugiat tristique. Duis eu vulputate augue. Ut commodo vestibulum porttitor. Pellentesque sit amet mollis lorem. Donec at lorem sed augue elementum aliquam. Donec ligula libero, viverra id elit ac, suscipit sagittis mauris. Praesent placerat felis vel nibh.

## **Scene Setup**

### Objects as Focal Points
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis sem ac porta laoreet. Nunc faucibus tincidunt viverra. Donec vulputate felis auctor erat feugiat tristique. Duis eu vulputate augue. Ut commodo vestibulum porttitor. Pellentesque sit amet mollis lorem. Donec at lorem sed augue elementum aliquam. Donec ligula libero, viverra id elit ac, suscipit sagittis mauris. Praesent placerat felis vel nibh.

### Depth of Field with BokehShader
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis sem ac porta laoreet. Nunc faucibus tincidunt viverra. Donec vulputate felis auctor erat feugiat tristique. Duis eu vulputate augue. Ut commodo vestibulum porttitor. Pellentesque sit amet mollis lorem. Donec at lorem sed augue elementum aliquam. Donec ligula libero, viverra id elit ac, suscipit sagittis mauris. Praesent placerat felis vel nibh.

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

[StackExchange]: https://math.stackexchange.com/
