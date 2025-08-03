let currentSlide = 0;
const slides = document.querySelectorAll('.img-container');
const dots = document.querySelectorAll('.btn');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
    dots[i].style.backgroundColor = i === index ? '#555' : '#fdedcef5';
  });
  currentSlide = index;
}

function autoSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(autoSlide, 1500); // change image every 1.5 seconds
