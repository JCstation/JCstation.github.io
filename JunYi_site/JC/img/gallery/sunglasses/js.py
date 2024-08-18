import os
import json

def generate_images_json(root_folder, default_author='Arthur Rose'):
    for root, dirs, files in os.walk(root_folder):
        images = []
        for file_name in files:
            if file_name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                # 提取图片文件的基本信息
                image_path = os.path.relpath(os.path.join(root, file_name), root_folder)
                category = os.path.basename(root)  # 使用文件夹名称作为category
                image_info = {
                    "src": image_path.replace('\\', '/'),  # 转换为相对路径并将路径分隔符替换为正斜杠
                    "category": category,
                    "author": default_author
                }
                images.append(image_info)
        
        if images:
            # 将结果保存为JSON文件
            output_file = os.path.join(root, 'images.json')
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(images, f, ensure_ascii=False, indent=4)
            print(f"Generated {output_file}")

if __name__ == "__main__":
    # 获取当前脚本所在的目录
    current_folder = os.path.dirname(os.path.abspath(__file__))
    generate_images_json(current_folder)
