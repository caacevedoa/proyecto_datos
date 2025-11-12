from flask import Flask, jsonify, request 
import joblib 
import numpy as np 
from flask_cors import CORS

model = joblib.load('knn_model_p.pkl')

app = Flask(__name__)
CORS(app) 
@app.route('/estado_de_salud', methods = ["POST"]) 
def predict():
    data = request.get_json() 
    variables = np.array(data['variables']).reshape(1,-1) 
    prediction = model.predict(variables) 
    
    exit_labels = ['Sano','En riesgo']
   
    label = exit_labels[(prediction[0])]
    return jsonify({
                   "Estado":label
    })