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
      link.href = item.src; // 确保这里的路径是正确的
      link.title = item.title;
      link.setAttribute('data-gallery', 'portfolio-gallery-app');
      link.className = 'glightbox preview-link';
      link.innerHTML = '<i class="bi bi-zoom-in"></i>';

      // 添加 3D 窗口按钮
      const threeDButton = document.createElement('a');
      threeDButton.href = item.threeDLink; // 3D 窗口链接
      threeDButton.className = 'btn btn-primary';
      threeDButton.textContent = '3D';
      threeDButton.target = '_blank'; // 在新窗口打开

      // 添加 图片组按钮
      const galleryButton = document.createElement('a');
      galleryButton.href = item.galleryLink; // 图片组链接
      galleryButton.className = 'btn btn-secondary';
      galleryButton.textContent = '详情';
      galleryButton.target = '_blank'; // 在新窗口打开

      portfolioInfo.appendChild(link);
      portfolioInfo.appendChild(threeDButton); // 添加 3D 窗口按钮
      portfolioInfo.appendChild(galleryButton); // 添加 图片组按钮
      colDiv.appendChild(img);
      colDiv.appendChild(portfolioInfo);
      container.appendChild(colDiv);
    });

    // 重新初始化 GLightbox
    GLightbox({
      selector: '.glightbox'
    });

    // 重新初始化 Isotope 布局
    if (typeof initIsotope !== 'undefined') {
      initIsotope.reloadItems();
      initIsotope.layout();
    }
  })
  .catch(error => console.error('Error loading gallery.json:', error));

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
