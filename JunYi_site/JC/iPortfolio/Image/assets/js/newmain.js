$(document).ready(function () {
    const baseURL = 'assets/img/preview/fulls/';

    const contentURLs = {
        '3D-images': baseURL + '3D-images/files.json',
        'architecture-images': baseURL + 'architecture-images/files.json',
        'all': [
            baseURL + '3D-images/files.json',
            baseURL + 'architecture-images/files.json',
            
        ]
    };

    function initializeLightGallery() {
        // 销毁现有的 lightGallery 实例
        if ($('#content').data('lightGallery')) {
            $('#content').data('lightGallery').destroy(true);
        }

        lightGallery(document.getElementById('content'), {
            selector: 'a',
            animateThumb: true,
            showThumbByDefault: false,
            mode: 'lg-fade',
            plugins: [lgZoom, lgRotate, lgFullscreen]
        });
    }

    function loadContent(filter) {
        const urls = contentURLs[filter];
        $('#content').empty();  // 清空内容容器

        if (filter === 'all') {
            $('#content').addClass('all-filter-active'); // 为 "all" 过滤器添加特定样式
        } else {
            $('#content').removeClass('all-filter-active'); // 移除上一个过滤器的特定样式
        }

        if (Array.isArray(urls)) {  // 如果是多个 URL
            let promises = urls.map(url => $.getJSON(url));

            $.when.apply($, promises).done(function () {
                let contentPromises = [];

                for (let i = 0; i < arguments.length; i++) {
                    const fileList = arguments[i][0];
                    contentPromises = contentPromises.concat(fileList.map(fileUrl => $.get(fileUrl)));
                }

                $.when.apply($, contentPromises).done(function () {
                    for (let j = 0; j < arguments.length; j++) {
                        $('#content').append(arguments[j][0]);
                    }
                    initializeLightGallery();  // 初始化 lightGallery
                }).fail(function (xhr, status, error) {
                    console.log('加载内容时出错:', status, error);
                });
            }).fail(function (xhr, status, error) {
                console.log('加载内容时出错:', status, error);
            });
        } else if (urls) {  // 如果是单个 URL
            $.getJSON(urls, function (fileList) {
                let contentPromises = fileList.map(fileUrl => $.get(fileUrl));

                $.when.apply($, contentPromises).done(function () {
                    for (let i = 0; i < arguments.length; i++) {
                        $('#content').append(arguments[i][0]);
                    }
                    initializeLightGallery();  // 初始化 lightGallery
                }).fail(function (xhr, status, error) {
                    console.log('加载内容时出错:', status, error);
                });
            }).fail(function (xhr, status, error) {
                console.log('加载 JSON 文件时出错:', status, error);
            });
        } else {
            console.log('未知过滤器:', filter);
        }
    }

    // 绑定过滤器按钮的点击事件
    $('.filter-button').on('click', function () {
        const filter = $(this).data('filter');
        loadContent(filter);
    });

    // 默认加载全部内容
    $('.filter-button[data-filter="all"]').click();
});

document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // 向下滚动，隐藏 header
            header.classList.add('hidden');
        } else {
            // 向上滚动，显示 header
            header.classList.remove('hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});

