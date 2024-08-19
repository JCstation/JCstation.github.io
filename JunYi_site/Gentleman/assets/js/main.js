(function() {
  "use strict";

  /**
   * 顶部滚动按钮的功能
   */
  let scrollTop = document.querySelector('.scroll-top');

  // 切换顶部滚动按钮的显示状态
  function toggleScrollTop() {
    if (scrollTop) {
      // 当页面滚动距离大于 100px 时，显示按钮；否则隐藏
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  // 点击按钮时平滑滚动到页面顶部
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 页面加载和滚动时调用切换函数
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * 初始化 AOS（Animate On Scroll）动画
   */
  function aosInit() {
    AOS.init({
      duration: 600,         // 动画持续时间
      easing: 'ease-in-out', // 动画缓动效果
      once: true,            // 动画只执行一次
      mirror: false          // 不启用镜像效果
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * 初始化 GLightbox（用于图片弹窗）
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * 初始化 Pure Counter（用于统计数字）
   */
  new PureCounter();

  /**
   * 初始化 Isotope 布局和过滤功能
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry'; // 布局模式（默认为 masonry）
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*'; // 默认过滤器（默认为 '*', 即显示所有项）
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order'; // 排序方式（默认为 'original-order'）

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      // 初始化 Isotope
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    // 绑定过滤器的点击事件
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active'); // 移除当前活动的过滤器
        this.classList.add('filter-active'); // 添加当前点击的过滤器的活动状态
        initIsotope.arrange({
          filter: this.getAttribute('data-filter') // 重新排列项
        });
        if (typeof aosInit === 'function') {
          aosInit(); // 重新初始化 AOS 动画
        }
      }, false);
    });

  });

  /**
   * 初始化 Swiper 轮播图
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      // 从 .swiper-config 元素中读取配置
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      // 根据是否包含 .swiper-tab 类选择初始化方式
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }


})();
