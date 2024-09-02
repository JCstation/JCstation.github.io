import os
import shutil

def create_folders_for_images(image_folder):
    # 遍历当前文件夹中的所有文件
    for filename in os.listdir(image_folder):
        file_path = os.path.join(image_folder, filename)

        # 确保是图片文件
        if os.path.isfile(file_path) and filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            # 创建文件夹组名称（不包括文件扩展名）
            folder_name = os.path.splitext(filename)[0]
            folder_path = os.path.join(image_folder, folder_name)

            # 创建新的文件夹组
            os.makedirs(os.path.join(folder_path, '3D'), exist_ok=True)
            os.makedirs(os.path.join(folder_path, 'thumbnails'), exist_ok=True)

            # 复制图片到新创建的文件夹中
            shutil.copy(file_path, os.path.join(folder_path, filename))

            print(f"Created folder group for image: {filename}")
        else:
            print(f"Skipped non-image file: {filename}")

# 使用示例
current_directory = os.getcwd()  # 获取当前工作目录
create_folders_for_images(current_directory)  # 创建文件夹组
