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

selected.addEventListener('click', () => {
  options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
});

options.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const newFlag = e.target.src;
    selected.querySelector('img').src = newFlag;
    options.style.display = 'none';

    const lang = e.target.dataset.lang;
    console.log('Выбран язык:', lang); // Можешь сюда вставить свою логику
  }
});

// Закрытие при клике вне селектора
document.addEventListener('click', (e) => {
  if (!e.target.closest('.language-selector')) {
    options.style.display = 'none';
  }
});


});

