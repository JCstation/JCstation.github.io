$(document).ready(function() {
    // 定义图片文件夹
    const folders = ['Sports','Goggles','Running','Fishing','sunglasses',];  // 你可以根据需要添加更多文件夹

    const galleryWarp = $('.gallery-warp');

    folders.forEach(folder => {
        $.getJSON(`img/gallery/${folder}/images.json`, function(images) {
            images.forEach(image => {
                const galleryItem = $(`
                    <div class="gallery-item ${image.category}">
                        <a class="fresco" href="img/gallery/${folder}/${image.src}" data-fresco-group="projects">
                            <img src="img/gallery/${folder}/${image.src}" alt="">
                        </a>
                        <div class="gi-hover">
                            <img src="img/gallery/author.jpg" alt="">
                            <h6>${image.author}</h6>
                        </div>
                    </div>
                `);
                galleryWarp.append(galleryItem);
            });

            // 在每次加载完一个文件夹的图片后初始化或刷新Isotope和Fresco
            galleryWarp.isotope('appended', galleryWarp.children('.gallery-item'));
            $('.fresco').fresco();
        });
    });

    // 初始化Isotope
    galleryWarp.isotope({
        itemSelector: '.gallery-item',
        layoutMode: 'fitRows'
    });

    // 绑定过滤器
    $('.gallery-filter').on('click', 'li', function() {
        const filterValue = $(this).attr('data-filter');
        galleryWarp.isotope({ filter: filterValue });
        $(this).addClass('active').siblings().removeClass('active');
    });
});