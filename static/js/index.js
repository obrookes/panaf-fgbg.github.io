window.HELP_IMPROVE_VIDEOJS = false;

const INTERP_BASE = "./static/interpolation/stacked";
const NUM_INTERP_FRAMES = 240;

const interp_images = [];

function preloadInterpolationImages() {
  for (let i = 0; i < NUM_INTERP_FRAMES; i++) {
    const path = `${INTERP_BASE}/${String(i).padStart(6, '0')}.jpg`;
    const img = new Image();
    img.src = path;
    interp_images[i] = img;
  }
}

function setInterpolationImage(i) {
  const image = interp_images[i];
  image.ondragstart = () => false;
  image.oncontextmenu = () => false;
  $('#interpolation-image-wrapper').empty().append(image);
}

$(document).ready(function () {
  // Toggle navbar burger menu
  $(".navbar-burger").click(function () {
    $(".navbar-burger, .navbar-menu").toggleClass("is-active");
  });

  const options = {
    slidesToScroll: 3,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  // Initialize carousels
  const carousels = bulmaCarousel.attach('.carousel', options);
  carousels.forEach(c => {
    c.on('before:show', state => console.log(state));
  });

  const element = document.querySelector('#my-element');
  if (element?.bulmaCarousel) {
    element.bulmaCarousel.on('before-show', state => console.log(state));
  }

  preloadInterpolationImages();

  $('#interpolation-slider').on('input', function () {
    setInterpolationImage(this.value);
  });

  setInterpolationImage(0);
  $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);
  bulmaSlider.attach();
});




// Toggle results visibility
document.addEventListener('DOMContentLoaded', function () {
  const toggleButtons = document.querySelectorAll('.toggle-btn');

  toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
      const modelClass = this.getAttribute('data-model');
      const modelRows = document.querySelectorAll(`.${modelClass}`);

      modelRows.forEach(row => row.classList.toggle('active'));

      this.textContent = this.textContent === 'Show more' ? 'Hide results' : 'Show more';
    });
  });
});
