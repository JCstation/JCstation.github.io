import http.server
import socketserver
import logging
import os
from tkinter import filedialog, Tk
import json
from threading import Thread
import subprocess
from subprocess import Popen, PIPE, STDOUT
import traceback
from ruamel.yaml import YAML, scalarstring
import shlex


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        logging.info(f"Received GET request for {self.path}")

        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            # Insert your HTML content here
            html_content = """
            <!DOCTYPE html>
            <html>
            <head>
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>LORA Training UI</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
                <link href="https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=swap" rel="stylesheet">
                <style>
                    /* Custom styles can be added here */
                </style>
                <script>
                async function updateFilePath(inputId, element) {
                    // Send request to Python backend
                    const response = await fetch('/select-folder');
                    const data = await response.json();

                    if (data.folderNames.length > 0) {
                        // Update folder names in the HTML
                        data.folderNames.forEach((folderName, index) => {
                            if (document.getElementById(\`Image-Folder\${index + 1}\`)) {
                                document.getElementById(\`Image-Folder\${index + 1}\`).value = folderName;
                                // Update labels and values as per your logic
                                // ...
                            }
                        });
                    } else {
                        alert(data.message); // Show error message if needed
                    }
                }
                </script>
            </head>
            <body class="bg-dark text-white font-inter">
            <button id="print-data-btn">Print Data</button>

                <div class="container mx-auto p-4" style="text-align: right;">
                    <div class="items-right mb-4">
                        <div class="items-right">
                            <label for="input-Json" class="text-sm font-bold mb-1 mr-2">LoadJson:</label>
                            <input type="text" id="input-Json" class="p-2 rounded-l bg-gray-700" style="width: 300px;" placeholder="Select Json to load" readonly>
                            <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r" onclick="document.getElementById('input-save-Json').click();">LOAD</button>
                            <input type="file" id="input-save-Json" style="display: none;" onchange="updateFilePath('input-Json', this)"/>
                        <button id="saveButton" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2">SAVE</button>
                        </div>           
                    </div>
                </div>

                <!-- Main Tabs -->
                <ul class="nav nav-tabs" id="mainTabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="textslider-tab" data-toggle="tab" href="#textslider" role="tab" aria-controls="textslider" aria-selected="true">TextSliders</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="imageslider-tab" data-toggle="tab" href="#imageslider" role="tab" aria-controls="imageslider" aria-selected="false">ImageSliders</a>
                    </li>
                </ul>

                <div class="tab-content bg-secondary" id="mainTabContent">
                    <div class="model-selector pt-3" style="text-align: center;">
                        <label for="model-select">Choose a model:</label>
                        <select id="model-select" name="model" onchange="updateUI(this.value)" style="color: black;">
                        <option value="sd">SD 1.5/2.1</option>
                        <option value="sdxl">SDXL</option>
                        </select>
                    </div>
                        <!-- ImageSliders Dataset -->
                        <div id="dataset-section">
                        <div class="tab-content bg-secondary" id="mainTabContent">
                        <div class="model-selector pt-3" style="text-align: center;">
                        <label for="input-Dataset" class="text-sm font-bold mb-1 mr-2">Dataset Folder:</label>
                        <button id="actual-examine-button-id" class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r">Examine</button>
                        <div id="display-dataset-path"></div>
                        <div class="flex" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; margin-bottom: 20px;">
                            <div style="margin-left: 5px; margin-right: 5px;">
                                <!-- Sub-Folders -->
                                <label id="Label-Image-Folder5" for="Image-Folder5" class="text-sm font-bold mb-1">Folder5:</label><br>
                                <input type="text" id="Image-Folder5" name="Folder5" class="p-2 rounded bg-gray-700" style="width: 100px;" placeholder="Strength">
                            </div>
                            <div style="margin-left: 5px; margin-right: 5px;">
                                <label id="Label-Image-Folder3" for="Image-Folder3" class="text-sm font-bold mb-1">Folder3:</label><br>
                                <input type="text" id="Image-Folder3" name="Folder3" class="p-2 rounded bg-gray-700" style="width: 100px;" placeholder="Strength">
                            </div>
                            <div style="margin-left: 5px; margin-right: 5px;">
                                <label id="Label-Image-Folder1" for="Image-Folder1" class="text-sm font-bold mb-1">Folder1:</label><br>
                                <input type="text" id="Image-Folder1" name="Folder1" class="p-2 rounded bg-gray-700" style="width: 100px;" placeholder="Strength">
                            </div>
                            <div style="margin-left: 5px; margin-right: 5px;">
                                <label id="Label-Image-Folder2" for="Image-Folder2" class="text-sm font-bold mb-1">Folder2:</label><br>
                                <input type="text" id="Image-Folder2" name="Folder2" class="p-2 rounded bg-gray-700" style="width: 100px;" placeholder="Strength">
                            </div>
                            <div style="margin-left: 5px; margin-right: 5px;">
                                <label id="Label-Image-Folder4" for="Image-Folder4" class="text-sm font-bold mb-1">Folder4:</label><br>
                                <input type="text" id="Image-Folder4" name="Folder4" class="p-2 rounded bg-gray-700" style="width: 100px;" placeholder="Strength">
                            </div>
                            <div style="margin-left: 5px; margin-right: 5px;">
                                <label id="Label-Image-Folder6" for="Image-Folder6" class="text-sm font-bold mb-1">Folder6:</label><br>
                                <input type="text" id="Image-Folder6" name="Folder6" class="p-2 rounded bg-gray-700" style="width: 100px;" placeholder="Strength">
                            </div>
                        </div>
                        </div>
                        </select>
                    </div>
                    </div>
                        <div class="tab-content" id="textSliderTabContent">
                            <!-- SD 1.5/2.1 Tab Pane -->
                            <div class="tab-pane fade show active" id="textslider-sd" role="tabpanel" aria-labelledby="textslider-sd-tab">
                                <!-- Prompts Section -->
                                <h2 class="text-xl font-bold mb-2">Prompts</h2>
                                <div class="mb-4">

                                    <!-- Tabs navigation -->
                                    <div id="buttons" class="tabs flex border-b">
                                        <button id="button1" class="tablinks px-4 py-2 text-sm font-medium text-black-500 hover:text-blue-600 focus:outline-none" onclick="openTab(event, 'Tab1')">1</button>
                                        <button id="button2" class="tablinks px-4 py-2 text-sm font-medium text-black-500 hover:text-blue-600 focus:outline-none" onclick="openTab(event, 'Tab2')">2</button>
                                        <button id="button3" class="tablinks px-4 py-2 text-sm font-medium text-black-500 hover:text-blue-600 focus:outline-none" onclick="openTab(event, 'Tab3')">3</button>
                                        <button id="button4" class="tablinks px-4 py-2 text-sm font-medium text-black-500 hover:text-blue-600 focus:outline-none" onclick="openTab(event, 'Tab4')">4</button>
                                        <span id="buttonText" style="color: rgba(255, 255, 255, 0.5); display: block;">if you need more than one prompt use these tabs</span>
                                    </div>
                                    
                                    <!-- Tab 1 content -->
                                    <div id="Tab1" class="tabcontent">
                                        <div class="grid grid-cols-1 gap-4 mb-4 bg-dark" style="margin-left:20px; margin-right:20px; padding-left: 20px; padding-right: 20px; padding-top: 10px;">
                                            <div class="flex flex-col">
                                                <label for="input-target1" class="text-sm font-bold mb-1">target:</label>
                                                <input type="text" id="input-target1" name="target" class="p-2 rounded bg-gray-700" placeholder="'Landscape' - what word for erasing the positive concept from">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-positive1" class="text-sm font-bold mb-1">positive:</label>
                                                <input type="text" id="input-positive1" name="positive" class="p-2 rounded bg-gray-700" placeholder="'Landscape, snowy' - concept to erase/enhance">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-unconditional1" class="text-sm font-bold mb-1">unconditional:</label>
                                                <input type="text" id="input-unconditional1" name="unconditional" class="p-2 rounded bg-gray-700" placeholder="Landscape, arid' - word to take the difference from the positive concept">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-neutral1" class="text-sm font-bold mb-1">neutral:</label>
                                                <input type="text" id="input-neutral1" name="neutral" class="p-2 rounded bg-gray-700" placeholder="'Landscape' - starting point for conditioning the target">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-guidance-scale1" class="text-sm font-bold mb-1">guidance scale:</label>
                                                <input type="text" id="input-guidance-scale1" name="guidance_scale" class="p-2 rounded bg-gray-700" value="4">
                                            </div> 
                                            <!-- Action dropdown -->                             
                                            <div class="mb-4">
                                                <label for="input-Action1" class="block text-sm font-medium">Action:</label>
                                                <select id="input-Action1" class="dropdown block w-full mt-1 p-2.5 rounded text-dark" style="width: 30%;">
                                                <option value="enhance" class="text-dark">enhance</option>
                                                <option value="erase" class="text-dark">erase</option>									
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Tab 2 content -->
                                    <div id="Tab2" class="tabcontent" style="display: none;">
                                        <div class="grid grid-cols-1 gap-4 mb-4 bg-dark" style="margin-left:20px; margin-right:20px; padding-left: 20px; padding-right: 20px; padding-top: 10px;">
                                            <div class="flex flex-col">
                                                <label for="input-target2" class="text-sm font-bold mb-1">target:</label>
                                                <input type="text" id="input-target2" name="target" class="p-2 rounded bg-gray-700" placeholder="'Landscape' - what word for erasing the positive concept from">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-positive2" class="text-sm font-bold mb-1">positive:</label>
                                                <input type="text" id="input-positive2" name="positive" class="p-2 rounded bg-gray-700" placeholder="'Landscape, snowy' - concept to erase/enhance">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-unconditional2" class="text-sm font-bold mb-1">unconditional:</label>
                                                <input type="text" id="input-unconditional2" name="unconditional" class="p-2 rounded bg-gray-700" placeholder="Landscape, arid' - word to take the difference from the positive concept">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-neutral2" class="text-sm font-bold mb-1">neutral:</label>
                                                <input type="text" id="input-neutral2" name="neutral" class="p-2 rounded bg-gray-700" placeholder="'Landscape' - starting point for conditioning the target">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-guidance-scale2" class="text-sm font-bold mb-1">guidance scale:</label>
                                                <input type="text" id="input-guidance-scale2" name="guidance_scale" class="p-2 rounded bg-gray-700" value="4">
                                            </div> 
                                            <!-- Action dropdown -->                             
                                            <div class="mb-4">
                                                <label for="input-Action2" class="block text-sm font-medium">Action:</label>
                                                <select id="input-Action2" class="dropdown block w-full mt-1 p-2.5 rounded text-dark" style="width: 30%;">
                                                <option value="enhance" class="text-dark">enhance</option>
                                                <option value="erase" class="text-dark">erase</option>									
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Tab 3 content -->
                                    <div id="Tab3" class="tabcontent" style="display: none;">
                                        <div class="grid grid-cols-1 gap-4 mb-4 bg-dark" style="margin-left:20px; margin-right:20px; padding-left: 20px; padding-right: 20px; padding-top: 10px;">
                                            <div class="flex flex-col">
                                                <label for="input-target3" class="text-sm font-bold mb-1">target:</label>
                                                <input type="text" id="input-target3" name="target" class="p-2 rounded bg-gray-700" placeholder="'Landscape' - what word for erasing the positive concept from">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-positive3" class="text-sm font-bold mb-1">positive:</label>
                                                <input type="text" id="input-positive3" name="positive" class="p-2 rounded bg-gray-700" placeholder="'Landscape, snowy' - concept to erase/enhance">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-unconditional3" class="text-sm font-bold mb-1">unconditional:</label>
                                                <input type="text" id="input-unconditional3" name="unconditional" class="p-2 rounded bg-gray-700" placeholder="Landscape, arid' - word to take the difference from the positive concept">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-neutral3" class="text-sm font-bold mb-1">neutral:</label>
                                                <input type="text" id="input-neutral3" name="neutral" class="p-2 rounded bg-gray-700" placeholder="'Landscape' - starting point for conditioning the target">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="input-guidance-scale3" class="text-sm font-bold mb-1">guidance scale:</label>
                                                <input type="text" id="input-guidance-scale3" name="guidance_scale" class="p-2 rounded bg-gray-700" value="4">
                                            </div> 
                                            <!-- Action dropdown -->                             
                                            <div class="mb-4">
                                                <label for="input-Action3" class="block text-sm font-medium">Action:</label>
                                                <select id="input-Action3" class="dropdown block w-full mt-1 p-2.5 rounded text-dark" style="width: 30%;">
                                                <option value="enhance" class="text-dark">enhance</option>
                                                <option value="erase" class="text-dark">erase</option>									
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Tab 4 content -->
                                    <div id="Tab4" class="tabcontent" style="display: none;">
                                        <div class="grid grid-cols-1 gap-4 mb-4 bg-dark" style="margin-left:20px; margin-right:20px; padding-left: 20px; padding-right: 20px; padding-top: 10px;">
                                            <div class="flex flex-col">
                                                <label for="input-target4" class="text-sm font-bold mb-1">target:</label>
                                                <input type="text" id="input-target4" name="target" class="p-2 rounded bg-gray-700" placeholder="'Landscape' - what word for erasing the positive concept from">
                                                </div>
                                                <div class="flex flex-col">
                                                <label for="input-positive4" class="text-sm font-bold mb-1">positive:</label>
                                                <input type="text" id="input-positive4" name="positive" class="p-2 rounded bg-gray-700" placeholder="'Landscape, snowy' - concept to erase/enhance">
                                                </div>
                                                <div class="flex flex-col">
                                                <label for="input-unconditional4" class="text-sm font-bold mb-1">unconditional:</label>
                                                <input type="text" id="input-unconditional4" name="unconditional" class="p-2 rounded bg-gray-700" placeholder="Landscape, arid' - word to take the difference from the positive concept">
                                                </div>
                                                <div class="flex flex-col">
                                                <label for="input-neutral4" class="text-sm font-bold mb-1">neutral:</label>
                                                <input type="text" id="input-neutral4" name="neutral" class="p-2 rounded bg-gray-700" placeholder="'Landscape' - starting point for conditioning the target">
                                                </div>
                                                <div class="flex flex-col">
                                                <label for="input-guidance-scale4" class="text-sm font-bold mb-1">guidance scale:</label>
                                                <input type="text" id="input-guidance-scale4" name="guidance_scale" class="p-2 rounded bg-gray-700" value="4">
                                                </div> 
                                            <!-- Action dropdown -->                             
                                            <div class="mb-4">
                                                <label for="input-Action4" class="block text-sm font-medium">Action:</label>
                                                <select id="input-Action4" class="dropdown block w-full mt-1 p-2.5 rounded text-dark" style="width: 30%;">
                                                <option value="enhance" class="text-dark">enhance</option>
                                                <option value="erase" class="text-dark">erase</option>									
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <!-- Global Prompt -->                        
                                    <div class="flex">
                                        <div class="flex flex-col" style="margin: 20px; margin-top: 0px !important;">
                                        <label for="input-resolution" class="text-sm font-bold mb-1">Resolution:</label>
                                        <input type="text" id="input-resolution" name="resolution" class="p-2 rounded bg-gray-700" value="512">
                                        </div>
                                        
                                        <div class="flex flex-col" style="margin: 20px; margin-top: 0px !important;">
                                        <label for="input-batch-size" class="text-sm font-bold mb-1">BATCH size:</label>
                                        <input type="text" id="input-batch-size" name="batch_size" class="p-2 rounded bg-gray-700" value="1">
                                        </div>
                                        <!-- Checkbox for Dynamic Resolution -->
                                        <div class="flex items-center mb-4" style="margin-left: 30px;">
                                        <input type="checkbox" id="input-dynamic-resolution" name="dynamic_resolution" class="checkbox" style="transform: scale(2);" />
                                        <label for="input-dynamic-resolution" class="text-sm font-bold" style="margin-left: 10px;">Dynamic Resolution</label> 
                                        </div>
                                    </div>
                                    
                                    <!-- Config Section -->
                                    <div class="mb-4">
                                        <h2 class="text-xl font-bold mb-2">Config</h2>
                                        <!-- CheckPoint FileDialog -->
                                        <div class="grid grid-cols-1 gap-4 mb-4 bg-dark" style="margin-left:20px; margin-right:20px; padding-left: 20px; padding-right: 20px; padding-top: 10px;">
                                            <h1 style="font-size: 30px;">Model</h1>
                                            <div class="flex flex-col">
                                                <label for="input-checkpoint-path" class="text-sm font-bold mb-1">Checkpoint:</label>
                                                <div class="flex">
                                                    <input type="text" id="input-checkpoint-path" class="p-2 rounded-l bg-gray-700 flex-grow" placeholder="Select checkpoint to train on 'SD 1.5/2.1'" readonly>
                                                    <button id="input-checkpoint-file" class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r";>Examine</button>
                                                </div>
                                            </div>
                                            <span style="color: rgba(255, 255, 255, 0.5); display: block; text-align: center;">Don't input any to use the last one you saved</span>
                                            <!-- v2 Vpred Checkbox -->
                                            <div class="flex">
                                                <div class="flex items-center mb-4" style="margin-left: 30px;">
                                                    <input type="checkbox" id="input-v2" class="checkbox" style="transform: scale(2);" />
                                                    <label for="input-v2" class="text-sm font-bold" style="margin-left: 10px;">v2</label>
                                                </div>
                                                <div class="flex items-center mb-4" style="margin-left: 30px;">
                                                    <input type="checkbox" id="input-vpred" class="checkbox" style="transform: scale(2);" />
                                                    <label for="input-vpred" class="text-sm font-bold" style="margin-left: 10px;">v_Pred</label>
                                                </div>
                                            </div>
                                            
                                            <!-- Dropdowns Network -->

                                            <h1 style="font-size: 30px;">Network</h1>
                                            <div class="flex">
                                            <div class="mb-4" style="margin-right: 20px;">
                                                <label for="input-type-scheduler" class="block text-sm font-medium">type:</label>
                                                <select id="input-type-scheduler" class="dropdown block w-full mt-1 p-2.5 rounded text-dark">
                                                <option value="c3lier" class="text-dark">c3lier</option>
                                                <option value="lierla" class="text-dark">lierla</option>
                                                </select>
                                            </div>
                                            
                                            <div class="mb-4">
                                                <label for="input-training-method" class="block text-sm font-medium">training method:</label>
                                                <select id="input-training-method" class="dropdown block w-full mt-1 p-2.5 rounded text-dark">
                                                <option value="noxattn" class="text-dark">noxattn</option>
                                                <option value="xattn" class="text-dark">xattn</option>
                                                <option value="full" class="text-dark">full</option>
                                                </select>
                                            </div>
                                            </div>


                                            <!-- Sliders for Rank and Alpha -->
                                            <div class="flex flex-col mb-4">
                                            <label class="text-sm font-bold mb-1">Rank:</label>
                                            <input type="range" class="input-range" id="rank-slider" min="1" max="100" value="4" oninput="updateSliderValue(this, 'rank-value')">
                                            <span id="rank-value" class="text-sm">4</span>
                                            </div>
                                            <div class="flex flex-col mb-4">
                                            <label class="text-sm font-bold mb-1">Alpha:</label>
                                            <input type="range" class="input-range" id="alpha-slider" min="1" max="100" value="1" oninput="updateSliderValue(this, 'alpha-value')">
                                            <span id="alpha-value" class="text-sm">1</span>
                                            </div>

                                            <h1 style="font-size: 30px;">Train</h1>
                                            <div class="flex flex-col" style="margin-right: 20px;">
                                            <label for="input-precision" class="text-sm font-bold mb-1">precision</label>
                                            <input type="text" id="input-precision" name="precision" class="p-2 rounded bg-gray-700" style="width: 30%;" value="bfloat16"> 
                                            <span style="color: rgba(255, 255, 255, 0.5);" class="additional-info">'fp32', 'fp16', 'bf16', 'float32', 'float16' are also possible</span>
                                            </div>
                                            <div class="flex">
                                            <div class="mb-4" style="margin-right: 20px;">
                                                <label for="input-optimizer" class="block text-sm font-medium">Optimizer</label>
                                                <select id="input-optimizer" name="optimizer" class="dropdown block w-full mt-1 p-2.5 rounded text-dark">
                                                <option value="AdamW" class="text-dark">AdamW</option>
                                                <option value="Prodigy" class="text-dark">Prodigy</option>
                                                <option value="adam" class="text-dark">adam</option>
                                                <option value="lion" class="text-dark">lion</option>
                                                </select>
                                            </div>
                                            <div class="mb-4" style="margin-right: 20px;">
                                                <label for="input-noise-scheduler" class="block text-sm font-medium">Noise Scheduler</label>
                                                <select id="input-noise-scheduler" name="noise_scheduler" class="dropdown block w-full mt-1 p-2.5 rounded text-dark">
                                                <option value="ddpm" class="text-dark">ddpm</option>
                                                <option value="lms" class="text-dark">lms</option>
                                                <option value="euler_a" class="text-dark">euler_a</option>
                                                </select>
                                            </div>
                                            <div class="mb-4">
                                                <label for="input-lr-scheduler" class="block text-sm font-medium">LR Scheduler</label>
                                                <select id="input-lr-scheduler" name="lr_scheduler" class="dropdown block w-full mt-1 p-2.5 rounded text-dark">
                                                <option value="constant" class="text-dark">constant</option>
                                                <option value="cosine" class="text-dark">cosine</option>
                                                <option value="linear" class="text-dark">linear</option>
                                                </select>
                                            </div>
                                            </div>
                                            <!-- FIN 3 Dropdowns -->
                                            
                                            <!-- Text input for Learning Rate iterations maxdenoise etc -->
                                            <div class="flex">
                                                <div>
                                                <label for="input-iterations" class="text-sm font-bold mb-1">Iterations:</label>
                                                <input type="text" id="input-iterations" name="iterations" class="p-2 rounded bg-gray-700" style="width: 30%;" value="1000">
                                                </div>
                                                <div style="margin-left: 20px;">
                                                <label for="input-max-denoising" class="text-sm font-bold mb-1">Max denoising steps:</label>
                                                <input type="text" id="input-max-denoising" name="max_denoising" class="p-2 rounded bg-gray-700" style="width: 30%;" value="50">
                                                </div>
                                            </div>
                                            <div class="flex">
                                                <div>
                                                <label for="input-learning-rate" class="text-sm font-bold mb-1">Learning rate:</label>
                                                <input type="text" id="input-learning-rate" name="learning_rate" class="p-2 rounded bg-gray-700" style="width: 30%;" value="0.0002">
                                                </div>
                                                <div class="flex items-center mb-4" style="margin-left: 30px;">
                                                    <input type="checkbox" id="input-use-xformers" name="use_xformers" class="checkbox" style="transform: scale(2);" checked />
                                                    <label for="input-use-xformers" class="text-sm font-bold" style="margin-left: 10px;">Use Xformers</label>
                                                </div>
                                            </div>
                                                                            
                                            <!-- File Dialog for Save Path -->
                                            <div class="flex flex-col mb-4">
                                                <h1 style="font-size: 30px; margin-bottom: 10px;">Save</h1>
                                                <div class="flex flex-col" style="margin-bottom: 20px;">
                                                <label for="input-name" class="text-sm font-bold mb-1">Name:</label>
                                                <input type="text" id="input-name" name="name" class="p-2 rounded bg-gray-700" placeholder="Name for your slider LORA" autocomplete="off">
                                                </div>
                                                <div class="flex" style="margin-bottom: 20px;">
                                                   Save path:
                                                   <input type="text" id="input-save-path" class="p-2 rounded-l bg-gray-700 flex-grow" placeholder="Select where you want to save your slider LORA" readonly>
                                                   <button id="examine-save-path-button" class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r" onclick="document.getElementById('input-file-dialog').click();">Examine</button>
                                                </div>
                                                <span style="color: rgba(255, 255, 255, 0.5); display: block; text-align: center;">Don't input any to use the last one you saved</span>
                                                <div class="flex">

                                                    <!-- Container for the text input and its description -->
                                                    <div style="margin-bottom: 20px;">
                                                    <label for="input-save-every-iterations" class="text-sm font-bold mb-1">Save every "x" iterations:</label>
                                                    <input type="text" id="input-save-every-iterations" name="save_every_iterations" class="p-2 rounded bg-gray-700 mb-1" value="500">
                                                    <div>
                                                        <span style="color: rgba(255, 255, 255, 0.5); display: block;">Iterations/ x = amount of LORAs that will be saved</span>
                                                    </div>
                                                    </div>
                                                    
                                                    <!-- Checkbox for 'Use Wandb' -->
                                                    <div class="flex items-center mb-4" style="margin-left: 30px;">
                                                        <input type="checkbox" id="input-use-wandb" name="use_wandb" class="checkbox" style="transform: scale(2);" />
                                                        <label for="input-use-wandb" class="text-sm font-bold" style="margin-left: 10px;">Use Wandb</label>
                                                    </div>
                                                    
                                                    <!-- Checkbox for 'Verbose' -->
                                                    <div class="flex items-center mb-4" style="margin-left: 30px;">
                                                    <input type="checkbox" id="input-verbose" name="verbose" class="checkbox" style="transform: scale(2);" />
                                                    <label for="input-verbose" class="text-sm font-bold" style="margin-left: 10px;">Verbose</label>
                                                    </div>
       
                                                    <!-- Checkbox for 'SafeTensors' -->
                                                     
                                                    <div class="flex items-center mb-4" style="margin-left: 300px;">
                                                        <input type="checkbox" id="input-safetensors" name="verbose" class="checkbox" style="transform: scale(2);" checked />
                                                        <label for="input-safetensors" class="text-sm font-bold" style="margin-left: 20px;">Train .Safetensors</label>
                                                    </div> 
                                                </div>
                                                                                    
                                            </div>                                
                                            <!-- Action Buttons -->
                                            <div class= "flex justify-end space-x-2 mt-4">
                                                <span id="buttonText" style="color: rgba(255, 255, 255, 0.7); display: block;">Make sure you SAVE PARAMETERS before you hit "train" </span>
                                            </div>
                                            <div class="flex justify-end space-x-2 mt-4">
                                                <button id="btn-save-parameters" class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">Save Parameters</button>
                                                <button id="btn-train" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">Train</button>
                                                <button id="btn-Test" class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Send to Test</button>
                                            </div>
            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- SDXL Tab Pane -->
                            <div class="tab-pane fade" id="textslider-sdxl" role="tabpanel" aria-labelledby="textslider-sdxl-tab">
                                <!-- Duplicate the Config section for SDXL -->
                            </div>
                        </div>
                    </div>
                    <!-- ImageSlider Tab Pane -->
                    <div class="tab-pane fade" id="imageslider" role="tabpanel" aria-labelledby="imageslider-tab">
                        <!-- Duplicate the structure from TextSliders for ImageSliders -->
                    </div>
                </div>
            </div>
            <!-- Include Bootstrap's JS for tab functionality -->
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.9/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            <script>

                // Update file path in text box to indicate a folder has been selected
                function updateFilePath(inputId, fileInput) {
                    var pathInput = document.getElementById(inputId);
                    if (fileInput.files.length > 0) {
                        // Since we can't get the full directory path, we'll just indicate that a folder has been selected
                        pathInput.value = "Folder selected"; // or you could use fileInput.files.length + " files selected";
                    } else {
                        pathInput.value = ""; // Clear the field if no folder is selected
                    }
                }
                

                //textsliders imagesliders
                document.addEventListener("DOMContentLoaded", function() {
                    // Define elements
                    var datasetSection = document.getElementById('dataset-section');
                    var tabs = [document.getElementById('button2'), document.getElementById('button3'), document.getElementById('button4'), document.getElementById('buttonText')];

                    // Function to toggle the display
                    function toggleDisplay(showDataset, showTabs) {
                        datasetSection.style.display = showDataset ? 'block' : 'none';
                        tabs.forEach(function(tab) {
                            tab.style.display = showTabs ? 'block' : 'none';
                        });
                    }

                    // Bind click events to your tabs to toggle the display
                    document.getElementById('textslider-tab').addEventListener('click', function() {
                        toggleDisplay(false, true); // Hide dataset, show tabs
                    });

                    document.getElementById('imageslider-tab').addEventListener('click', function() {
                        toggleDisplay(true, false); // Show dataset, hide tabs
                    });

                    // Initialize the UI as textsliders active
                    toggleDisplay(false, true);
                });

                function toggleDisplay(showDataset, showTabs) {
                    console.log('Toggling display. Dataset:', showDataset, 'Tabs:', showTabs); // This should log the correct values when the function is called
                    datasetSection.style.display = showDataset ? 'block' : 'none';
                    tabs.forEach(function(tab) {
                        console.log(tab.id, 'display:', showTabs ? 'block' : 'none'); // This should log each tab's ID and intended display style
                        tab.style.display = showTabs ? 'block' : 'none';
                    });
                }



                //Changing Defaults
                function updateUI(model) {
                    if (model === 'sd') {
                        // Set values for SD 1.5/2.1
                        document.getElementById('input-resolution').value = '512';
                        document.getElementById('btn-train').textContent = 'Train';
                        // Update other input values and placeholders as needed
                    } else if (model === 'sdxl') {
                        // Set values for SDXL
                        document.getElementById('input-resolution').value = '1024';
                        document.getElementById('btn-train').textContent = 'Train XL';
                        // Update other input values and placeholders as needed
                    }
                    }

                    // Update Folder Path
                    function updateFilePath(inputId, inputElement) {
                        var files = inputElement.files;
                        if (files.length > 0) {
                            // Assuming the directory name is the name of the first file's `webkitRelativePath` attribute
                            var folderName = files[0].webkitRelativePath.split('/')[0];
                            document.getElementById(inputId).value = folderName;
                        }
                        }


                // Preserve the state when changing tabs
                $(document).ready(function() {
                    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                        localStorage.setItem('activeTab', $(e.target).attr('href'));
                    });
                    var activeTab = localStorage.getItem('activeTab');
                    if (activeTab) {
                        $('#mainTabs a[href="' + activeTab + '"]').tab('show');
                    }
                });
                
                // Tab for prompts
                function openTab(evt, tabName) {
                    var i, tabcontent, tablinks;

                    tabcontent = document.getElementsByClassName("tabcontent");
                    for (i = 0; i < tabcontent.length; i++) {
                        tabcontent[i].style.display = "none";
                    }

                    tablinks = document.getElementsByClassName("tablinks");
                    for (i = 0; i < tablinks.length; i++) {
                        tablinks[i].style.backgroundColor = "";
                        tablinks[i].classList.remove("active"); // Remove the active class
                    }

                    document.getElementById(tabName).style.display = "block";
                    if (evt.currentTarget) {
                        evt.currentTarget.className += " active";
                        evt.currentTarget.style.backgroundColor = "#ccc"; // Set a different color for the active tab
                    } else {
                        // Directly manipulate the first tab if no event is provided
                        document.getElementById("Tab1").style.display = "block";
                        document.getElementsByClassName("tablinks")[0].className += " active";
                        document.getElementsByClassName("tablinks")[0].style.backgroundColor = "#ccc";
                    }
                }

                // Call openTab for the first tab by default
                document.addEventListener("DOMContentLoaded", function() {
                    openTab({}, 'Tab1');
                });

                // Collect Data from inputs
                document.querySelector('.bg-blue-500').addEventListener('click', () => {
                // Collect data from inputs
                    let promptData = {
                        target: document.getElementById('input-target1').value,
                        positive: document.getElementById('input-positive1').value,
                        unconditional: document.getElementById('input-unconditional1').value,
                        neutral: document.getElementById('input-neutral1').value,
                        guidance_scale: document.getElementById('input-guidance-scale1').value
                    };

                    // Use fetch to send the data to the Flask backend
                    fetch('/collect-data', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(promptData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Handle the response from the server
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });

                
                // Update slider value display
                function updateSliderValue(slider) {
                    var valueDisplay = slider.id === 'alpha-slider' ? document.getElementById('alpha-value') : document.getElementById('rank-value');
                    valueDisplay.textContent = slider.value;
                }

                // Attach this new function to the "Examine" button for the save path
                document.getElementById('examine-save-path-button').addEventListener('click', function() {
                    updateSavePath('input-save-path');
                });

                //Functionalities for code

                
                //script for imagesliders Folders
                let selectedFolderPath = '';
                async function requestFolderSelection() {
                    const response = await fetch('/select-folder');
                    const data = await response.json();

                    if (data.folderNames.length > 0) {
                        selectedFolderPath = data.folderPath;
                        document.getElementById('display-dataset-path').textContent = "Selected Path: " + selectedFolderPath;

                        // Update folder names and values
                        data.folderNames.forEach((folderName, index) => {
                            const label = document.getElementById(`Label-Image-Folder${index + 1}`);
                            if (label) {
                                label.textContent = folderName + ':';
                            }
                            const folderInput = document.getElementById(`Image-Folder${index + 1}`);
                            if (folderInput) {
                                folderInput.value = (index % 2 === 0) ? (index / 2 + 1).toString() : '-' + (Math.floor(index / 2) + 1).toString();
                            }
                        });

                        // Set remaining fields to 'none'
                        for (let i = data.folderNames.length + 1; i <= 6; i++) {
                            const label = document.getElementById(`Label-Image-Folder${i}`);
                            if (label) {
                                label.textContent = 'none:';
                            }
                            const folderInput = document.getElementById(`Image-Folder${i}`);
                            if (folderInput) {
                                folderInput.value = 'none';
                            }
                        }
                    } else {
                        alert(data.message);
                    }
                }

                // Outside of any function
                const examineButton = document.getElementById('actual-examine-button-id');
                if (examineButton) {
                    examineButton.addEventListener('click', requestFolderSelection);
                } else {
                    console.error('Examine button not found');
                }


                let selectedCheckpointPath = '';

                async function requestCheckpointFileSelection() {
                    try {
                        const response = await fetch('/select-checkpoint-file');
                        // Check if the response is OK (status code 200-299)
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const data = await response.json();

                        if (data.checkpointFilePath) {
                            selectedCheckpointPath = data.checkpointFilePath;
                            document.getElementById('input-checkpoint-path').value = selectedCheckpointPath;
                        }
                    } catch (error) {
                        console.error('Fetch error:', error);
                        alert('There was a problem with the request.');
                    }
                }


                const checkpointButton = document.getElementById('input-checkpoint-file');
                if (checkpointButton) {
                    checkpointButton.addEventListener('click', requestCheckpointFileSelection);
                } else {
                    console.error('Checkpoint button not found');
                }

                // A separate function for updating the save path
                async function updateSavePath(inputId) {
                    try {
                        const response = await fetch('/select-save-folder');
                        // Check if the response is OK (status code 200-299)
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const data = await response.json();

                        // Update input field with the selected save folder path
                        document.getElementById(inputId).value = data.saveFolderPath;
                    } catch (error) {
                        console.error('Fetch error:', error);
                        alert('There was a problem with the request.');
                    }
                }


                // load json
                function updateFilePath(inputId, element) {
                    const file = element.files[0];
                    if (file) {
                        document.getElementById(inputId).value = file.name; // Update the input field with the file name

                        const reader = new FileReader();
                        reader.onload = function(event) {
                            const data = JSON.parse(event.target.result);
                            //tab
                            if (data.activeTab) {
                                document.querySelector('#mainTabs .nav-link.active').classList.remove('active');
                                document.getElementById(data.activeTab).classList.add('active');
                            }
                            if (data.selectedModel) {
                                document.getElementById('model-select').value = data.selectedModel;
                            }
                            //imagesDataset
                            if (data.folders) {
                                data.folders.forEach((folder, index) => {
                                    const labelElement = document.getElementById(`Label-Image-Folder${index + 1}`);
                                    const inputElement = document.getElementById(`Image-Folder${index + 1}`);
                                    if (labelElement && inputElement) {
                                        labelElement.textContent = folder.label;
                                        inputElement.value = folder.value;
                                    }
                                });
                            }
                            if (data.datasetFolderPath !== undefined) {
                                selectedFolderPath = data.datasetFolderPath;
                                document.getElementById('display-dataset-path').textContent = "Loaded Path: " + selectedFolderPath;
                            }

                            //Prompts
                            if (data.tabs) {
                                const shouldLoadAllTabs = data.activeTab !== 'imageslider-tab';
                                data.tabs.forEach((tabData, index) => {
                                    if (shouldLoadAllTabs || index === 0) {
                                        populateTabData(index === 0 ? '' : index + 1, tabData);
                                    }
                                });
                            }
                            if (data.resolution) {
                                document.getElementById('input-resolution').value = data.resolution;
                            }
                            if (data.batchSize) {
                                document.getElementById('input-batch-size').value = data.batchSize;
                            }
                            if (data.dynamicResolution !== undefined) {
                                document.getElementById('input-dynamic-resolution').checked = data.dynamicResolution;
                            }
                            
                            //config
                            if (data.checkpointPath) {
                                selectedCheckpointPath = data.checkpointPath;
                                document.getElementById('input-checkpoint-path').value = selectedCheckpointPath;
                            }
                            if (data.v2Checked !== undefined) {
                                document.getElementById('input-v2').checked = data.v2Checked;
                            }
                            if (data.vPredChecked !== undefined) {
                                document.getElementById('input-vpred').checked = data.vPredChecked;
                            }
                            if (data.typeScheduler) {
                                document.getElementById('input-type-scheduler').value = data.typeScheduler;
                            }
                            if (data.trainingMethod) {
                                document.getElementById('input-training-method').value = data.trainingMethod;
                            }
                            if (data.rankValue) {
                                document.getElementById('rank-slider').value = data.rankValue;
                                document.getElementById('rank-value').textContent = data.rankValue;
                            }
                            if (data.alphaValue) {
                                document.getElementById('alpha-slider').value = data.alphaValue;
                                document.getElementById('alpha-value').textContent = data.alphaValue;
                            }
                            if (data.precision) {
                                document.getElementById('input-precision').value = data.precision;
                            }
                            if (data.optimizer) {
                                document.getElementById('input-optimizer').value = data.optimizer;
                            }
                            if (data.noiseScheduler) {
                                document.getElementById('input-noise-scheduler').value = data.noiseScheduler;
                            }
                            if (data.lrScheduler) {
                                document.getElementById('input-lr-scheduler').value = data.lrScheduler;
                            }
                            if (data.iterations) {
                                document.getElementById('input-iterations').value = data.iterations;
                            }
                            if (data.maxDenoising) {
                                document.getElementById('input-max-denoising').value = data.maxDenoising;
                            }
                            if (data.learningRate) {
                                document.getElementById('input-learning-rate').value = data.learningRate;
                            }
                            if (data.useXformers !== undefined) {
                                document.getElementById('input-use-xformers').checked = data.useXformers;
                            }
                            if (data.name) {
                                document.getElementById('input-name').value = data.name;
                            }
                            if (data.savePath) {
                                document.getElementById('input-save-path').value = data.savePath;
                            }
                            if (data.saveEveryIterations) {
                                document.getElementById('input-save-every-iterations').value = data.saveEveryIterations;
                            }
                            if (data.useWandb !== undefined) {
                                document.getElementById('input-use-wandb').checked = data.useWandb;
                            }
                            if (data.verbose !== undefined) {
                                document.getElementById('input-verbose').checked = data.verbose;
                            }
                            if (data.safeTensors !== undefined) {
                                document.getElementById('input-safetensors').checked = data.safeTensors;
                            }



                            // ... populate other data ...
                        };
                        reader.readAsText(file);
                    }
                }
                
                
                // save json 
                document.getElementById('saveButton').addEventListener('click', async function() {
                    console.log('Save button clicked.');

                    console.log('Checking input-name element:', document.getElementById('input-name'));
                    const name = document.getElementById('input-name').value.trim();

                    console.log('Checking input-target element:', document.getElementById('input-target'));
                    const target = document.getElementById('input-target1').value.trim();

                    console.log('Checking active tab:', document.querySelector('#mainTabs .nav-link.active'));
                    const activeTab = document.querySelector('#mainTabs .nav-link.active').id;

                    console.log('Determining subfolder...');
                    const subfolder = getSaveSubfolder();
                    let filename = "";

                    // Determine the filename
                    if (name) {
                        filename = name;
                    } else if (target) {
                        filename = "UnNamed_" + target;
                    } else {
                        filename = prompt("Please name your training", "MyTraining");
                        if (!filename) return;  // Cancel saving if no name is provided
                    }

                    const jsonFullPath = `LOGs/${subfolder}/${filename}.json`;

                    const data = {
                        //mainTab
                        activeTab: activeTab,
                        //imageDataset
                        selectedModel: document.getElementById('model-select').value,
                        folders: Array.from({ length: 6 }, (_, i) => ({
                            label: document.getElementById(`Label-Image-Folder${i + 1}`).textContent,
                            value: document.getElementById(`Image-Folder${i + 1}`).value
                        })),
                        datasetFolderPath: selectedFolderPath,
                        //prompts
                        tabs: activeTab === 'imageslider-tab' ? [getDataFromTab('')] : [1, 2, 3, 4].map(i => getDataFromTab(i)),
                        resolution: document.getElementById('input-resolution').value,
                        batchSize: document.getElementById('input-batch-size').value,
                        dynamicResolution: document.getElementById('input-dynamic-resolution').checked,
                        
                        //Config
                        checkpointPath: selectedCheckpointPath,           
                        v2Checked: document.getElementById('input-v2').checked,
                        vPredChecked: document.getElementById('input-vpred').checked,
                        typeScheduler: document.getElementById('input-type-scheduler').value,
                        trainingMethod: document.getElementById('input-training-method').value,
                        rankValue: document.getElementById('rank-slider').value,
                        alphaValue: document.getElementById('alpha-slider').value,
                        precision: document.getElementById('input-precision').value,
                        optimizer: document.getElementById('input-optimizer').value,
                        noiseScheduler: document.getElementById('input-noise-scheduler').value,
                        lrScheduler: document.getElementById('input-lr-scheduler').value,
                        iterations: document.getElementById('input-iterations').value,
                        maxDenoising: document.getElementById('input-max-denoising').value,
                        learningRate: document.getElementById('input-learning-rate').value,
                        useXformers: document.getElementById('input-use-xformers').checked,
                        name: document.getElementById('input-name').value,
                        savePath: document.getElementById('input-save-path').value,
                        saveEveryIterations: document.getElementById('input-save-every-iterations').value,
                        useWandb: document.getElementById('input-use-wandb').checked,
                        verbose: document.getElementById('input-verbose').checked,

                        //safetensors
                        safeTensors: document.getElementById('input-safetensors').checked,
                        
                        jsonSavePath: jsonFullPath     
                    };


                    // In your JavaScript for the save button
                    fetch('/save-json', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => {
                        if (response.status === 409) {
                            // Data is the same, ask for user confirmation
                            if (window.confirm('The parameters are the same as previously saved. Do you want to overwrite?')) {
                                // User confirmed, overwrite the file
                                // Resend the request or handle differently
                            }
                            return;
                        }
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Response:', data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });

                        

                function getDataFromTab(tabId) {
                    function getElementValue(id) {
                        const element = document.getElementById(id);
                        if (element) {
                            return element.value;
                        } else {
                            console.error('Element not found:', id);
                            return '';
                        }
                    }

                    const suffix = tabId ? tabId : '1';  // Append '1' for the first tab
                    return {
                        target: getElementValue(`input-target${suffix}`),
                        positive: getElementValue(`input-positive${suffix}`),
                        unconditional: getElementValue(`input-unconditional${suffix}`),
                        neutral: getElementValue(`input-neutral${suffix}`),
                        guidanceScale: getElementValue(`input-guidance-scale${suffix}`),
                        action: getElementValue(`input-Action${suffix}`)
                    };
                }

                function populateTabData(tabId, data) {
                    const suffix = tabId ? tabId : '1';  // Append '1' for the first tab
                    document.getElementById(`input-target${suffix}`).value = data.target || '';
                    document.getElementById(`input-positive${suffix}`).value = data.positive || '';
                    document.getElementById(`input-unconditional${suffix}`).value = data.unconditional || '';
                    document.getElementById(`input-neutral${suffix}`).value = data.neutral || '';
                    document.getElementById(`input-guidance-scale${suffix}`).value = data.guidanceScale || '4';
                    document.getElementById(`input-Action${suffix}`).value = data.action || 'enhance';
                }

                


                // JavaScript function to send an AJAX POST request to the server
                function callSelectLoraPath() {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', '/select_lora_path', true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            alert(xhr.responseText);
                        }
                    };
                    xhr.send();
                }

                
                //trainmodelAtempt
                function trainModel() {
                    // First run the save parameters functionality
                    const collectedData = collectData();

                    // Determine the active tab and selected model
                    const activeTab = document.querySelector('#mainTabs .nav-link.active').id;
                    const selectedModel = document.getElementById('model-select').value;

                    // Gather the necessary data from the inputs
                    const name = document.getElementById('input-name').value.trim();
                    const rankValue = document.getElementById('rank-slider').value;
                    const alphaValue = document.getElementById('alpha-slider').value;
                    const datasetFolderPath = collectedData.datasetFolderPath; // This needs to be collected with "collectData" as "datasetFolderPath"

                    // Construct the base command
                    let command = 'python trainscripts/';
                    if (activeTab === 'imageslider-tab') {
                        command += 'imagesliders/';
                        command += (selectedModel === 'sdxl') ? 'train_lora-scale-xl.py' : 'train_lora-scale.py';
                    } else {
                        command += 'textsliders/';
                        command += (selectedModel === 'sdxl') ? 'train_lora_xl.py' : 'train_lora.py';
                    }

                    // Add specific parameters for text sliders first
                    if (activeTab === 'textslider-tab') {
                        let attributes = [];
                        for (let i = 1; i <= 3; i++) {
                            const neutralInput = document.getElementById(`input-neutral${i}`);
                            if (neutralInput && neutralInput.value.trim() !== '') {
                                attributes.push(neutralInput.value.trim());
                            }
                        }
                        command += ` --attributes '${attributes.length > 0 ? attributes.join(", ") : " "}'`;
                    }

                    // Add common parameters
                    command += ` --name '${name}' --rank ${rankValue} --alpha ${alphaValue}`;

                    // Add config file path
                    const configFilePath = `trainscripts/${activeTab === 'textslider-tab' ? 'textsliders' : 'imagesliders'}/data/config${selectedModel === 'sdxl' ? '-xl' : ''}.yaml`;
                    command += ` --config_file '${configFilePath}'`;

                    // Add specific parameters for image sliders
                    if (activeTab === 'imageslider-tab') {
                        command += ` --folder_main '${datasetFolderPath}'`;

                        // Add folders and scales
                        let folders = [];
                        let scales = [];
                        for (let i = 1; i <= 6; i++) {
                            const label = document.getElementById(`Label-Image-Folder${i}`).textContent.replace(':', '');
                            const value = document.getElementById(`Image-Folder${i}`).value;

                            if (label !== 'none' && value !== 'none') {
                                folders.push(label);
                                scales.push(value);
                            }
                        }
                        command += ` --folders '${folders.join(", ")}' --scales '${scales.join(", ")}'`;
                    }
                        console.log('Final command to send:', command);

                        // Send the command to the server for execution
                        fetch('/execute-command', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ command: command }),
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Network response was not ok, status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Command execution response:', data);
                        })
                        .catch(error => {
                            console.error('Error executing command:', error);
                        });
                    }

                document.getElementById('btn-train').addEventListener('click', trainModel);



                // Add a click event listener to the button
                document.getElementById("btn-Test").addEventListener("click", callSelectLoraPath);

                //check json saving
                function getSaveSubfolder() {
                    const selectedTab = document.querySelector('#mainTabs .nav-link.active').id;
                    const selectedModel = document.getElementById('model-select').value;
                    let subfolder = "";

                    if (selectedTab === 'imageslider-tab') {
                        subfolder = selectedModel === 'sdxl' ? 'imageSliders_SDXL' : 'imageSliders_SD15';
                    } else {  // Assuming it's textslider-tab
                        subfolder = selectedModel === 'sdxl' ? 'textSliders_SDXL' : 'textSliders_SD15';
                    }

                    return subfolder;
                }

                
                
                //data Collectionationerisimo
                function collectData() {
                    const activeTab = document.querySelector('#mainTabs .nav-link.active').id;
                    const selectedModel = document.getElementById('model-select').value;
                    
                    // Construct the data object based on inputs from the HTML form
                    const data = {
                        //mainTab
                        activeTab: activeTab,
                        //imageDataset
                        selectedModel: document.getElementById('model-select').value,
                        folders: Array.from({ length: 6 }, (_, i) => ({
                            label: document.getElementById(`Label-Image-Folder${i + 1}`).textContent,
                            value: document.getElementById(`Image-Folder${i + 1}`).value
                        })),
                        datasetFolderPath: selectedFolderPath,
                        //prompts
                        tabs: activeTab === 'imageslider-tab' ? [getDataFromTab('')] : [1, 2, 3, 4].map(i => getDataFromTab(i)),
                        resolution: document.getElementById('input-resolution').value,
                        batchSize: document.getElementById('input-batch-size').value,
                        dynamicResolution: document.getElementById('input-dynamic-resolution').checked,
                        
                        //Config
                        checkpointPath: selectedCheckpointPath,           
                        v2Checked: document.getElementById('input-v2').checked,
                        vPredChecked: document.getElementById('input-vpred').checked,
                        typeScheduler: document.getElementById('input-type-scheduler').value,
                        trainingMethod: document.getElementById('input-training-method').value,
                        rankValue: document.getElementById('rank-slider').value,
                        alphaValue: document.getElementById('alpha-slider').value,
                        precision: document.getElementById('input-precision').value,
                        optimizer: document.getElementById('input-optimizer').value,
                        noiseScheduler: document.getElementById('input-noise-scheduler').value,
                        lrScheduler: document.getElementById('input-lr-scheduler').value,
                        iterations: document.getElementById('input-iterations').value,
                        maxDenoising: document.getElementById('input-max-denoising').value,
                        learningRate: document.getElementById('input-learning-rate').value,
                        useXformers: document.getElementById('input-use-xformers').checked,
                        name: document.getElementById('input-name').value,
                        savePath: document.getElementById('input-save-path').value,
                        saveEveryIterations: document.getElementById('input-save-every-iterations').value,
                        useWandb: document.getElementById('input-use-wandb').checked,
                        verbose: document.getElementById('input-verbose').checked,

                        //safetensors
                        safeTensors: document.getElementById('input-safetensors').checked,
                         
                    };

                    return data; // Return the data object
                }

                // Example usage: get the collected data and log it to the console
                //const collectedData = collectData();
                //console.log(collectedData);

                function isValidJSON(text) {
                    try {
                        JSON.parse(text);
                        return true;
                    } catch (error) {
                        return false;
                    }
                }



                document.addEventListener('DOMContentLoaded', function() {
                    const printDataBtn = document.getElementById('print-data-btn');
                    
                    if (printDataBtn) {
                        printDataBtn.addEventListener('click', function() {
                            const dataToPrint = collectData();
                            console.log(dataToPrint);
                        });
                    } else {
                        console.error('Print Data button not found.');
                    }
                });

                function restartServer() {
                    fetch('/restart-server')
                        .then(response => {
                            if (response.ok) {
                                console.log("Server restarting...");
                            }
                        })
                        .catch(error => console.error('Error:', error));
                }

                //SAve parameters button evListener
                document.addEventListener('DOMContentLoaded', function() {
                    const saveParameters = document.getElementById('btn-save-parameters');
                    const saveJsonButton = document.getElementById('saveButton');
                    if (saveParameters && saveJsonButton) {
                        saveParameters.addEventListener('click', function() {
                            console.log('Save parameters button clicked.');
                            // Step 1: Determine the active tab and model type
                            const activeTab = document.querySelector('#mainTabs .nav-link.active').id;
                            const selectedModel = document.getElementById('model-select').value;
                            const safeTensorsCheck = document.getElementById('input-safetensors').checked;
                            
                            const collectedData = collectData();
                            
                            // Prepare the data to send to the server
                            const dataToSend = {
                                isImageSliders: activeTab === 'imageslider-tab',
                                isTextSliders: activeTab === 'textslider-tab',
                                isSDXL: selectedModel === 'sdxl',
                                safeTensors: safeTensorsCheck,
                                ...collectedData  // Spread operator to include all fields
                            };

                            console.debug('Data to send:', dataToSend);
                            console.log('Sending request to /modify-files with data:', dataToSend);
                            console.log(JSON.stringify(dataToSend));
                            fetch('/modify-files', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(dataToSend),
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`Network response was not ok, status: ${response.status}`);
                                }
                                return response.text();  // First convert to text
                            })
                            .then(data => {
                                console.log('Files modified:', data);
                                // After modifying files, trigger the "save-json" action
                                saveJsonButton.click(); // Programmatically click the "save-json" button
                            })
                            .then(text => {
                                console.log('Raw response:', text);  // Log the raw text
                                if (isValidJSON(text)) {
                                    const data = JSON.parse(text);  // Then parse the text to JSON
                                    console.log('Response data:', data);  // Log the entire response
                                    console.log('Files modified:', data.message);  // Log the success message
                                } else {
                                    console.error('Invalid JSON response:', text);
                                }
                            })
                            .catch(error => {
                                console.error('Error modifying files:', error);
                            });
                        });
                    } else {
                        console.error('One or more buttons not found.');
                    }
                });


            </script>
            </body>
            </html>

            """
            self.wfile.write(html_content.encode('utf-8'))
    
        # Python: Part of your Handler class
        elif self.path == '/select-save-folder':
            save_folder_path = select_save_folder()
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response_data = {'saveFolderPath': save_folder_path}
            self.wfile.write(json.dumps(response_data).encode('utf-8'))

        elif self.path == '/select-folder':
            folder_path, folder_names, message = select_folder()
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response_data = {'folderPath': folder_path, 'folderNames': folder_names, 'message': message}
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
        
        # In your Handler class
        elif self.path == '/select-checkpoint-file':
            checkpoint_file_path = select_checkpoint_file()
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response_data = {'checkpointFilePath': checkpoint_file_path}
            self.wfile.write(json.dumps(response_data).encode('utf-8'))

        elif self.path == '/restart-server':
            print("Restarting server...")
            Thread(target=restart_server).start()
            self.send_response(200)
            self.end_headers()
            return

        else:
            # Handling other paths or returning a 404 not found error
            super().do_GET()        


    def do_POST(self):
        if self.path == '/save-json':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            new_data = json.loads(post_data.decode('utf-8'))

            save_path = new_data.get('jsonSavePath', 'default_saved_data.json')
            directory = os.path.dirname(save_path)
            base_name = os.path.basename(save_path).split('.')[0]

            if directory and not os.path.exists(directory):
                os.makedirs(directory)

            if os.path.exists(save_path):
                with open(save_path, 'r') as existing_file:
                    existing_data = json.load(existing_file)
                    if new_data == existing_data:
                        self.send_response(409)
                        self.send_header('Content-Type', 'application/json')
                        self.end_headers()
                        response = {'message': 'Data is identical to existing file. Do you want to overwrite?'}
                        self.wfile.write(json.dumps(response).encode('utf-8'))
                        return

            file_index = 1
            original_save_path = save_path
            while os.path.exists(save_path):
                file_index += 1
                save_path = f"{directory}/{base_name}_{file_index}.json"

            # Save the JSON data to the new file
            with open(save_path, 'w') as outfile:
                json.dump(new_data, outfile)

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {'message': f'Data saved successfully to {save_path}'}
            self.wfile.write(json.dumps(response).encode('utf-8'))

            # Rest of your do_POST method...

        elif self.path == '/train-model':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Extract the relevant information from the data
            active_tab = data['activeTab']
            selected_model = data['selectedModel']
            name = data['name']
            rank_value = data['rankValue']
            alpha_value = data['alphaValue']
            dataset_folder_path = data['datasetFolderPath']
            
            # Construct the base command
            command = 'python trainscripts/'
            command += 'textsliders/' if active_tab == 'textslider-tab' else 'imagesliders/'
            command += 'train_lora_xl.py' if selected_model == 'sdxl' else 'train_lora.py'
            command += f" --name '{name}' --rank {rank_value} --alpha {alpha_value}"
            

            # Add config file path
            config_file_path = f"trainscripts/{'textsliders' if active_tab == 'textslider-tab' else 'imagesliders'}/data/config{'-xl' if selected_model == 'sdxl' else ''}.yaml"
            command += f" --config_file '{config_file_path}'"
            print('Command to execute:', command)
            
            desired_path = os.path.dirname(os.path.abspath(__name__))  # Update this to your desired path
            print(desired_path)
            os.chdir(desired_path)
            
            safe_command = shlex.quote(command)
            cmd_command = f'cmd /k {safe_command}'

            os.system(cmd_command)


            # Respond with the command to the client
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {'command': command}
            self.wfile.write(json.dumps(response).encode('utf-8'))

        elif self.path == '/select_lora_path':
            # Call the select_lora_path function
            select_lora_path()
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write("Lora path selected successfully".encode('utf-8'))
        
        elif self.path == '/modify-files':
            try:
                # New functionality for modifying files
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                
                # Extract the relevant information from the data
                isImageSliders = data['isImageSliders']
                isTextSliders = data['isTextSliders']
                isSDXL = data['isSDXL']
                use_safetensors = data['safeTensors']  # Adjust based on your actual data structure

                # Determine the directory and files to be modified
                directory = "imagesliders" if isImageSliders else "textsliders"
                files_to_modify = file_groups[directory]["files"]

                # Filter files for SDXL or SD 1.5/2.1
                if isSDXL:
                    files_to_modify = [f for f in files_to_modify if "xl" in f]  # Only files with "xl" for SDXL
                else:
                    files_to_modify = [f for f in files_to_modify if "xl" not in f]  # Exclude files with "xl" for SD 1.5/2.1

                # Modify Python and YAML files as needed
                for file in files_to_modify:
                    # Check if it's a YAML file and construct the path accordingly
                    if file.endswith('.yaml'):
                        file_path = os.path.join(base_folder, directory, 'data', file)
                        if 'config' in file:
                            modify_config_yaml(file_path, data)
                            print(file_path)
                        elif 'prompts' in file:
                            modify_prompts_file(file_path, data)
                            print(file_path)
                    else:
                        file_path = os.path.join(base_folder, directory, file)
                        if file.endswith('.py'):
                            modify_python_file(file_path, use_safetensors)

                #ti
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {'message': 'Files were successfully modified.'}
                self.wfile.write(json.dumps(response).encode('utf-8'))

            except Exception as e:
                traceback.print_exc()  # This will print the stack trace to stderr (typically the console)
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {'message': f'Error during file modification: {str(e)}'}
                self.wfile.write(json.dumps(response).encode('utf-8'))

        elif self.path == '/collect-data':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            prompt_data = json.loads(post_data.decode('utf-8'))

            # Process the prompt data as needed
            print("Received prompt data:", prompt_data)

            # Send a response back to the client
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {'message': 'Prompt data received successfully.'}
            self.wfile.write(json.dumps(response).encode('utf-8')) 
                
        elif self.path == '/execute-command':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            command = data.get('command')
            
            if command:
                # Open a new command prompt window and execute the command
                # /K keeps the window open, /C would close it after execution
                powershell_command = f'start PowerShell -NoExit -Command "{command}"'
                process = Popen(powershell_command, shell=True, stdout=PIPE, stderr=STDOUT)
                output, error = process.communicate()
                if process.returncode == 0:
                    response = {'message': 'Command executed successfully', 'output': output.decode()}
                else:
                    response = {'message': 'Error executing command', 'error': error.decode() if error else 'Unknown error'}
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode('utf-8'))
            else:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {'message': 'No command provided'}
                self.wfile.write(json.dumps(response).encode('utf-8'))
 
        else:
            # If none of the above conditions are met, send a 501 error
            self.send_error(501, 'Unsupported method')
        

    def log_message(self, format, *args):
        # Override to log every request to the console
        logging.info("%s - %s" % (self.client_address[0], format % args))

        

def select_folder():
    root = Tk()
    root.lift()  # Bring the root window to the front
    root.attributes('-topmost', True)  # Keep it on top
    folder_path = filedialog.askdirectory(parent=root, title="Select Folder")
    print('opening FileDialog')
    root.destroy() 
    if folder_path:
        folders = next(os.walk(folder_path))[1]
        if len(folders) in [2, 4, 6]:
            return folder_path, folders, "Folders loaded successfully."
        else:
            return [], "You need 2, 4, or 6 folders. Found: " + str(len(folders))
    return [], "Selection cancelled"


def select_save_folder():
    root = Tk()
    root.lift()  # Bring the root window to the front
    root.attributes('-topmost', True)  # Keep it on top
    save_folder_path = filedialog.askdirectory(parent=root, title="Select saving Folder")  # Show the folder selection dialog
    print('opening FileDialog')
    root.destroy()  # Destroy the Tk root window
    return save_folder_path or "No folder selected"


def select_checkpoint_file():
    root = Tk()
    root.lift()  # Bring the root window to the front
    root.attributes('-topmost', True)  # Keep it on top
    file_path = filedialog.askopenfilename(parent=root, title="Select Checkpoint to train with")  # Show file selection dialog
    print('opening FileDialog')
    root.destroy() 
    return file_path


def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("Open: http://localhost:" + str(PORT))
        httpd.serve_forever()


######FILES AND PY FUNCTIONS######
        
# Set the initial directory for the file dialog to the current script's directory
initial_directory = os.path.join(os.path.dirname(os.path.abspath(__name__)), "models")

def create_logs_subfolders():
    base_log_dir = "LOGs"
    subfolders = ["imageSliders_SD15", "imageSliders_SDXL", "textSliders_SD15", "textSliders_SDXL"]

    if not os.path.exists(base_log_dir):
        os.mkdir(base_log_dir)

    for subfolder in subfolders:
        dir_path = os.path.join(base_log_dir, subfolder)
        if not os.path.exists(dir_path):
            os.mkdir(dir_path)


# Function to find the files in a directory
def find_files_in_directory(directory, filenames):
    found_files = []
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename in filenames:
                found_files.append(os.path.join(root, filename))
    return found_files

# Base folder pointing to 'trainscripts' inside the 'sliders' folder
base_folder = os.path.join(os.path.dirname(__file__), "trainscripts")

# Define file groups specific to each subfolder
file_groups = {
    "imagesliders": {
        "folder": "imagesliders",
        "files": ["config.yaml", "prompts.yaml", "config-xl.yaml", "prompts-xl.yaml", "train_lora-scale.py", "train_lora-scale-xl.py"]
    },
    "textsliders": {
        "folder": "textsliders",
        "files": ["config.yaml", "prompts.yaml", "config-xl.yaml", "prompts-xl.yaml", "train_lora.py", "train_lora_xl.py"]
    }
}

for group_name, group_info in file_groups.items():
    directory_path = os.path.join(base_folder, group_info["folder"])
    found_files = find_files_in_directory(directory_path, group_info["files"])
    print(f"Files for {group_name}:")
    for file in found_files:
        print(file)


# Check if the required subfolders are present
if not os.path.exists(os.path.join(base_folder, "textsliders")) or not os.path.exists(os.path.join(base_folder, "imagesliders")):
    print(f"Warning: Subfolders not found in '{base_folder}'. Please ensure you are in the correct directory.")


#send to test functions
import shutil                     
def select_lora_path():
    global lora_path

    # Check if lora_path is already set
    if not lora_path:
        # If not, try to load the last selected "lora path" from a file
        try:
            with open("last_lora_path.txt", "r") as file:
                lora_path = file.read()
        except FileNotFoundError:
            pass

    # Prompt the user to select a folder via a folder dialog
    root = Tk()
    root.lift()  # Bring the root window to the front
    root.attributes('-topmost', True)  # Keep it on top
    new_lora_path = filedialog.askdirectory(title="Select Lora Path", initialdir=lora_path)
    print('opening FileDialog')
    root.destroy()
    # If a valid new_lora_path is selected, update lora_path and save it to a file
    if new_lora_path:
        lora_path = new_lora_path
        with open("last_lora_path.txt", "w") as file:
            file.write(lora_path)

    # Check if lora_path is still not set (or the user didn't select a new path)
    if not lora_path:
        print("Lora path not set. Please select a folder.")
        return

    # Prompt the user to select one or multiple files
    root = Tk()
    root.lift()  # Bring the root window to the front
    root.attributes('-topmost', True)  # Keep it on top

    # Set the initial directory for the file dialog to the current script's directory + "/models"
    script_directory = os.path.dirname(os.path.abspath(__name__))
    initial_directory = os.path.join(script_directory, "models")
    selected_files = filedialog.askopenfilenames(parent=root,
        title="Select File(s)",
        initialdir=initial_directory,  # Set the initial directory
        filetypes=(("PyTorch Model Files", "*.pt"), ("All Files", "*.*"))
    )
    print('opening FileDialog')
    root.destroy() 
    # Copy the selected files to a folder in the lora_path with a unique name
    if selected_files:
        # Determine the main folder name based on the first selected file
        first_file_name = os.path.splitext(os.path.basename(selected_files[0]))[0]
        main_folder_name = first_file_name.split("_")
        main_folder_name.pop()  # Remove the last part (e.g., "250steps")
        main_folder_name = "_".join(main_folder_name)

        # Find the number to append to the folder name to make it unique
        folder_counter = 1
        while os.path.exists(os.path.join(lora_path, main_folder_name)):
            main_folder_name = f"{main_folder_name}{folder_counter}"
            folder_counter += 1

        # Create the folder in the lora_path
        folder_path = os.path.join(lora_path, main_folder_name)
        os.makedirs(folder_path)

        # Copy all selected files to the folder
        for selected_file in selected_files:
            shutil.copy(selected_file, os.path.join(folder_path, os.path.basename(selected_file)))
            print(f"File '{os.path.basename(selected_file)}' copied to '{main_folder_name}' in 'lora path'.")

        # Collect the names of selected files for later use
        selected_file_names = [os.path.basename(selected_file) for selected_file in selected_files]
        print("Selected file names:", selected_file_names)

        # Call the function to generate the script message
        generate_script_message(selected_file_names)

# Rest of your code...

def modify_python_file(file_path, use_safetensors):
    print(f"Modifying file: {file_path} with safetensors={use_safetensors}")
    # Read the file
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    original_content = content  # Save original content for comparison

    # Determine the replacement based on the checkbox state
    if use_safetensors:
        content = content.replace('.pt', '.safetensors')
    else:
        content = content.replace('.safetensors', '.pt')

    if content != original_content:
        print("File content has been modified.")
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print("File saved with new content.")
    else:
        print("No modification needed for the file.")

# Initialize lora_path and selectedFolderPath
lora_path = ""
selectedFolderPath = ""

#XYZ ploterino
def generate_script_message(selected_file_names):
    if not selected_file_names:
        print("No files selected.")
        return

    def extract_sort_key(name):
        # Split the name into parts
        parts = name.split("_")

        # Find the numeric part of the name (excluding "_steps.pt" suffix)
        for part in parts:
            if part.isdigit() or (part.endswith("last") and part[:-4].isdigit()):
                return int(part.replace("last", ""))

        # Return a default value (e.g., 0) when no numeric part is found
        return 0

    # Sort the selected file names based on their numeric values (or "last" for the last position)
    selected_file_names.sort(key=extract_sort_key)

    # Generate the modified file names with "<lora:" and ":-3>" and without the file extension
    modified_file_names = [f"<lora:{os.path.splitext(name)[0]}:-3>" for name in selected_file_names]

    # Generate the Y Values string with a range from -3 to 3
    y_values = "-3>, -2>, -1>, -0.7>, -0.5>, -0.3>, 0.3>, 0.5>, 0.7>, 1>, 1.5>, 2>, 2.5>, 3>"

    # Generate and print the script message
    script_message = f"<lora:{os.path.splitext(selected_file_names[0])[0]}:-3>,\n" \
                     f"<lora:{os.path.splitext(selected_file_names[0])[0]}:-3>, Script: X/Y/Z plot, X Type: Prompt S/R, X Values: \"{' ,'.join(modified_file_names)}\", Y Type: Prompt S/R, Y Values: \"{y_values}\""
    
    # Add some spacing for clarity
    print("\n" + "=" * 80)  # Add a line of equal signs as a separator
    
    print(script_message)

    # Add some spacing for clarity
    print("\n" + "=" * 80)  # Add a line of equal signs as a separator


def execute_command(command):
    try:
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()
        if stderr:
            print(f"Error: {stderr.decode()}")
        else:
            print(stdout.decode())
    except Exception as e:
        print(f"An error occurred: {e}")

def create_logs_subfolders():
    base_log_dir = "LOGs"
    subfolders = ["imageSliders_SD15", "imageSliders_SDXL", "textSliders_SD15", "textSliders_SDXL"]

    if not os.path.exists(base_log_dir):
        os.mkdir(base_log_dir)

    for subfolder in subfolders:
        dir_path = os.path.join(base_log_dir, subfolder)
        if not os.path.exists(dir_path):
            os.mkdir(dir_path)



#def modify_yaml_file(yaml_file_path, collected_data):
#    with open(yaml_file_path, 'r') as file:
#        yaml_content = yaml.safe_load(file)
#
#    # Modify config file
#    if 'config' in yaml_file_path:
#        modify_config_yaml(yaml_content, collected_data)
#
#    # Modify prompts file
#    if 'prompts' in yaml_file_path:
#        modify_prompts_file(yaml_content, collected_data)
#
#    with open(yaml_file_path, 'w') as file:
#        yaml.dump(yaml_content, file, default_flow_style=False)

def modify_config_yaml(config_file_path, collected_data):
    # Load the existing YAML content

    yaml = YAML()
    yaml.preserve_quotes = True

    # Load the existing YAML content
    with open(config_file_path, 'r') as file:
        yaml_content = yaml.load(file)

    # Update the YAML content based on the collected data
    # Check and update only if new values are provided and not just a space or empty
    if (collected_data.get('checkpointPath') and 
        collected_data['checkpointPath'].strip() and 
        collected_data['checkpointPath'] != "No folder selected"):
        yaml_content['pretrained_model']['name_or_path'] = collected_data['checkpointPath']

    if 'v2Checked' in collected_data:
        yaml_content['pretrained_model']['v2'] = collected_data['v2Checked']
    
    if 'vPredChecked' in collected_data:
        yaml_content['pretrained_model']['v_pred'] = collected_data['vPredChecked']
    
    if 'typeScheduler' in collected_data:
        yaml_content['network']['type'] = collected_data['typeScheduler']

    if 'rankValue' in collected_data:
        yaml_content['network']['rank'] = int(collected_data['rankValue'])

    if 'alphaValue' in collected_data:
        yaml_content['network']['alpha'] = float(collected_data['alphaValue'])

    if 'trainingMethod' in collected_data:
        yaml_content['network']['training_method'] = collected_data['trainingMethod']

    if 'precision' in collected_data:
        yaml_content['train']['precision'] = collected_data['precision']

    if 'noiseScheduler' in collected_data:
        yaml_content['train']['noise_scheduler'] = collected_data['noiseScheduler']

    if 'iterations' in collected_data:
        yaml_content['train']['iterations'] = int(collected_data['iterations'])

    if 'learningRate' in collected_data:
        yaml_content['train']['lr'] = float(collected_data['learningRate'])

    if 'optimizer' in collected_data:
        yaml_content['train']['optimizer'] = collected_data['optimizer']

    if 'lrScheduler' in collected_data:
        yaml_content['train']['lr_scheduler'] = collected_data['lrScheduler']

    if 'maxDenoising' in collected_data:
        yaml_content['train']['max_denoising_steps'] = int(collected_data['maxDenoising'])

    if 'name' in collected_data and collected_data['name'] != " ":
        yaml_content['save']['name'] = collected_data['name']
    else:
        yaml_content['save']['name'] = 'unnamed' + (collected_data.get('tabs', [{}])[0].get('target', '') or '')

    # Check if a new savePath is provided and valid
    if (collected_data.get('savePath') and 
        collected_data['savePath'].strip() and 
        collected_data['savePath'] != "No folder selected"):
        yaml_content['save']['path'] = collected_data['savePath']
    elif not yaml_content['save']['path'].strip():
        # If the original savePath is empty or whitespace, set it to './models'
        yaml_content['save']['path'] = './models'

    if 'saveEveryIterations' in collected_data:
        yaml_content['save']['per_steps'] = int(collected_data['saveEveryIterations'])

    if 'precision' in collected_data:
        yaml_content['save']['precision'] = collected_data['precision']

    if 'useWandb' in collected_data:
        yaml_content['logging']['use_wandb'] = collected_data['useWandb']

    if 'verbose' in collected_data:
        yaml_content['logging']['verbose'] = collected_data['verbose']

    if 'useXformers' in collected_data:
        yaml_content['other']['use_xformers'] = collected_data['useXformers']

    # Write the modified content back to the file
    with open(config_file_path, 'w') as file:
        yaml.dump(yaml_content, file)


    print('parameters Saved')
    return f"Config YAML file updated: {config_file_path}"


def modify_prompts_file(file_path, data):
    # Read existing content from the file
    yaml = YAML()
    yaml.preserve_quotes = True

    # Read existing content from the file
    with open(file_path, 'r') as file:
        yaml_content = yaml.load(file)

    yaml_content.clear()
    # Initialize an empty list for the new content
    new_yaml_content = []
    # Clear existing content in the YAML file


    # Get active tabs data
    # Iterate through each active tab and create a prompt block
    for tab in data['tabs']:
        if any(tab.get(key).strip() for key in ['target', 'positive', 'unconditional', 'neutral'] if tab.get(key)):
        # Create a prompt block with default values as spaces if the keys are not present or empty
            prompt_block = {
                'target': scalarstring.SingleQuotedScalarString(tab.get('target', ' ').strip()),
                'positive': scalarstring.SingleQuotedScalarString(tab.get('positive', ' ').strip()),
                'unconditional': scalarstring.SingleQuotedScalarString(tab.get('unconditional', ' ').strip()),
                'neutral': scalarstring.SingleQuotedScalarString(tab.get('neutral', ' ').strip()),
                'action': scalarstring.SingleQuotedScalarString(tab.get('action', 'enhance')),
                'guidance_scale': int(tab.get('guidance_scale', 4)),
                'resolution': int(data.get('resolution', 512)),
                'dynamic_resolution': data.get('dynamicResolution', False),
                'batch_size': int(data.get('batchSize', 1))
            }
            new_yaml_content.append(prompt_block)
        # Ensure there is always at least one block
    if not new_yaml_content:
        default_block = {
            'target': " ",
            'positive': " ",
            'unconditional': " ",
            'neutral': " ",
            'action': "enhance",
            'guidance_scale': 4,
            'resolution': int(data.get('resolution', 512)),
            'dynamic_resolution': data.get('dynamicResolution', False),
            'batch_size': int(data.get('batchSize', 1))
        }
        new_yaml_content.append(default_block)


    # Write the modified content back to the file
    with open(file_path, 'w') as file:
        yaml.dump(new_yaml_content, file)

    return f"Prompts YAML file updated: {file_path}"

# Example usage
#collected_data = collect_data()  # This function needs to be defined to collect data from the form
#modify_yaml_file('path/to/your/yaml/file.yaml', collected_data)



def restart_server():
    os.execv(__name__, os.argv)



if __name__ == "__main__":
    create_logs_subfolders()
    server_thread = Thread(target=start_server)
    server_thread.start()
