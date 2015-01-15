# JSON Uploader Overview

A simple JSON uploader, designed for uploading to Contentful (formally Storage Room) against a pre-defined schema. Feel free to reach out with queries (hello@bluer.com).

### Installation

You can install with the following command (note that you'll need both node / npm installed).

    npm install

### Prerequisites

You'll need to have converted the CSV to JSON (http://www.convertcsv.com/csv-to-json.htm) and place the resuling json file in the samesame directory as run.js.

Within run.js, update the following three entries:

    var content= fs.readFileSync("JSON_EXPORT.json", "utf8");
    var urlPath = "INSERT_URL";
    var authToken = "INSERT_TOKEN";

### To Run

    node run.js

### Converting data from CSV

This piece of work required converting data from CSV for which [csvtojson](https://www.npmjs.com/package/csvtojson) was used.