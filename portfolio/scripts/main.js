(function() {
  "use strict";

  window.addEventListener('load', () => {
    on_page_load()
  });

  /**
   * Function gets called when page is loaded.
   */
  function on_page_load() {
    // Initialize On-scroll Animations
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }

  /**
   * Navbar effects and scrolltop buttons upon scrolling
   */
  const navbar = document.getElementById('header-nav')
  var body = document.getElementsByTagName("body")[0]
  const scrollTop = document.getElementById('scrolltop')
  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm')
      body.style.paddingTop = navbar.offsetHeight + "px"
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm')
      body.style.paddingTop = "0px"
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity = 0;
    }
  };

  /**
   * Masonry Grid
   */
  var elem = document.querySelector('.grid');
  if(elem) {
    imagesLoaded(elem, function() {
      new Masonry(elem, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true
      });
    })
  }

  /**
   * Big Picture Popup for images and videos
   */
   document.querySelectorAll("[data-bigpicture]").forEach((function(e) {
     e.addEventListener("click", (function(t){
       t.preventDefault();
       const data =JSON.parse(e.dataset.bigpicture)
       BigPicture({
        el: t.target,
        ...data
      })
     })
    )
  }))

  /**
   * Big Picture Popup for Photo Gallary
   */
   document.querySelectorAll(".bp-gallery a").forEach((function (e) {
    var caption = e.querySelector('figcaption')
    var img = e.querySelector('img')
    
    // 1. If the link is non-functional, prevent all actions on it.
    if (e.getAttribute('href') === 'javascript:void(0);') {
      e.addEventListener('click', function(event) {
        event.preventDefault();
      });
      var link = document.createElement('span');  // Create a span instead of an anchor
      link.classList.add('link-light');  // Keep the styling
      link.innerHTML = caption.innerHTML;
      img.dataset.caption = link.outerHTML;  // Update the dataset caption to use the span instead of an anchor
    } else {
      img.dataset.caption = '<a class="link-light" target="_blank" href="' + e.href + '">' + caption.innerHTML + '</a>';
    }
    
    // 2. Ensure that the clicked picture is shown in BigPicture
    e.addEventListener("click", (function (t) {
      t.preventDefault();
      BigPicture({
        el: img,  // Ensure we're showing the img from the clicked a-tag
        gallery: '.bp-gallery',
      })
    }))
  }));

  // Add your javascript here


})();