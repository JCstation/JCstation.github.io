import os
import json
from PIL import Image

# 设置目录路径和 JSON 文件路径
root_dir = 'F:\\JCstation.github.io\\JunYi_site\\JC\\img\\gallery'
json_file_path = os.path.join(root_dir, 'images.json')

# 获取文件夹中的所有图片信息
def get_image_info(image_path):
    with Image.open(image_path) as img:
        width, height = img.size
    return width, height

def get_category(folder_name, width, height):
    # 设定大图像的标准
    large_image_threshold = 500  # 可以根据需要调整

    if width > large_image_threshold or height > large_image_threshold:
        if width > height:
            # 宽度大于高度的图像为长图
            return f"gi-long {folder_name}"
        else:
            # 高度大于宽度的图像为大图
            return f"gi-big {folder_name}"
    else:
        if width < height:
            # 宽度小于高度的标准图像
            return f"gi-long {folder_name}"
        else:
            # 其他标准图像
            return folder_name

# 遍历目录并更新 JSON 文件
def update_json():
    image_list = []

    # 遍历所有子文件夹
    for folder_name in os.listdir(root_dir):
        folder_path = os.path.join(root_dir, folder_name)
        if os.path.isdir(folder_path):
            for file_name in os.listdir(folder_path):
                if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                    image_path = os.path.join(folder_path, file_name)
                    width, height = get_image_info(image_path)
                    category = get_category(folder_name, width, height)
                    
                    image_info = {
                        "image": os.path.join("img/gallery", folder_name, file_name).replace("\\", "/"),
                        "category": get_category(folder_name, width, height),
                        "authorImage": "img/gallery/author.jpg",
                        "authorName": "Arthur Rose"
                    }
                    image_list.append(image_info)
                    

    # 写入 JSON 文件，确保中文字符正常显示
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(image_list, f, indent=4, ensure_ascii=False)
    print(f"Updated JSON file at: {json_file_path}")

if __name__ == "__main__":
    update_json()
