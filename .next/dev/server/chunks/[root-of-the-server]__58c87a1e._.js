module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/xmlProcessor.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const XLSX = __turbopack_context__.r("[project]/node_modules/xlsx/xlsx.mjs [app-route] (ecmascript)");
/**
 * Extract text content from XML string and return as array of key-value pairs
 * @param {string} xmlString - The XML string to process
 * @returns {Array} Array of objects with {key, value} pairs
 */ function extractTextFromXML(xmlString) {
    const extractedTexts = [];
    let bracesCount = 0;
    let tempStr = "";
    for(let i = 0; i < xmlString.length; i++){
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
    console.log(extractedTexts);
    return extractedTexts;
}
/**
 * Translate XML string using translation mappings
 * @param {string} xmlString - The original XML string
 * @param {Object} translations - Object with key-value translation mappings
 * @returns {string} Translated XML string
 */ function translateXML(xmlString, translations) {
    let newStr = "";
    let bracesCount = 0;
    let tempStr = "";
    for(let i = 0; i < xmlString.length; i++){
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
 */ function createExcelFile(extractedTexts) {
    // Prepare data for Excel
    const excelData = [
        [
            "Original Text",
            "Translated Text"
        ],
        ...extractedTexts.map((item)=>[
                item.key,
                item.value
            ])
    ];
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    // Set column widths
    ws['!cols'] = [
        {
            width: 50
        },
        {
            width: 50
        } // Translated Text column
    ];
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Translations");
    // Convert to buffer
    return XLSX.write(wb, {
        type: 'buffer',
        bookType: 'xlsx'
    });
}
/**
 * Read Excel file and extract translation mappings
 * @param {Buffer} excelBuffer - Excel file buffer
 * @returns {Object} Translation mappings object
 */ function readExcelTranslations(excelBuffer) {
    try {
        const workbook = XLSX.read(excelBuffer, {
            type: 'buffer'
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, {
            header: 1
        });
        const translations = {};
        // Skip header row (index 0) and process data rows
        for(let i = 1; i < data.length; i++){
            const row = data[i];
            if (row[0] && row[1]) {
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
}),
"[project]/app/api/extract/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const { extractTextFromXML, createExcelFile } = __turbopack_context__.r("[project]/lib/xmlProcessor.js [app-route] (ecmascript)");
async function POST(request) {
    try {
        const { xmlString } = await request.json();
        if (!xmlString) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'XML string is required'
            }, {
                status: 400
            });
        }
        // Extract text content from XML
        const extractedTexts = extractTextFromXML(xmlString);
        if (extractedTexts.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No text content found in XML string'
            }, {
                status: 400
            });
        }
        // Create Excel file with extracted texts
        const excelBuffer = createExcelFile(extractedTexts);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](excelBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="formlingo-extract.xlsx"'
            }
        });
    } catch (error) {
        console.error('Error in extract API:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__58c87a1e._.js.map