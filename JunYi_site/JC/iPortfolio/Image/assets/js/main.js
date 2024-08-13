(function() {
  "use strict";

  /**
   * 当页面向下滚动时，给 body 添加 .scrolled 类
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    // 如果 header 元素不包含某些特定的类，则返回
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    // 根据页面滚动的位置，添加或移除 .scrolled 类
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  // 监听滚动事件和页面加载事件，调用 toggleScrolled 函数
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

})();
