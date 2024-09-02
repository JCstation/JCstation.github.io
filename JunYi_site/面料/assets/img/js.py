import os
import json

def generate_json_for_folder(image_folder):
    data = []  # 存储所有图片信息的列表

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

        # 查找 3D 文件夹
        three_d_folder = os.path.join(os.path.dirname(root), "3D")
        three_d_html = os.path.join(three_d_folder, "scene.html")

        # 查找详情图片
        detail_images = []
        detail_folder = os.path.join(root, "详情")
        if os.path.isdir(detail_folder):
            detail_images = [f for f in os.listdir(detail_folder) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]

        # 创建图片信息字典
        image_info = {
            "folder": parent_folder_name,  # 使用当前文件夹的名称
            "src": os.path.join('assets', 'img', parent_folder_name, folder_name, main_view_image).replace('\\', '/'),
            "threeDLink": os.path.join('assets', 'img', parent_folder_name, '3D', 'scene.html').replace('\\', '/'),  # 3D 窗口链接
            "galleryLink": [os.path.join('assets', 'img', parent_folder_name, folder_name, '详情', img).replace('\\', '/') for img in detail_images]  # 详情图片链接
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

        html_content += f'''
        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
          <div class="portfolio-content h-100">
            <img src="{main_image}" class="img-fluid" alt="">
            <div class="portfolio-info">
              <h4>{folder_name}</h4>
              <p>Lorem ipsum, dolor sit amet consectetur</p>
              <a href="{main_image}" title="{folder_name}" data-gallery="portfolio-gallery-app" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
              <a href="{three_d_link}" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
            </div>
          </div>
        </div>
        '''
    # 保存生成的 HTML 文件
    output_html_file = os.path.join(os.path.dirname(json_file), 'gallery.html')
    with open(output_html_file, 'w', encoding='utf-8') as file:
        file.write(html_content)

    print(f"HTML file generated: {output_html_file}")

# 使用示例
current_directory = os.getcwd()  # 获取当前工作目录
json_file_path = generate_json_for_folder(current_directory)  # 生成 JSON 文件
generate_html_from_json(json_file_path)  # 生成 HTML 文件
