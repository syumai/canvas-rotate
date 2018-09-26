export function fixImageOrientation(src) {
  if (src instanceof Blob) {
    src = URL.createObjectURL(src);
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.crossOrigin = 'anonymous';

  return new Promise(resolve => {
    img.onload = () => {
      EXIF.getData(img, () => {
        const orientation = EXIF.getTag(img, 'Orientation') || 1;
        const aspectRatio = img.height / img.width;

        if (orientation >= 1 && orientation <= 4) {
          canvas.width = img.width;
          canvas.height = img.height;
        } else {
          canvas.width = img.height;
          canvas.height = img.width;
        }

        switch (orientation) {
          case 1:
            break;
          case 2:
            ctx.translate(img.width, 0);
            ctx.scale(-1, 1);
            break;
          case 3:
            ctx.rotate((180 * Math.PI) / 180);
            ctx.translate(-1 * img.width, -1 * img.height);
            break;
          case 4:
            ctx.translate(0, img.height);
            ctx.scale(1, -1);
            break;
          case 5:
            ctx.translate(img.width * aspectRatio, 0);
            ctx.scale(-1, 1);
            ctx.rotate((90 * Math.PI) / 180);
            ctx.translate(0, -1 * img.height);
            break;
          case 6:
            ctx.rotate((90 * Math.PI) / 180);
            ctx.translate(0, -1 * img.height);
            break;
          case 7:
            ctx.translate(0, img.height / aspectRatio);
            ctx.scale(1, -1);
            ctx.rotate((90 * Math.PI) / 180);
            ctx.translate(0, -1 * img.height);
            break;
          case 8:
            ctx.translate(img.width * aspectRatio, img.height / aspectRatio);
            ctx.scale(-1, -1);
            ctx.rotate((90 * Math.PI) / 180);
            ctx.translate(0, -1 * img.height);
            break;
        }

        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve);
      });
    };

    img.src = src;
  });
}
