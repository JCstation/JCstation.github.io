document.addEventListener('DOMContentLoaded', function() {
  var imageContainer = document.getElementById('lightgallery'); // 获取图像容器元素
  var images = Array.from(imageContainer.children); // 将图像元素转换为数组

  // 随机打乱数组顺序
  images.sort(function() {
    return Math.random() - 0.5;
  });

  // 设置每行的图像数量和容器宽度
  var imagesPerRow = 5;
  var containerWidth = (100 / imagesPerRow) + '%';

  // 清空图像容器
  imageContainer.innerHTML = '';

  // 重新将图像元素添加到容器中，并重新排列布局
  images.forEach(function(image) {
    var container = document.createElement('div');
    container.classList.add('image-container');
    container.style.width = containerWidth;
    container.appendChild(image);
    imageContainer.appendChild(container);
  });

  // 图像点击事件处理程序
  images.forEach(function(image) {
    image.addEventListener('click', function() {
      // 隐藏页眉和页脚
      var header = document.querySelector('header');
      var footer = document.querySelector('footer');
      header.style.display = 'none';
      footer.style.display = 'none';

      // 图像关闭事件处理程序
      image.addEventListener('close', function() {
        // 还原页眉和页脚的显示
        header.style.display = '';
        footer.style.display = '';
      });
    });
  });

  // 获取所有筛选按钮
  var filterButtons = document.querySelectorAll('.filter-button');

  // 筛选按钮的点击事件处理程序
  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var filter = this.getAttribute('data-filter'); // 获取筛选条件

      // 过滤掉 "VRstore" 的图像
      var filteredImages = images.filter(function(image) {
        return image.getAttribute('data-filter') !== 'VRstore';
      });
      
      // 还原页眉和页脚的显示
      var header = document.querySelector('header');
      var footer = document.querySelector('footer');
      header.style.display = '';
      footer.style.display = '';

      // 过滤图像元素，只显示符合筛选条件的图像
      filteredImages = filteredImages.filter(function(image) {
        var imageFilter = image.getAttribute('data-filter');
        return filter === 'all' || imageFilter === filter;
      });

      // 清空图像容器
      imageContainer.innerHTML = '';

      // 将筛选后的图像元素重新添加到容器中，并重新排列布局
      filteredImages.forEach(function(image) {
        var container = document.createElement('div');
        container.classList.add('image-container');
        container.style.width = containerWidth;
        container.appendChild(image);
        imageContainer.appendChild(container);
      });

      // 获取容器
      var matterportContainer = document.querySelector('.matterport-container');

      // 根据筛选条件显示或隐藏容器
      if (filter === 'VRstore') {
        matterportContainer.style.display = 'block';
      } else {
        matterportContainer.style.display = 'none';
      }
    });
  });
});
