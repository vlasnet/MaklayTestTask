function createImages(links, page) {
  const imagesField = document.querySelector(".images-wrapper");

  if (page === 1) imagesField.innerHTML = "";
  links.forEach(link => {
    const tempImage = document.createElement("div");

    tempImage.classList.add("img");
    tempImage.innerHTML = `<img src="${link.url}" alt="${link.title}">`;
    imagesField.appendChild(tempImage);
  })
}

export {createImages};