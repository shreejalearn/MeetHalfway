from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.metrics import silhouette_score
from sklearn.model_selection import ParameterGrid

app = Flask(__name__)

def process_data(data):
    try:
        # Ensure that the incoming data is a list of dictionaries
        if not isinstance(data, list) or not all(isinstance(item, dict) for item in data):
            raise ValueError('Invalid JSON data format')

        # Create a DataFrame from the parsed data
        df = pd.DataFrame(data)
        coords = df[['latitude', 'longitude']].values
        coords_radians = np.radians(coords)

        return df, coords, coords_radians
    except Exception as e:
        raise e

def find_best_dbscan_model(coords_radians):
    param_grid = {
        'eps': [0.01, 0.05, 0.1, 0.2, 0.3, 0.35, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        'min_samples': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }

    best_score = -1
    best_params = None

    for params in ParameterGrid(param_grid):
        db = DBSCAN(algorithm='ball_tree', metric='haversine', **params)
        labels = db.fit_predict(coords_radians)

        unique_labels = np.unique(labels)
        if len(unique_labels) > 1:
            score = silhouette_score(coords_radians, labels)

            if score > best_score:
                best_score = score
                best_params = params

    return best_params

def calculate_cluster_stats(coords, labels):
    unique_labels = np.unique(labels)
    cluster_centers = []
    cluster_sizes = []

    for label in unique_labels:
        if label == -1:
            continue

        cluster_points = coords[label == labels]
        cluster_size = len(cluster_points)
        cluster_center = np.mean(cluster_points, axis=0)

        cluster_centers.append(cluster_center)
        cluster_sizes.append(cluster_size)

    return cluster_centers, cluster_sizes

@app.route('/api/model_weighted', methods=['POST'])
def weighted_model_api():
    try:
        data = request.get_json(force=True)
        df, coords, coords_radians = process_data(data)
        best_params = find_best_dbscan_model(coords_radians)

        if best_params:
            db = DBSCAN(eps=best_params['eps'], min_samples=best_params['min_samples'], algorithm='ball_tree', metric='haversine').fit(np.radians(coords))
            labels = db.labels_
        else:
            labels = []

        cluster_centers, cluster_sizes = calculate_cluster_stats(coords, labels)

        total_size = sum(cluster_sizes)
        weighted_average = np.sum(np.array(cluster_centers) * np.array(cluster_sizes)[:, np.newaxis], axis=0) / total_size

        return jsonify({'result': weighted_average.tolist()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/model_unweighted', methods=['POST'])
def unweighted_model_api():
    try:
        data = request.get_json(force=True)
        df, coords, coords_radians = process_data(data)
        best_params = find_best_dbscan_model(coords_radians)

        if best_params:
            db = DBSCAN(eps=best_params['eps'], min_samples=best_params['min_samples'], algorithm='ball_tree', metric='haversine').fit(np.radians(coords))
            labels = db.labels_
        else:
            labels = []

        cluster_centers, _ = calculate_cluster_stats(coords, labels)
        mean_of_centers = np.mean(cluster_centers, axis=0)

        return jsonify({'result': mean_of_centers.tolist()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
