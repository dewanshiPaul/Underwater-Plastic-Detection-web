from flask import Flask, jsonify, send_file, request, make_response
from flask_cors import CORS
import os
import cv2
from keras.models import load_model
from keras_preprocessing.image import load_img, img_to_array
import numpy as np

app = Flask(__name__)
CORS(app)

app.config['IMAGE_FOLDER'] = os.path.join('.','static','images')
app.config['MODEL'] = os.path.join('.','static','model','best_model.h5')

@app.route('/getCapturedImage', methods=['GET'])
def getCapturedImage():
    try:
        file = request.args['filename']
        resp = send_file(os.path.join(app.config['IMAGE_FOLDER'], str(file)+'.jpg'), as_attachment=True, mimetype='image/jpg')
        return resp,200
            
    except Exception as e:
        print(str(e))
        return jsonify({
            'err': str(e),
        }), 500

@app.route('/getPrediction', methods=['GET'])
def getPrediction():
    try:
        file = request.args['filename']
        img = load_img(os.path.join(app.config['IMAGE_FOLDER'],str(file)+'.jpg'), target_size=(416,416))
        img = img_to_array(img)
        img = np.expand_dims(img, axis=0)
        model = load_model(app.config['MODEL'])
        pred = model.predict(img)
        print(pred)
        if(np.argmax(pred[0]) == 1):
            res = 'Underwater plastic detected'
        else:
            res = 'Underwater plastic not detected'
        return jsonify({
            'res': res
        }), 200

    except Exception as e:
        print(str(e))
        return jsonify({
            'err': e,
        }), 500

@app.route('/startCapture', methods=['GET'])
def startCapture():
    try:
        #raspberry pi template to take pi camera input
        # for cnt in range(1,11):
        #     path = os.path.join(app.config['IMAGE_FOLDER'],str(cnt)+'.jpg')
        #     img = '' ##image captured using cv2 in raspberry pi
        #     cv2.imwrite(path, img)
        return jsonify({
            'msg': 'ok'
        }), 200
    except Exception as e:
        print(str(e))
        return jsonify({
            'err': e,
        }), 500