const fulImgBox = document.getElementById("fulImgBox"),
fulImg = document.getElementById("fulImg");

function openFulImg(reference){
    fulImgBox.style.display = "flex";
    fulImg.src = reference
}
function closeImg(){
    fulImgBox.style.display = "none";
}

// Mostrar la imagen anterior
    function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      showImage();
    }

    // Mostrar la siguiente imagen
    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage();
    }

    // Mostrar la imagen actual
    function showImage() {
      imagesContainer.innerHTML = "";
      images.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.alt = `Imagen ${index + 1}`;
        imgElement.style.display = index === currentImageIndex ? "block" : "none";
        imagesContainer.appendChild(imgElement);
      });
      localStorage.setItem("imagenesGuardadas", JSON.stringify(images));
    }

    // Mostrar modal de confirmación
    function confirmDelete() {
      if (images.length === 0) return;
      modal.style.display = "flex";
    }

    // Cerrar el modal
    function closeModal() {
      modal.style.display = "none";
    }

    // Eliminar imagen actual
    function deleteCurrentImage() {
      images.splice(currentImageIndex, 1);
      currentImageIndex = Math.max(0, currentImageIndex - 1);
      closeModal();
      showImage();
    }

    // Cambia el fondo del contenedor de la galería
function setAsWallpaper() {
  const currentImgSrc = images[currentImageIndex];
  localStorage.setItem("wallpaper", currentImgSrc);
  alert("Imagen establecida como fondo de escritorio.");

  // Si existe un contenedor de galería, cambia su fondo (imagenes.html)
  const contenedor = document.getElementsByClassName("contenedor")[0];
  if (contenedor) {
    contenedor.style.backgroundImage = `url('${currentImgSrc}')`;
  }

  // Si existe un fondo de escritorio, cámbialo (escritorio.html)
  const bgCover = document.getElementsByClassName("bg-cover")[0];
  if (bgCover) {
    bgCover.style.backgroundImage = `url('${currentImgSrc}')`;
    bgCover.style.backgroundSize = "cover";
    bgCover.style.backgroundRepeat = "no-repeat";
    bgCover.style.backgroundPosition = "center";
  }
}

    // Subir imagen desde el dispositivo
    const uploadInput = document.getElementById("upload-image");
if (uploadInput) {
  uploadInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        images.push(e.target.result);
        currentImageIndex = images.length - 1;
        showImage();
      };
      reader.readAsDataURL(file);
    }
  });
}

    // Navegación con flechas del teclado
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") showNextImage();
      else if (event.key === "ArrowLeft") showPrevImage();
    });

    // Mostrar imagen al cargar la página
    showImage();
    