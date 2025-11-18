from flask import Flask, jsonify, request 
import joblib 
import numpy as np 
from flask_cors import CORS

knn_model = joblib.load('knn_model_p.pkl')
reg_model = joblib.load('reg_model_p.pkl')
red_model = joblib.load('red_model_p.pkl')

app = Flask(__name__)
CORS(app) 
@app.route('/estado_de_salud', methods = ["POST"]) 
def predict():
    data = request.get_json() 
    variables = np.array(data['variables']).reshape(1,-1) 
   
    pred_knn = knn_model.predict(variables) 
    pred_red = red_model.predict(variables)

    valor_reg = reg_model.predict(variables)[0]
    
    exit_labels = ['Sano','En riesgo']
    if valor_reg >= 0.5:
        pred_reg = "En riesgo"
    else:
        pred_reg = "Sano"
   
    result = {
        "KNN": exit_labels[pred_knn[0]],
        "Red_Neuronal": exit_labels[pred_red[0]],
        "Regresion": pred_reg
    }

    return jsonify (result)