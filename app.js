const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const folderPath = "your_folder_path_here"; // Replace with your desired folder path

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Endpoint to create a text file with the current timestamp
app.post("/create-file", (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${new Date().toISOString().replace(/:/g, "-")}.txt`;
  const filePath = path.join(folderPath, filename);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating file", error: err });
    }
    res
      .status(200)
      .json({ message: "File created successfully", filename: filename });
  });
});

// Endpoint to retrieve all text files in the folder
app.get("/list-files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading folder", error: err });
    }

    const textFiles = files.filter((file) => path.extname(file) === ".txt");
    res.status(200).json({ files: textFiles });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
