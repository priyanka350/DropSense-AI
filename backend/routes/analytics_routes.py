from flask import Blueprint, jsonify

from utils.analytics_stats import (
    get_analytics_stats
)

analytics_bp = Blueprint(
    "analytics",
    __name__
)


@analytics_bp.route(
    "/analytics",
    methods=["GET"]
)
def analytics():

    return jsonify(
        get_analytics_stats()
    )