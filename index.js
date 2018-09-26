const container = document.getElementById("container");

function draw(canvas, src) {
  const ctx = canvas.getContext('2d');
  const img = new Image();
  return new Promise(r => {
    img.onload = function () {
      EXIF.getData(img, function () {
        const { Orientation } = EXIF.getAllTags(this);
        const aspectRatio = img.height / img.width;
        console.log(Orientation);
        if (Orientation >= 1 && Orientation <= 4) {
          canvas.width = img.width;
          canvas.height = img.height;
        } else {
          canvas.width = img.height;
          canvas.height = img.width;
        }
        switch (Orientation) {
          case 1:
            break;
          case 2:
            ctx.translate(img.width, 0);
            ctx.scale(-1, 1);
            break;
          case 3:
            ctx.rotate(180 * Math.PI / 180);
            ctx.translate(-1 * img.width, -1 * img.height);
            break;
          case 4:
            ctx.translate(0, img.height);
            ctx.scale(1, -1);
            break;
          case 5:
            ctx.translate(img.width * aspectRatio, 0);
            ctx.scale(-1, 1);
            ctx.rotate(90 * Math.PI / 180);
            ctx.translate(0, -1 * img.height);
            break;
          case 6:
            ctx.rotate(90 * Math.PI / 180);
            ctx.translate(0, -1 * img.height);
            break;
          case 7:
            ctx.translate(0, img.height / aspectRatio);
            ctx.scale(1, -1);
            ctx.rotate(90 * Math.PI / 180);
            ctx.translate(0, -1 * img.height);
            break;
          case 8:
            ctx.translate(img.width * aspectRatio, img.height / aspectRatio);
            ctx.scale(-1, -1);
            ctx.rotate(90 * Math.PI / 180);
            ctx.translate(0, -1 * img.height);
            break;
        }
        ctx.drawImage(img,0,0);
      });
      r(img);
    };
    img.src = src;
  });
}

(async () => {
  const imagePaths = [];
  for (let i = 1; i <= 8; i++) {
    imagePaths.push(`https://raw.githubusercontent.com/recurser/exif-orientation-examples/master/Landscape_${i}.jpg`);
    imagePaths.push(`https://raw.githubusercontent.com/recurser/exif-orientation-examples/master/Portrait_${i}.jpg`);
  }

  for (const imagePath of imagePaths) {
    const div = document.createElement("div");
    const canvas = document.createElement("canvas");
    const img = await draw(canvas, imagePath);
    div.appendChild(canvas);
    container.appendChild(div);
  }
})();
