from flask import Blueprint, request, jsonify
import pandas as pd

from utils.predictor import (
    predict_student,
    batch_predict
)

predict_bp = Blueprint(
    'predict',
    __name__
)


@predict_bp.route(
    '/predict',
    methods=['POST']
)
def predict():

    try:

        data = request.json

        result = predict_student(data)

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


@predict_bp.route(
    '/predict-batch',
    methods=['POST']
)
def predict_batch():

    try:

        file = request.files['file']

        df = pd.read_csv(file)

        results = batch_predict(df)

        return jsonify({

            "message":
            "File received successfully",

            "rows":
            len(df),

            "results":
            results


        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500