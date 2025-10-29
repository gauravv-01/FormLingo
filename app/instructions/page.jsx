'use client'

import styles from '../../styles/components/instructions.module.scss'

export default function InstructionsPage() {
  return (
    <div className="container py-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">
              How to Use FormLingo
            </h1>
            <p className="lead text-muted">
              Step-by-step guide to automate your SAP ABAP Adobe Forms translation process
            </p>
          </div>

          {/* Step-by-step Instructions */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <span className="fw-bold fs-5">1</span>
                    </div>
                    <h4 className="mb-0">Extract XML from SAP</h4>
                  </div>
                  <p className="text-muted">
                    In your SAP system, go to SE63 (Translation) and copy the complete XML string from your Adobe Form. 
                    This XML contains all the text elements that need translation.
                  </p>
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Tip:</strong> Make sure to copy the entire XML structure, not just parts of it.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <span className="fw-bold fs-5">2</span>
                    </div>
                    <h4 className="mb-0">Paste & Download Excel</h4>
                  </div>
                  <p className="text-muted">
                    Paste the XML string into FormLingo's text area and click "Download Excel". 
                    The tool will automatically extract all text elements and generate a structured Excel file.
                  </p>
                  <div className="alert alert-success">
                    <i className="bi bi-check-circle me-2"></i>
                    <strong>Result:</strong> You'll get a clean Excel file with all text elements listed clearly.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <span className="fw-bold fs-5">3</span>
                    </div>
                    <h4 className="mb-0">Translate in Excel</h4>
                  </div>
                  <p className="text-muted">
                    Open the downloaded Excel file and add your translations in the designated columns. 
                    You can work with translators or translate yourself - the format is clear and organized.
                  </p>
                  <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    <strong>Important:</strong> Don't modify the structure, only add translations in the specified columns.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <span className="fw-bold fs-5">4</span>
                    </div>
                    <h4 className="mb-0">Upload & Get Final XML</h4>
                  </div>
                  <p className="text-muted">
                    Upload the translated Excel file back to FormLingo, paste your original XML, 
                    and click "Translate". Get your final translated XML ready to use in SAP.
                  </p>
                  <div className="alert alert-success">
                    <i className="bi bi-check-circle me-2"></i>
                    <strong>Done!</strong> Copy the final XML and paste it back into SE63.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About FormLingo */}
          <div className="card shadow-sm mb-5">
            <div className="card-body p-5">
              <h2 className="text-primary mb-4">About FormLingo</h2>
              <p className="lead mb-4">
                FormLingo is a smart automation tool built to simplify the SAP ABAP Adobe Forms translation process.
              </p>
              <p className="mb-4">
                In the traditional method using SE63, developers spend hours manually extracting each text element, 
                preparing Excel sheets, and pasting translations back one by one — a time-consuming and error-prone task.
              </p>
              <p className="mb-4">
                With FormLingo, you just:
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Paste your XML string containing the Adobe Form texts
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Download the auto-generated Excel file with all text elements listed clearly
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Upload the translated Excel back to the tool
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Get your final XML output — with all translations perfectly replaced in one go
                </li>
              </ul>
              <div className="alert alert-primary">
                <h5 className="alert-heading">
                  <i className="bi bi-lightbulb me-2"></i>
                  No more manual work!
                </h5>
                <p className="mb-0">
                  No more manual copy-paste, no more hunting down individual text nodes. 
                  Just automation, accuracy, and efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* About the Creator */}
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <div className="row align-items-center">
                <div className="col-md-3 text-center mb-3 mb-md-0">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '100px', height: '100px'}}>
                    <i className="bi bi-person-fill fs-1"></i>
                  </div>
                </div>
                <div className="col-md-9">
                  <h3 className="text-primary mb-3">About the Creator</h3>
                  <p className="mb-3">
                    I'm <strong>Gaurav Kumawat</strong>, an Associate Software Engineer at Accenture.
                  </p>
                  <p className="mb-3">
                    While working on SAP ABAP Adobe Form translations, I realized how much repetitive manual effort 
                    was involved in using SE63. To solve this challenge, I built FormLingo — a simple yet powerful 
                    web tool to automate the translation workflow for developers like me.
                  </p>
                  <p className="mb-0">
                    This project reflects my passion for optimizing SAP processes and creating developer-friendly 
                    automation tools that make everyday tasks faster and smarter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
