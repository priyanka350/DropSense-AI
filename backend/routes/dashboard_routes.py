from flask import Blueprint, jsonify
from utils.dashboard_stats import get_dashboard_stats

dashboard_bp = Blueprint(
    "dashboard",
    __name__
)

@dashboard_bp.route(
    "/dashboard",
    methods=["GET"]
)
def dashboard():

    return jsonify(
        get_dashboard_stats()
    )