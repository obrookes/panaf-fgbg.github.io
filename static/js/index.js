window.HELP_IMPROVE_VIDEOJS = false;

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
