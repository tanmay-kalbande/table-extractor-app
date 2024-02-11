# app.py (Flask backend)
from flask import Flask, render_template, request, jsonify, Response
import requests
from bs4 import BeautifulSoup
import pandas as pd
from io import StringIO
from flask_cors import CORS

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

@app.route('/')
def index():
    return render_template('frontend/index.html')

@app.route('/extract_table', methods=['POST'])
def extract_table():
    url = request.form.get('url')
    table_index = int(request.form.get('tableIndex', 0))

    if not url:
        return jsonify({"error": "URL parameter is missing"}), 400

    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to fetch URL: {str(e)}"}), 500

    html_content = response.content
    soup = BeautifulSoup(html_content, 'html.parser')
    tables = soup.find_all('table')

    if table_index >= len(tables):
        return jsonify({"error": "Table index out of range"}), 400

    table = tables[table_index]
    table_html = str(table)
    df = pd.read_html(StringIO(table_html))[0]

    json_data = df.to_json(orient='records')
    return jsonify(json_data)

@app.route('/download_table', methods=['POST'])
def download_table():
    table_data = request.form.get('tableData')
    format = request.form.get('format')

    df = pd.read_json(table_data)

    if format == 'csv':
        file_data = df.to_csv(index=False)
        mimetype = 'text/csv'
        filename = 'table_data.csv'
    else:
        return jsonify({"error": "Unsupported format"}), 400

    return Response(
        file_data,
        mimetype=mimetype,
        headers={"Content-disposition": f"attachment; filename={filename}"}
    )

if __name__ == '__main__':
    app.run(debug=True)
