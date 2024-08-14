$(document).ready(function() {
    // 图片数据（你可以从服务器动态加载这些数据）
    const images = [
        { src: 'img/gallery/1.jpg', category: 'featured', author: 'Arthur Rose' },
        { src: 'img/gallery/2.jpg', category: 'people', author: 'Arthur Rose' },
        { src: 'img/gallery/3.jpg', category: 'nature', author: 'Arthur Rose' },
        { src: 'img/gallery/4.jpg', category: 'travel', author: 'Arthur Rose' },
        { src: 'img/gallery/5.jpg', category: 'featured', author: 'Arthur Rose' },
        { src: 'img/gallery/6.jpg', category: 'animal', author: 'Arthur Rose' },
        { src: 'img/gallery/7.jpg', category: 'travel', author: 'Arthur Rose' },
        { src: 'img/gallery/8.jpg', category: 'people', author: 'Arthur Rose' },
        { src: 'img/gallery/9.jpg', category: 'animal', author: 'Arthur Rose' },
        { src: 'img/gallery/10.jpg', category: 'travel', author: 'Arthur Rose' },
        { src: 'img/gallery/11.jpg', category: 'featured', author: 'Arthur Rose' }
    ];

    const galleryWarp = $('.gallery-warp');

    images.forEach(image => {
        const galleryItem = $(`
            <div class="gallery-item ${image.category}">
                <a class="fresco" href="${image.src}" data-fresco-group="projects">
                    <img src="${image.src}" alt="">
                </a>
                <div class="gi-hover">
                    <img src="img/gallery/author.jpg" alt="">
                    <h6>${image.author}</h6>
                </div>
            </div>
        `);
        galleryWarp.append(galleryItem);
    });

    // 初始化插件
    $('.fresco').fresco();
    $('.gallery-warp').isotope({
        itemSelector: '.gallery-item',
        layoutMode: 'fitRows'
    });

    // 绑定过滤器
    $('.gallery-filter').on('click', 'li', function() {
        const filterValue = $(this).attr('data-filter');
        $('.gallery-warp').isotope({ filter: filterValue });
        $(this).addClass('active').siblings().removeClass('active');
    });
});
