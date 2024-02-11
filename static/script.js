function extractTable() {
    var url = document.getElementById('url').value;
    var tableIndex = document.getElementById('tableIndex').value;

    // Make a POST request to the backend to extract the table data
    $.ajax({
        type: 'POST',
        url: '/extract_table',
        data: {
            url: url,
            tableIndex: tableIndex
        },
        success: function(response) {
            // Parse the JSON response
            var data = JSON.parse(response);
            // Render the table
            renderTable(data);
        },
        error: function(xhr, status, error) {
            // Handle errors
            console.error(error);
            document.getElementById('result').innerHTML = 'Error extracting table: ' + error;
        }
    });
}

function renderTable(data) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';

    if (Array.isArray(data) && data.length > 0) {
        const table = document.createElement('table');
        table.className = 'table';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        Object.keys(data[0]).forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Append table to container
        tableContainer.appendChild(table);

        // Initialize DataTable
        $(table).DataTable({
            "paging": true,
            "ordering": true,
            "info": true,
            "responsive": true,
            "stripeClasses": ['odd', 'even'],
            "lengthChange": true,
            "searching": true,
            "columnDefs": [
                { "orderable": false, "targets": "no-sort" }
            ]
        });
    } else {
        // Show error message if no table found
        document.getElementById('result').innerHTML = 'No table found.';
    }
}

function downloadData(format) {
    var url = document.getElementById('url').value;
    var tableIndex = document.getElementById('tableIndex').value;

    // Make a POST request to the backend to extract the table data
    $.ajax({
        type: 'POST',
        url: '/extract_table',
        data: {
            url: url,
            tableIndex: tableIndex
        },
        success: function(response) {
            // Parse the JSON response
            var data = JSON.parse(response);
            // Download the data in the specified format
            downloadFile(data, format);
        },
        error: function(xhr, status, error) {
            // Handle errors
            console.error(error);
            document.getElementById('result').innerHTML = 'Error extracting table: ' + error;
        }
    });
}

function downloadFile(data, format) {
    // Create a FormData object to send data to the backend
    var formData = new FormData();
    formData.append('tableData', JSON.stringify(data));
    formData.append('format', format);

    // Make a POST request to download the data
    fetch('/download_table', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // If the response is successful, trigger the download
            response.blob().then(blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                // For CSV format, keep the file extension as .csv
                a.download = 'table_data.csv';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
        } else {
            // If the response is not successful, show an error message
            response.text().then(errorMessage => {
                console.error(errorMessage);
                document.getElementById('result').innerHTML = 'Error downloading data: ' + errorMessage;
            });
        }
    })
    .catch(error => {
        console.error(error);
        document.getElementById('result').innerHTML = 'Error downloading data: ' + error;
    });
}
