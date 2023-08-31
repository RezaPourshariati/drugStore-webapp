const handleLoadAllImage = (element) => {
  return new Promise((resolve, reject) => {
    const images = element.value.querySelectorAll("img");
    let loadedImagesCount = 0;
    ////////////////////////////////
    const handleImageLoad = () => {
      loadedImagesCount++;
      if (loadedImagesCount === images.length) {
        resolve(true);
      }
    };
    ////////////////////////////
    const handleImageError = (event) => {
      reject(new Error(`Failed to load image: ${event.target.src}`));
    };
    ////////////////////////////
    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageError);
      }
    });
  });
};

export default handleLoadAllImage;

