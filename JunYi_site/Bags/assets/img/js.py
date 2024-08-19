import os

def generate_html_for_folder(image_folder):
    image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.bmp')
    
    # 遍历文件夹中的所有子文件夹
    for root, _, files in os.walk(image_folder):
        folder_name = os.path.basename(root)
        
        # 过滤出图片文件
        images = [f for f in files if os.path.isfile(os.path.join(root, f)) and f.lower().endswith(image_extensions)]
        
        if not images:
            continue
        
        # 生成 HTML 内容
        html_content = ''
        for image in images:
            img_path = os.path.join('assets', 'img', folder_name, image).replace('\\', '/')
            img_name = os.path.splitext(image)[0]
            html_content += f'''
            <div class="col-lg-4 col-md-6 portfolio-item isotope-item {folder_name}">
                <img data-src="{img_path}" class="img-fluid lazyload" alt="">
                <div class="portfolio-info">
                    <a href="{img_path}" title="{img_name}" data-gallery="portfolio-gallery-app" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                </div>
            </div>\n'''

        # 写入 HTML 文件
        output_file = os.path.join(root, 'gallery.html')
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(html_content)
        
        print(f"HTML file generated: {output_file}")

# 使用示例
current_directory = os.getcwd()
generate_html_for_folder(current_directory)
