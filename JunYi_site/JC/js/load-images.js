$(document).ready(function() {
    const folders = ['Sports','Goggles','Running','Fishing','sunglasses'];
    const galleryWarp = $('.gallery-warp');

    function loadImages(folder) {
        $.getJSON(`img/gallery/${folder}/images.json`)
            .done(function(images) {
                images.forEach(image => {
                    const galleryItem = $(`
                        <div class="gallery-item ${image.category}">
                            <a class="fresco" href="img/gallery/${folder}/${image.src}" data-fresco-group="projects">
                                <img class="lazy" data-src="img/gallery/${folder}/${image.src}" alt="">
                            </a>
                            <div class="gi-hover">
                                <img src="img/gallery/author.jpg" alt="">
                                <h6>${image.author}</h6>
                            </div>
                        </div>
                    `);
                    galleryWarp.append(galleryItem);
                });

                galleryWarp.isotope('appended', galleryWarp.children('.gallery-item'));

                $('.fresco').fresco();

                // 初始化懒加载
                if ('IntersectionObserver' in window) {
                    let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
                    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                        entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                                let lazyImage = entry.target;
                                lazyImage.src = lazyImage.dataset.src;
                                lazyImage.classList.remove('lazy');
                                lazyImageObserver.unobserve(lazyImage);
                            }
                        });
                    });
                    lazyImages.forEach(function(lazyImage) {
                        lazyImageObserver.observe(lazyImage);
                    });
                } else {
                    $('.lazy').each(function() {
                        $(this).attr('src', $(this).data('src')).removeClass('lazy');
                    });
                }
            })
            .fail(function() {
                console.error(`Failed to load images from ${folder}`);
            });
    }

    folders.forEach(folder => loadImages(folder));

    galleryWarp.isotope({
        itemSelector: '.gallery-item',
        layoutMode: 'fitRows'
    });

    $('.gallery-filter').on('click', 'li', function() {
        const filterValue = $(this).attr('data-filter');
        galleryWarp.isotope({ filter: filterValue });
        $(this).addClass('active').siblings().removeClass('active');
    });
});
