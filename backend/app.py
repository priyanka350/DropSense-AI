from flask import Flask
from flask_cors import CORS

from routes.predict_routes import (
    predict_bp
)

from routes.dashboard_routes import (
    dashboard_bp
)

from routes.analytics_routes import (
    analytics_bp
)

app = Flask(__name__)

CORS(app)

app.register_blueprint(
    predict_bp
)
app.register_blueprint(
    dashboard_bp
)
app.register_blueprint(
    analytics_bp
)
@app.route('/')
def home():

    return {
        "message":
        "Student Dropout API Running"
    }


if __name__ == '__main__':

    app.run(
        debug=True
    )