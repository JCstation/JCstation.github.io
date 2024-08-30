(function() {
  "use strict";

  // 顶部滚动按钮的功能
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // 初始化 AOS（Animate On Scroll）动画
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  // 加载 gallery.json 并生成图片展示
  fetch('assets/img/gallery.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('portfolio-items'); // 确保选择正确的容器
      data.forEach(item => {
        const colDiv = document.createElement('div');
        colDiv.className = `col-lg-4 col-md-6 portfolio-item isotope-item ${item.folder}`;

        const img = document.createElement('img');
        img.setAttribute('data-src', item.src);
        img.className = 'img-fluid lazyload';
        img.alt = '';

        const portfolioInfo = document.createElement('div');
        portfolioInfo.className = 'portfolio-info';

        const link = document.createElement('a');
        link.href = item.src;
        link.title = item.title;
        link.setAttribute('data-gallery', 'portfolio-gallery-app');
        link.className = 'glightbox preview-link';
        link.innerHTML = '<i class="bi bi-zoom-in"></i>';

        portfolioInfo.appendChild(link);
        colDiv.appendChild(img);
        colDiv.appendChild(portfolioInfo);
        container.appendChild(colDiv);
      });

      // 重新初始化 Isotope 布局
      if (typeof initIsotope !== 'undefined') {
        initIsotope.reloadItems();
        initIsotope.layout();
      }
    })
    .catch(error => console.error('Error loading gallery.json:', error));

  // 初始化 GLightbox（用于图片弹窗）
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  // 初始化 Pure Counter（用于统计数字）
  new PureCounter();

  // 初始化 Isotope 布局和过滤功能
  let initIsotope; // 将 initIsotope 定义为全局变量
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

})();
