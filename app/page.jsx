'use client'

import { useState } from 'react'
import axios from 'axios'
import styles from '../styles/components/forms.module.scss'

export default function Home() {
  const [xmlString, setXmlString] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000)
  }

  const handleDownloadExcel = async () => {
    if (!xmlString.trim()) {
      showAlert('Please enter XML string before downloading Excel', 'danger')
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post('/api/extract', {
        xmlString: xmlString.trim()
      }, {
        responseType: 'blob'
      })

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'formlingo-extract.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      showAlert('Excel file downloaded successfully! Now you can add translations and upload it back.', 'success')
    } catch (error) {
      console.error('Error downloading Excel:', error)
      if (error.response?.data?.error) {
        showAlert(error.response.data.error, 'danger')
      } else {
        showAlert('Error downloading Excel file. Please try again.', 'danger')
      }
    } finally {
      setIsLoading(false)
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
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">
              Extract Text from XML STRING
            </h1>
            <p className="lead text-muted">
              Please paste the source XML tag string copied from SE63 Transaction. 
              <br />
              <small className="text-muted">
                (For more details, please refer to the <a href="/instructions" className="text-primary text-decoration-none">INSTRUCTIONS</a>.)
              </small>
            </p>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="mb-4">
                <label htmlFor="xmlInput" className="form-label fw-semibold">
                  XML String Input
                </label>
                <textarea
                  id="xmlInput"
                  className={`form-control ${styles.textarea}`}
                  rows="12"
                  placeholder="Paste your XML string here..."
                  value={xmlString}
                  onChange={(e) => setXmlString(e.target.value)}
                />
                <div className="form-text">
                  Paste the complete XML string of your SAP Adobe Form from SE63 transaction
                </div>
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-success btn-lg"
                  onClick={handleDownloadExcel}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-download me-2"></i>
                      Download Excel
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                    <span className="fw-bold">1</span>
                  </div>
                  <div className="text-start">
                    <div className="fw-semibold">Paste XML</div>
                    <small className="text-muted">Copy from SE63</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                    <span className="fw-bold">2</span>
                  </div>
                  <div className="text-start">
                    <div className="fw-semibold">Download Excel</div>
                    <small className="text-muted">Auto-generated</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                    <span className="fw-bold">3</span>
                  </div>
                  <div className="text-start">
                    <div className="fw-semibold">Translate & Upload</div>
                    <small className="text-muted">Get final XML</small>
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
