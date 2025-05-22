$(function() {

    $(document).on('click.bs.dropdown.data-api', '.dropdown-menu', function (e) { 
      e.stopPropagation();
    });

    function headerSticky() {
      if ($(window).scrollTop() > 0) {
        $('.navbar').addClass("sticky");
      } else {
        $('.navbar').removeClass("sticky");
      }
    };

    $(window).scroll(function() {
      headerSticky();
    });
    headerSticky();

  // CAROUSEL

    $owlMain = $('.owl-main');
    function initializeMain() {
      if (window.matchMedia('(max-width: 991.98px)').matches) {
        $owlMain.addClass('owl-carousel');
        $owlMain.owlCarousel({
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 2,
            },
            992: {
              items: 3,
            },
          },
          dots: true,
          smartSpeed: 1000,
          margin: 12, 
          // center: true,
      });
      } else {
        $owlMain.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $owlMain.find('.owl-stage-outer').children().unwrap();
      }
    };
    $(window).resize(initializeMain);
    initializeMain();

  // SELECT-LANGUAGE

  const selected = document.getElementById('selectedFlag');
  const options = document.getElementById('flagOptions');

  if (selected && options) {
    selected.addEventListener('click', () => {
      options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
    });

    options.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const newFlag = e.target.src;
        selected.querySelector('img').src = newFlag;
        options.style.display = 'none';

        const lang = e.target.dataset.lang;
        console.log('Выбран язык:', lang); // Здесь можно вставить твою логику
      }
    });

    // Закрытие при клике вне селектора
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.language-selector')) {
        options.style.display = 'none';
      }
    });
  };
  
});

// DRAG-N-DROP

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}
