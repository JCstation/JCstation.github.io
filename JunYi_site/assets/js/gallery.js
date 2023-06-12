document.addEventListener('DOMContentLoaded', function() {
  var imageContainer = document.getElementById('lightgallery'); // 获取图像容器元素
  var images = Array.from(imageContainer.children); // 将图像元素转换为数组

  // 随机打乱数组顺序
  images.sort(function(a, b) {
    return Math.random() - 0.5;
  });

  // 清空图像容器
  imageContainer.innerHTML = '';

  // 重新将图像元素添加到容器中
  images.forEach(function(image) {
    imageContainer.appendChild(image);
  });

  // 设置每行的图像数量和容器宽度
  var imagesPerRow = 5;
  var containerWidth = (100 / imagesPerRow) + '%';

  // 设置图像容器的宽度和水平居中对齐
  images.forEach(function(image) {
    var container = document.createElement('div');
    container.classList.add('image-container');
    container.style.width = containerWidth;
    container.appendChild(image);
    imageContainer.appendChild(container);
  });
});
