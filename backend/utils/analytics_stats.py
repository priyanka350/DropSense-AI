import pandas as pd
import joblib


# ----------------------------
# Load Dataset
# ----------------------------

df = pd.read_csv(
    "database/data.csv",
    sep=";"
)


# ----------------------------
# Load CatBoost Model
# ----------------------------

model = joblib.load(
    "saved_models/catboost_dropout_model.pkl"
)


feature_names = joblib.load(
    "saved_models/feature_names.pkl"
)


# ----------------------------
# Analytics
# ----------------------------

def get_analytics_stats():

    total_students = len(df)

    graduates = len(
        df[df["Target"] == "Graduate"]
    )

    enrolled = len(
        df[df["Target"] == "Enrolled"]
    )

    dropouts = len(
        df[df["Target"] == "Dropout"]
    )

    retention_rate = round(
        ((graduates + enrolled) / total_students) * 100,
        2
    )

    dropout_rate = round(
        (dropouts / total_students) * 100,
        2
    )

    average_admission = round(
        df["Admission grade"].mean(),
        2
    )

    scholarship = int(
        df["Scholarship holder"].sum()
    )

    # ----------------------------
    # Risk Distribution
    # ----------------------------

    risk_distribution = [

        {
            "name": "High Risk",
            "value": dropouts
        },

        {
            "name": "Moderate Risk",
            "value": enrolled
        },

        {
            "name": "Low Risk",
            "value": graduates
        }

    ]

    # ----------------------------
    # Target Distribution
    # ----------------------------

    status_distribution = [

        {
            "status": "Graduate",
            "count": graduates
        },

        {
            "status": "Enrolled",
            "count": enrolled
        },

        {
            "status": "Dropout",
            "count": dropouts
        }

    ]

    # ----------------------------
    # Gender Distribution
    # ----------------------------

    gender_distribution = [

        {
            "gender": "Female",

            "count":
            len(
                df[
                    df["Gender"] == 0
                ]
            )

        },

        {
            "gender": "Male",

            "count":
            len(
                df[
                    df["Gender"] == 1
                ]
            )

        }

    ]

    # ----------------------------
    # Scholarship
    # ----------------------------

    scholarship_distribution = [

        {

            "name": "Scholarship",

            "count":
            scholarship

        },

        {

            "name": "No Scholarship",

            "count":
            total_students - scholarship

        }

    ]

    # ----------------------------
    # Feature Importance
    # ----------------------------

    importances = model.get_feature_importance()

    feature_importance = []

    for feature, importance in zip(
        feature_names,
        importances
    ):

        feature_importance.append({

            "feature": feature,

            "importance": round(
                float(importance),
                2
            )

        })

    feature_importance = sorted(

        feature_importance,

        key=lambda x: x["importance"],

        reverse=True

    )

    return {

        "summary": {

            "total_students":
            total_students,

            "retention_rate":
            retention_rate,

            "dropout_rate":
            dropout_rate,

            "average_admission":
            average_admission,

            "scholarship":
            scholarship

        },

        "risk_distribution":
        risk_distribution,

        "status_distribution":
        status_distribution,

        "gender_distribution":
        gender_distribution,

        "scholarship_distribution":
        scholarship_distribution,

        "feature_importance":
        feature_importance

    }