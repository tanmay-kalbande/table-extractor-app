# Table Extractor - Web Scraping and Data Extraction

## Overview

The Table Extractor is a web application that allows users to extract tables from any webpage by providing the URL of the page. It utilizes Flask as the backend framework, BeautifulSoup for web scraping, and jQuery DataTables for efficient table rendering on the frontend. The application enables users to specify a table index in case a webpage contains multiple tables and provides the option to download the extracted data in CSV format.

## Features

- **Table Extraction:** Enter the URL of a webpage and, optionally, the index of the desired table to extract tabular data efficiently.

- **Dynamic Table Rendering:** Utilizes jQuery DataTables to dynamically render the extracted table, providing features like sorting, searching, and pagination.

- **CSV Download:** Download the extracted table data in CSV format for further analysis or storage.

- **Responsive Design:** The application is designed to work seamlessly on various screen sizes, providing a consistent user experience.

## Usage

1. **Enter URL and Table Index:**
   - Open the application in a web browser.
   - In the provided form, enter the URL of the webpage containing the table.
   - Optionally, specify the table index (default is 0) if the webpage has multiple tables.

2. **Extract Table:**
   - Click the "Extract Table" button to initiate the extraction process.
   - The extracted table will be displayed below the form using jQuery DataTables.

3. **Download Data:**
   - After extraction, a "Download as CSV" button will appear.
   - Click the button to download the extracted table data in CSV format.

4. **Additional Instructions:**
   - Ensure the provided URL is accessible and contains the desired table.
   - Specify the table index to extract a specific table from webpages with multiple tables.

## Project Structure

- **Frontend:**
  - `index.html`: HTML template with the form, result display, and table container.
  - `styles.css`: Stylesheet for styling the frontend.
  - `script.js`: JavaScript file containing functions for table extraction, rendering, and data download.

- **Backend:**
  - `app.py`: Flask application serving as the backend. Includes routes for rendering the frontend, extracting tables, and downloading table data.

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
  - jQuery DataTables for dynamic table rendering.

- **Backend:**
  - Flask (Python web framework)
  - BeautifulSoup for web scraping
  - pandas for data manipulation
  - Flask-CORS for handling cross-origin resource sharing

## Getting Started

1. Install the required Python libraries using `pip install -r requirements.txt`.
2. Run the Flask application using `python app.py`.
3. Open the application in a web browser (`http://localhost:5000` by default).

## Contact

For any inquiries or issues, please contact at devtanmay@proton.me.

## Attribution

This web application uses Flask, BeautifulSoup, jQuery, and DataTables.

## Social Links

- [GitHub](https://github.com/tanmay-kalbande?tab=repositories)
- [LinkedIn](https://www.linkedin.com/in/tanmay-kalbande)

---

*Note: This README provides a comprehensive overview and guide for using the Table Extractor application. It is designed for informational purposes and should not be copied directly for distribution or reproduction.*

![visitors](https://visitor-badge.laobi.icu/badge?page_id=tanmay-kalbande.tanmay-kalbande-table-extractor-app&left_color=teal&right_color=008b8b)
