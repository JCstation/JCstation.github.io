import os
import json

def generate_json_for_folder(image_folder):
    image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.bmp')
    data = []  # 存储所有图片信息的列表

    # 遍历文件夹中的所有子文件夹
    for root, _, files in os.walk(image_folder):
        folder_name = os.path.basename(root)
        
        # 过滤出图片文件
        images = [f for f in files if os.path.isfile(os.path.join(root, f)) and f.lower().endswith(image_extensions)]
        
        if not images:
            continue
        
        # 生成图片信息
        for image in images:
            img_path = os.path.join('assets', 'img', folder_name, image).replace('\\', '/')
            img_name = os.path.splitext(image)[0]
            # 创建图片信息字典
            image_info = {
                "folder": folder_name,
                "src": img_path,
                "title": img_name
            }
            data.append(image_info)

    # 写入 JSON 文件
    output_file = os.path.join(image_folder, 'gallery.json')
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)
    
    print(f"JSON file generated: {output_file}")

# 使用示例
current_directory = os.getcwd()
generate_json_for_folder(current_directory)
