import os
import re
from PIL import Image

# Replace with the actual folder path
base_folder = r"F:\代码\JCstation.github.io\JunYi_site\KLAND"

# Create an HTML file to write the output
output_file_path = "product_information.html"
with open(output_file_path, "w", encoding="utf-8") as output_file:
    # Write the HTML header
    output_file.write("<!DOCTYPE html>\n<html lang='en'>\n<head>\n")
    output_file.write("<meta charset='UTF-8'>\n")
    output_file.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n")
    output_file.write("<title>Product Information</title>\n</head>\n<body>\n")

    # Iterate through subfolders
    for folder_name in os.listdir(base_folder):
        folder_path = os.path.join(base_folder, folder_name)
        if os.path.isdir(folder_path):
            # Get product ID from the folder name
            product_id = folder_name

            # Initialize the template for each subfolder
            template = f"<h2>产品信息</h2>\n<p>产品ID: {product_id}</p>\n"

            # Iterate through files in the subfolder
            for file_name in os.listdir(folder_path):
                # Check if the file is an HTML file and contains "scene" in its name
                if file_name.endswith(".html") and "scene" in file_name:
                    mview_file = os.path.join(folder_path, file_name)

                    # Get product name from the file name
                    product_name = os.path.splitext(file_name)[0]

                    # Identify the QR code image
                    qrcode_path = os.path.join(folder_path, f"{product_name}_qrcode.jpg")

                    # Update the template for each file
                    template += (
                        f"<p>产品名称: {product_name}</p>\n"
                        f"<p>URL链接: <a href='{mview_file}'>链接</a></p>\n"
                        f"<img src='{qrcode_path}' alt='二维码' class='right-image'>\n"
                    )

            # Write the template for the subfolder to the HTML file
            output_file.write(template)

    # Write the HTML footer
    output_file.write("</body>\n</html>")

print(f"HTML file '{output_file_path}' generated successfully.")
