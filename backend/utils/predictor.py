import joblib
import pandas as pd
import shap


# Load saved files
model = joblib.load(
    'saved_models/catboost_dropout_model.pkl'
)

feature_names = joblib.load(
    'saved_models/feature_names.pkl'
)

explainer = shap.TreeExplainer(model)


def predict_student(student_data):

    input_df = pd.DataFrame(
        [student_data]
    )

    input_df = input_df[
        feature_names
    ]

    probability = model.predict_proba(
        input_df
    )[0][1]

    prediction = model.predict(
        input_df
    )[0]

    shap_values = explainer.shap_values(
        input_df
    )

    feature_impact = dict(
        zip(
            feature_names,
            shap_values[0]
        )
    )

    top_factors = sorted(
        feature_impact.items(),
        key=lambda x: abs(x[1]),
        reverse=True
    )[:4]

    return {
        "prediction": int(prediction),
        "risk_score": round(
            float(probability * 100), 2
        ),
        "risk_level":
            "High Risk"
            if probability > 0.7
            else
            "Moderate Risk"
            if probability > 0.4
            else
            "Low Risk",

        "top_factors": [
            factor[0]
            for factor in top_factors
        ]
    }
def batch_predict(df):

    original_df = df.copy()

    df = df[feature_names]

    probabilities = model.predict_proba(df)[:, 1]

    results = []

    for index, probability in enumerate(probabilities):

        risk_score = round(
            float(probability * 100),
            2
        )

        risk_level = (
            "High Risk"
            if probability > 0.7
            else
            "Moderate Risk"
            if probability > 0.4
            else
            "Low Risk"
        )

        results.append({

            "student_name":
                original_df.iloc[index][
                    "Student_Name"
                ]
                if "Student_Name" in original_df.columns
                else f"Student {index+1}",

            "risk_score":
                risk_score,

            "risk_level":
                risk_level

        })

    return results