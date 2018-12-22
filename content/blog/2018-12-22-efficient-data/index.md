---
path: "/efficient-3d-data-backend"
date: "2018-12-22T20:24:50.791Z"
title: "Efficient 3D Data Storage"
tags:
  - backend
  - data
  - mongodb
  - javascript
  - performance
image: multiview.jpg
excerpt: A How-To for optimizing the amount of data storage needed for sharing 3D experiences!
draft: false
---

## **Some Clever Title: Here**
Sharing computer graphics driven experiences online isn't a walk in the park. In regular offline non-realtime applications having a 30Gb size .e57 point cloud would be perfectly normal. That's not really feasible for downloading over a weak 3G signal though. Because of this below we have a few ways to increase the performance of our web apps.

These examples are from my latest personal project Popup Mockup. While planning the project I designed it so that it avoids some of the pitfalls.

### Recreate the scene rather than storing everything
All of the geometry shapes are created from simple primitives like planes and boxes. When sharing and saving the generated scene to database the naive approach would be to save information about each object. Instead we store only the minimal amount of information to be able to reliably recreate same scene again. In Popup Mockup's case I mostly needed matrix coordinates (position, rotation and scale) of each element created. Also code name for the emoji being used or the text and font.

Then when loading the page we can see if the user is creating or viewing a shared experience and load corresponding Component. Both components are quite similar but in ShareCardApp you won't be able to create anything new, rather the scene is recreated based on the data fetched from the database.

Bit too much text here?

```javascript{}
import BuildCardApp from "./BuildCardApp";
import ShareCardApp from "./ShareCardApp";

const pathName = window.location.pathname.split("/");
const shortId = pathName.pop();
const apiUrl = pathName.pop();

if (shortId && apiUrl === "share") {
  axios
    .get(`/api/${shortId}`)
    .then(response => {
      if (response.data) this.setState({ mode: "share" });
    })
} else {
  this.setState({ mode: "build" });
}

if (mode === "share") {
  renderMode = <ShareCardApp />;
} else {
  renderMode = <BuildCardApp />;
}
```

### First things first, don't need all precision
Example of how I saved each card from Popup, note all the precision which don't need

```javascript{}
allElements.forEach((cardEl) => {
  const pos = cardEl.getAttribute("position");
  const scale = cardEl.getAttribute("scale");
  const rotation = cardEl.getAttribute("rotation");

  if (cardEl.getAttribute("id").includes("emoji")) {
    const emojiData = {
      e: cardEl.emoji,
      p: {
        x: pos.x.toFixedNumber(2),
        y: pos.y.toFixedNumber(2),
        z: pos.z.toFixedNumber(2)
      },
      s: scale.x.toFixedNumber(2),
      r: rotation.z.toFixedNumber(2)
    };

    emojiArray.push(emojiData);
  } else {
    const textData = {
      t: child.text,
      f: child.font,
      c: child.bgColor,
      p: {
        x: pos.x.toFixedNumber(2),
        y: pos.y.toFixedNumber(2),
        z: pos.z.toFixedNumber(2)
      },
      s: scale.x.toFixedNumber(2),
      r: rotation.z.toFixedNumber(2)
    };
  }
});
```

### API for resources
https://www.npmjs.com/package/emoji-js

First I wanted to give option for uploading own images but quickly realised the storage issue. Use external APIs for getting in data if possible