import os
import random

def generate_html_image_paths(folder_path):
    html_template = '<a href="{image_path}" data-filter="{data_filter}"><img src="{image_path}" alt="{image_alt}"></a>'

    image_paths = []
    image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.bmp')  # 常见图像文件扩展名

    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(image_extensions):
                image_name = file
                image_alt = "00" + str(random.randint(0, 999998)).zfill(6)  # 生成以 "00" 开头的六位随机数字作为 alt 属性的值
                data_filter = os.path.relpath(root, folder_path)
                image_path = os.path.join("assets", "img", "preview", "fulls", data_filter, image_name).replace("\\", "/")
                html_path = html_template.format(image_path=image_path, data_filter=data_filter, image_alt=image_alt)
                image_paths.append(html_path)

    return image_paths

def save_html_file(image_paths, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('<html>\n')
        f.write('<body>\n')

        for path in image_paths:
            f.write(path + '\n')

        f.write('</body>\n')
        f.write('</html>\n')

folder_path = r"B:\JCstation.github.io\JunYi_site\assets\img\preview\fulls"  # 图像文件夹路径
output_file = "image_paths.html"  # 输出HTML文件路径

image_paths = generate_html_image_paths(folder_path)
save_html_file(image_paths, output_file)

print("HTML文件已生成：", output_file)
