/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    if (headerToggleBtn) { // Periksa apakah tombol ada sebelum mengubah kelas
        document.querySelector('#header').classList.toggle('header-show');
        headerToggleBtn.classList.toggle('bi-list');
        headerToggleBtn.classList.toggle('bi-x');
    }
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') { // Periksa apakah AOS sudah dimuat
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    if (typeof Typed !== 'undefined') { // Periksa apakah Typed sudah dimuat
        let typed_strings = selectTyped.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
    }
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    if (typeof Waypoint !== 'undefined') {
        new Waypoint({
          element: item,
          offset: '80%',
          handler: function(direction) {
            let progress = item.querySelectorAll('.progress .progress-bar');
            progress.forEach(el => {
              el.style.width = el.getAttribute('aria-valuenow') + '%';
            });
          }
        });
    }
  });

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        const isotopeContainer = isotopeItem.querySelector('.isotope-container');
        if (isotopeContainer) { // Periksa apakah kontainer isotope ada
            initIsotope = new Isotope(isotopeContainer, {
              itemSelector: '.isotope-item',
              layoutMode: layout,
              filter: filter,
              sortBy: sort
            });
        }
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        const activeFilter = isotopeItem.querySelector('.isotope-filters .filter-active');
        if (activeFilter) {
            activeFilter.classList.remove('filter-active');
        }
        this.classList.add('filter-active');
        if (initIsotope) {
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
        }
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Init swiper sliders (fungsi umum dari template)
   * Saya akan membiarkan ini apa adanya, dan menambahkan fungsi spesifik untuk slider sertifikasi di bawah.
   * Pastikan tidak ada konflik selector.
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      if (typeof Swiper !== 'undefined') {
        // Cek apakah elemen config ada sebelum mencoba membacanya
        const configElement = swiperElement.querySelector(".swiper-config");
        if (configElement && configElement.innerHTML.trim()) {
            let config = JSON.parse(configElement.innerHTML.trim());
            if (swiperElement.classList.contains("swiper-tab")) {
              // Pastikan initSwiperWithCustomPagination terdefinisi jika digunakan
              if (typeof initSwiperWithCustomPagination === 'function') {
                initSwiperWithCustomPagination(swiperElement, config);
              } else {
                new Swiper(swiperElement, config); // Fallback jika fungsi kustom tidak ada
              }
            } else {
              new Swiper(swiperElement, config);
            }
        } else {
            // Fallback jika tidak ada .swiper-config, atau handle error
            // Mungkin bisa inisialisasi dengan config default jika swiperElement itu sendiri yang ditargetkan
            // dan bukan `.init-swiper` yang memerlukan `.swiper-config`
            // console.warn('Swiper config not found for element:', swiperElement);
        }
      }
    });
  }
  // window.addEventListener("load", initSwiper); // Kita akan memanggil initCertificationsSwiper yang lebih spesifik

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          if (section) { // Periksa apakah section ditemukan
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Inisialisasi Slideshow Gambar di Bagian About (jika masih digunakan)
   */
  function initAboutImageSlideshow() {
    const slideshowContainer = document.querySelector('#about-image-slideshow');
    if (!slideshowContainer) {
      return;
    }
    const images = slideshowContainer.querySelectorAll('img');
    if (images.length <= 1) {
      return;
    }
    let currentIndex = 0;
    const slideInterval = 2000;
    function showNextImage() {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }
    setInterval(showNextImage, slideInterval);
  }
  window.addEventListener('load', initAboutImageSlideshow);


 /**
   * Inisialisasi Swiper untuk Slider Sertifikasi
   */
    function initCertificationsSwiper() {
    const certificationsSwiperEl = document.querySelector('.certifications-swiper');
    if (certificationsSwiperEl && typeof Swiper !== 'undefined') {
      new Swiper(certificationsSwiperEl, {
        loop: true,
        speed: 600,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        slidesPerView: 1, // KUNCI: Selalu 1 slide per tampilan
        spaceBetween: 15, // Jarak kecil antar slide untuk transisi
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        // Breakpoints mungkin tidak lagi diperlukan jika selalu 1 slide
        // Jika masih ada, pastikan slidesPerView: 1 di semua breakpoint
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 1, spaceBetween: 15 },
          1200: { slidesPerView: 1, spaceBetween: 20 }
        }
      });
    }
  }
  window.addEventListener("load", initCertificationsSwiper);
  
})();