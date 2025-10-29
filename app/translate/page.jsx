'use client'

import { useState, useRef } from 'react'
import axios from 'axios'
import styles from '../../styles/components/forms.module.scss'

export default function TranslatePage() {
  const [inputXml, setInputXml] = useState('')
  const [outputXml, setOutputXml] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })
  const fileInputRef = useRef(null)

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      showAlert('Excel file selected successfully!', 'success')
    } else {
      showAlert('Please select a valid Excel file (.xlsx)', 'danger')
    }
  }

  const handleTranslate = async () => {
    if (!inputXml.trim()) {
      showAlert('Please enter input XML string', 'danger')
      return
    }

    const file = fileInputRef.current?.files[0]
    if (!file) {
      showAlert('Please upload the translated Excel file', 'danger')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('xmlString', inputXml.trim())
      formData.append('excelFile', file)

      const response = await axios.post('/api/translate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setOutputXml(response.data.translatedXml)
      showAlert(`Translation completed successfully! ${response.data.translationsCount} translations applied.`, 'success')
    } catch (error) {
      console.error('Error translating:', error)
      if (error.response?.data?.error) {
        showAlert(error.response.data.error, 'danger')
      } else {
        showAlert('Error during translation. Please try again.', 'danger')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyToClipboard = async () => {
    if (!outputXml.trim()) {
      showAlert('No output to copy', 'warning')
      return
    }

    try {
      await navigator.clipboard.writeText(outputXml)
      showAlert('Copied to clipboard!', 'success')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      showAlert('Failed to copy to clipboard', 'danger')
    }
  }

  return (
    <div className="container py-5 fade-in">
      {/* Alert */}
      {alert.show && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setAlert({ show: false, message: '', type: '' })}
          ></button>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">
              Once Translation Done, Please Upload the Excel File
            </h1>
            <p className="lead text-muted">
              Please upload the excel in the specified format only.
              <br />
              <small className="text-muted">
                (For more details, read <a href="/instructions" className="text-primary text-decoration-none">INSTRUCTIONS</a>.)
              </small>
            </p>
          </div>

          {/* File Upload Section */}
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="card-title mb-3">Upload Translated Excel File</h5>
              <div className="mb-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="form-control"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                />
                <div className="form-text">
                  Select the Excel file that contains your translations
                </div>
              </div>
            </div>
          </div>

          {/* XML Input/Output Section */}
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="row g-4">
                {/* Input XML */}
                <div className="col-md-6">
                  <label htmlFor="inputXml" className="form-label fw-semibold">
                    Input XML String
                  </label>
                  <textarea
                    id="inputXml"
                    className={`form-control ${styles.textarea}`}
                    rows="15"
                    placeholder="Paste your original XML string here..."
                    value={inputXml}
                    onChange={(e) => setInputXml(e.target.value)}
                  />
                </div>

                {/* Output XML */}
                <div className="col-md-6">
                  <label htmlFor="outputXml" className="form-label fw-semibold">
                    Output XML String
                  </label>
                  <textarea
                    id="outputXml"
                    className={`form-control ${styles.textarea}`}
                    rows="15"
                    placeholder="Translated XML will appear here..."
                    value={outputXml}
                    readOnly
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex gap-3 flex-wrap">
                    <button
                      className="btn btn-success btn-lg"
                      onClick={handleTranslate}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Translating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-translate me-2"></i>
                          Translate
                        </>
                      )}
                    </button>
                    
                    <button
                      className="btn btn-outline-secondary btn-lg"
                      onClick={handleCopyToClipboard}
                      disabled={!outputXml.trim()}
                    >
                      <i className="bi bi-clipboard me-2"></i>
                      Copy to Clipboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="mt-5 text-center">
            <h5 className="mb-4">Translation Process</h5>
            <div className="row g-3">
              <div className="col-md-3">
                <div className="d-flex flex-column align-items-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{width: '50px', height: '50px'}}>
                    <span className="fw-bold">1</span>
                  </div>
                  <div className="text-center">
                    <div className="fw-semibold">Upload Excel</div>
                    <small className="text-muted">Translated file</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex flex-column align-items-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{width: '50px', height: '50px'}}>
                    <span className="fw-bold">2</span>
                  </div>
                  <div className="text-center">
                    <div className="fw-semibold">Paste XML</div>
                    <small className="text-muted">Original string</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex flex-column align-items-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{width: '50px', height: '50px'}}>
                    <span className="fw-bold">3</span>
                  </div>
                  <div className="text-center">
                    <div className="fw-semibold">Click Translate</div>
                    <small className="text-muted">Process data</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex flex-column align-items-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{width: '50px', height: '50px'}}>
                    <span className="fw-bold">4</span>
                  </div>
                  <div className="text-center">
                    <div className="fw-semibold">Copy Result</div>
                    <small className="text-muted">Final XML</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
