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
  });
  