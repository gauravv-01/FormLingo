import { NextResponse } from 'next/server'
const { translateXML, readExcelTranslations } = require('../../../lib/xmlProcessor')

export async function POST(request) {
  try {
    const formData = await request.formData()
    const xmlString = formData.get('xmlString')
    const excelFile = formData.get('excelFile')
    
    if (!xmlString) {
      return NextResponse.json(
        { error: 'XML string is required' },
        { status: 400 }
      )
    }
    
    if (!excelFile) {
      return NextResponse.json(
        { error: 'Excel file is required' },
        { status: 400 }
      )
    }

    // Convert Excel file to buffer
    const excelBuffer = Buffer.from(await excelFile.arrayBuffer())
    
    // Read translations from Excel file
    const translations = readExcelTranslations(excelBuffer)
    
    if (Object.keys(translations).length === 0) {
      return NextResponse.json(
        { error: 'No valid translations found in Excel file' },
        { status: 400 }
      )
    }

    // Translate the XML string
    const translatedXml = translateXML(xmlString, translations)
    
    return NextResponse.json({
      success: true,
      translatedXml: translatedXml,
      message: 'Translation completed successfully',
      translationsCount: Object.keys(translations).length
    })
  } catch (error) {
    console.error('Error in translate API:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    )
  }
}
