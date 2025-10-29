import { NextResponse } from 'next/server'
const { extractTextFromXML, createExcelFile } = require('../../../lib/xmlProcessor')

export async function POST(request) {
  try {
    const { xmlString } = await request.json()
    
    if (!xmlString) {
      return NextResponse.json(
        { error: 'XML string is required' },
        { status: 400 }
      )
    }

    // Extract text content from XML
    const extractedTexts = extractTextFromXML(xmlString)
    
    if (extractedTexts.length === 0) {
      return NextResponse.json(
        { error: 'No text content found in XML string' },
        { status: 400 }
      )
    }

    // Create Excel file with extracted texts
    const excelBuffer = createExcelFile(extractedTexts)
    
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="formlingo-extract.xlsx"',
      },
    })
  } catch (error) {
    console.error('Error in extract API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
