const makeImgPath = (img = "", width = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;

export default makeImgPath;
