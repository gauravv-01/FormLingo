const XLSX = require('xlsx');

/**
 * Extract text content from XML string and return as array of key-value pairs
 * @param {string} xmlString - The XML string to process
 * @returns {Array} Array of objects with {key, value} pairs
 */
function extractTextFromXML(xmlString) {
  const extractedTexts = [];
  let bracesCount = 0;
  let tempStr = "";
  
  for (let i = 0; i < xmlString.length; i++) {
    if (xmlString[i] === "<") {
      bracesCount++;
    }
    if (xmlString[i] === ">") {
      bracesCount--;
    }
    
    if (bracesCount === 0) {
      if (tempStr.length > 0) {
        if (xmlString[i] === "\n" || xmlString[i] === "\r" || xmlString[i] === "\t") {
          tempStr = tempStr.trim();
          tempStr = tempStr.replace(/amp;/g, "");
          tempStr = tempStr.replace(/:/g, "");
          
          if (tempStr.length > 0) {
            extractedTexts.push({
              key: tempStr,
              value: "" // Empty value for user to fill in Excel
            });
          }
          tempStr = "";
          continue;
        }
      }
      if (xmlString[i] !== ">") {
        tempStr += xmlString[i];
      }
      continue;
    }
  }
  return extractedTexts;
}

/**
 * Translate XML string using translation mappings
 * @param {string} xmlString - The original XML string
 * @param {Object} translations - Object with key-value translation mappings
 * @returns {string} Translated XML string
 */
function translateXML(xmlString, translations) {
  let newStr = "";
  let bracesCount = 0;
  let tempStr = "";
  
  for (let i = 0; i < xmlString.length; i++) {
    if (xmlString[i] === "<") {
      bracesCount++;
    }
    if (xmlString[i] === ">") {
      bracesCount--;
      newStr += xmlString[i];
    }
    
    if (bracesCount === 0) {
      if (tempStr.length > 0) {
        if (xmlString[i] === "\n" || xmlString[i] === "\r" || xmlString[i] === "\t") {
          tempStr = tempStr.trim();
          tempStr = tempStr.replace(/amp;/g, "");
          tempStr = tempStr.replace(/:/g, "");
          
          const translatedString = translations[tempStr];
          
          if (translatedString == null || translatedString === "") {
            newStr += tempStr;
          } else {
            newStr += translatedString;
          }
          tempStr = "";
          newStr += xmlString[i];
          continue;
        }
      }
      if (xmlString[i] !== ">") {
        tempStr += xmlString[i];
      }
      continue;
    }
    newStr += xmlString[i];
  }
  
  return newStr;
}

/**
 * Create Excel file from extracted text data
 * @param {Array} extractedTexts - Array of {key, value} objects
 * @returns {Buffer} Excel file buffer
 */
function createExcelFile(extractedTexts) {
  // Prepare data for Excel
  const excelData = [
    ["Original Text", "Translated Text"], // Header row
    ...extractedTexts.map(item => [item.key, item.value])
  ];
  
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(excelData);
  
  // Set column widths
  ws['!cols'] = [
    { width: 50 }, // Original Text column
    { width: 50 }  // Translated Text column
  ];
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Translations");
  
  // Convert to buffer
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

/**
 * Read Excel file and extract translation mappings
 * @param {Buffer} excelBuffer - Excel file buffer
 * @returns {Object} Translation mappings object
 */
function readExcelTranslations(excelBuffer) {
  try {
    const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    const translations = {};
    
    // Skip header row (index 0) and process data rows
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0] && row[1]) { // Both key and value exist
        let key = row[0].toString().trim();
        key = key.replace(/amp;/g, "");
        key = key.replace(/:/g, "");
        translations[key] = row[1].toString();
      }
    }
    
    return translations;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    throw new Error("Failed to read Excel file");
  }
}

module.exports = {
  extractTextFromXML,
  translateXML,
  createExcelFile,
  readExcelTranslations
};
