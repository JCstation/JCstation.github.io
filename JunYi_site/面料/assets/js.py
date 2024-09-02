import os
import json
from bs4 import BeautifulSoup

def generate_json_for_folder(image_folder):
    data = []  # 存储所有图片信息的列表

    # 获取父文件夹 "assets" 的绝对路径
    assets_folder = os.path.abspath(os.path.join(image_folder, os.pardir))

    # 遍历文件夹中的所有子文件夹
    for root, dirs, files in os.walk(image_folder):
        folder_name = os.path.basename(root)

        # 跳过 3D 文件夹
        if folder_name == "3D":
            continue

        # 获取上一级文件夹的名称
        parent_folder_name = os.path.basename(os.path.dirname(root))

        # 查找主视图图片
        main_view_image = f"{folder_name}.png"
        main_view_path = os.path.join(root, main_view_image)

        if not os.path.isfile(main_view_path):
            continue  # 如果没有主视图图片，跳过

        # 查找 3D 文件夹及 scene.html 文件
        three_d_folder = os.path.join(root, "3D")
        three_d_html = os.path.join(three_d_folder, "scene.html")
        if os.path.isfile(three_d_html):
            # 生成从 "assets" 文件夹开始的相对路径
            three_d_link = os.path.relpath(three_d_html, start=assets_folder).replace('\\', '/')
        else:
            three_d_link = ""  # 如果 scene.html 不存在，将链接置为空

        # 查找详情图片
        detail_images = []
        detail_folder = os.path.join(root, "详情")
        if os.path.isdir(detail_folder):
            detail_images = [f for f in os.listdir(detail_folder) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]

        # 创建图片信息字典
        image_info = {
            "folder": parent_folder_name,
            "src": os.path.relpath(main_view_path, start=assets_folder).replace('\\', '/'),
            "threeDLink": three_d_link,  # 使用从 "assets" 开始的相对路径
            "galleryLink": [os.path.relpath(os.path.join(detail_folder, img), start=assets_folder).replace('\\', '/') for img in detail_images]
        }
        data.append(image_info)

    # 写入 JSON 文件
    output_file = os.path.join(image_folder, 'gallery.json')
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    print(f"JSON file generated: {output_file}")
    return output_file

def generate_html_from_json(json_file):
    # 读取 JSON 文件
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    html_content = ""  # 存储生成的 HTML 代码

    # 遍历 JSON 数据生成 HTML
    for item in data:
        folder_name = item["folder"]
        main_image = item["src"]
        three_d_link = item["threeDLink"]

        # 判断 threeDLink 是否存在 scene.html
        if three_d_link:
            details_link = f'<a href="{three_d_link}" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>'
        else:
            details_link = ""  # 如果没有 scene.html，省略详情链接

        html_content += f'''
        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-{folder_name}">
          <div class="portfolio-content h-100">
            <img src="{main_image}" class="img-fluid" alt="">
            <div class="portfolio-info">
              <h4>{folder_name}</h4>
              <p>这是由钧艺创建的简单示例</p>
              <a href="{main_image}" title="{folder_name}" data-gallery="portfolio-gallery-app" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
              {details_link}
            </div>
          </div>
        </div>
        '''
    
    # 保存生成的 HTML 文件
    output_html_file = os.path.join(os.path.dirname(json_file), 'gallery.html')
    with open(output_html_file, 'w', encoding='utf-8') as file:
        file.write(html_content)

    print(f"HTML file generated: {output_html_file}")

    # 更新 index.html 文件
    update_index_html(output_html_file)
    
def update_index_html(gallery_html_file):
    index_file_path = r'F:\JCstation.github.io\JunYi_site\面料\index.html'
    
    # 读取 gallery.html 文件内容
    with open(gallery_html_file, 'r', encoding='utf-8') as file:
        gallery_html_content = file.read()

    # 读取 index.html 文件
    with open(index_file_path, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')

    # 查找要更新的容器元素
    container = soup.find('div', class_='row gy-4 isotope-container')
    if container:
        # 替换容器内容
        container.clear()
        container.append(BeautifulSoup(gallery_html_content, 'html.parser'))

        # 写入更新后的 index.html 文件
        with open(index_file_path, 'w', encoding='utf-8') as file:
            file.write(str(soup))
        
        print(f"Index file updated: {index_file_path}")
    else:
        print("Error: 'row gy-4 isotope-container' not found in index.html")

# 使用示例
current_directory = os.getcwd()  # 获取当前工作目录
json_file_path = generate_json_for_folder(current_directory)  # 生成 JSON 文件
generate_html_from_json(json_file_path)  # 生成 HTML 文件
