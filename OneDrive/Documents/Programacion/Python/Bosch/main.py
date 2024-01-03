# -*- coding: utf-8 -*-
"""
Created on Wed Nov  8 13:44:59 2023

@author: santi
"""

#import cv2
import numpy as np
from PIL import Image
import math
import os
import matplotlib.pyplot as plt
import requests
from flask import Flask, request, jsonify
#from flask_cors import CORS
import json
app = Flask(__name__)

#CORS(app) 

def sum_channels(channels):
    red = channels[0]
    green = channels[1]
    blue = channels[2]
    sum = 0.2989 * red + 0.5870 * green + 0.1140 * blue
    return round(sum, 2)

ref = Image.open('REF_23.png')
image_array = np.array(ref)
height = image_array.shape[0]
width = image_array.shape[1]

tercerCuadranteY=height-height//4
tercerCuadranteX=width-width//4

segundoCuadranteY=height//2
segundoCuadranteX=width//2


def obtener_esquina_C(image_array):
    height = image_array.shape[0]
    width = image_array.shape[1]

    tercerCuadranteY=height-height//4
    tercerCuadranteX=width-width//4

    segundoCuadranteY=height//2
    segundoCuadranteX=width//2
    x=width//4
    negro=False
    while not negro:
        for i in range(tercerCuadranteY,segundoCuadranteY,-1):
            if sum_channels(image_array[i][x]) < 20:
                negro=True;
                cX=x
                cY=i
                break
        x=x+1
    return [cX,cY]

def obtener_esquina_B(image_array):
    height = image_array.shape[0]
    width = image_array.shape[1]

    tercerCuadranteY=height-height//4
    tercerCuadranteX=width-width//4

    segundoCuadranteY=height//2
    segundoCuadranteX=width//2
    x=tercerCuadranteX
    negro=False
    while not negro:
        for i in range(height//4,segundoCuadranteY,+1):
            if sum_channels(image_array[i][x]) < 20:
                negro=True;
                cX=x
                cY=i
                break
        x=x-1
    return [cX,cY]

def obtener_esquina_A(image_array):
    height = image_array.shape[0]
    width = image_array.shape[1]

    tercerCuadranteY=height-height//4
    tercerCuadranteX=width-width//4

    segundoCuadranteY=height//2
    segundoCuadranteX=width//2
    y=height//4
    negro=False
    while not negro:
        for i in range(width//4,segundoCuadranteX,+1):
            if sum_channels(image_array[y][i]) < 20:
                negro=True;
                cX=i
                cY=y
                break
        y=y+1
    return [cX,cY]

def obtener_esquina_D(image_array):
    height = image_array.shape[0]
    width = image_array.shape[1]

    tercerCuadranteY=height-height//4
    tercerCuadranteX=width-width//4

    segundoCuadranteY=height//2
    segundoCuadranteX=width//2
    y=tercerCuadranteY
    negro=False
    while not negro:
        for i in range(tercerCuadranteX,segundoCuadranteX,-1):
            if sum_channels(image_array[y][i]) < 20:
                negro=True;
                cX=i
                cY=y
                break
        y=y-1
    return [cX,cY]

def obtenerCoordenadas(image_array):
    coordenadas=[]
    coordenadas.append(obtener_esquina_A(image_array))
    coordenadas.append(obtener_esquina_B(image_array))
    coordenadas.append(obtener_esquina_C(image_array))
    coordenadas.append(obtener_esquina_D(image_array))
    return coordenadas


def distanciaEntrePuntos(coordsA, coordsB):
    distancia = math.sqrt((coordsB[0] - coordsA[0]) ** 2 + (coordsB[1] - coordsA[1]) ** 2)
    return distancia
    distancia = distanciaEntrePuntos(coordsA[0], coordsA[1])
    return distancia

def compararCoordenadas(coordsREF,arrayB):
    diferenciaMax=10
    coordsB=obtenerCoordenadas(arrayB)
    for i in range(4):
        if(distanciaEntrePuntos(coordsREF[i],coordsB[i])>diferenciaMax): #Aqui decidimos la distancia entre todas las esquinas del cuadrado y si esta es mayor que el valor decidido entonces regresaremos que no esta centrado correctamente   
            return False
    return True


def revisarCentrado(nomCarpeta,nomImgREF):
    ref = Image.open(nomImgREF)
    ref_array = np.array(ref)
    coords_ref=obtenerCoordenadas(ref_array)
 
    # Obtener la lista de archivos en el directorio
    files = os.listdir(nomCarpeta)
    
    # Filtrar solo los archivos de imagen
    image_files = [f for f in files]
    
    centrado=[]
    coordenadas=[]
    # Iterar sobre la lista de archivos de imagen y procesar cada imagen
    for image_file in image_files:
        condicion=[]
        condicion.append(image_file)
        # Cargar la imagen y procesarla
        image_path = os.path.join(nomCarpeta, image_file)
        image = Image.open(image_path)
        image_array = np.array(image)
        condicion.append(compararCoordenadas(coords_ref,image_array))
        # Hacer algo con las coordenadas obtenidas
        centrado.append(condicion)
    return centrado

#print(revisarCentrado('./Hackaton','REF_23.png'))
    # Guardar la imagen procesada


app=Flask(__name__)


@app.route("/get-centrado/")
def get_centrado():
    result= revisarCentrado('./Hackaton','REF_23.png')
    result_json={}
    for item in result:
       result_json[item[0]] = item[1]
    json_result=json.dumps(result_json)
    return json_result
   # Convert the result_json to JSON using json.dumps or jsonify
   # json.dumps is used if you want to return a JSON string, jsonify for a JSON response
   # OR
   # json_result = jsonify(result_json)
   


if __name__ =="__main__":
    app.run(debug=True)

