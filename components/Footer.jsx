'use client'

import Link from 'next/link'
import styles from '../styles/components/footer.module.scss'

export default function Footer() {
  return (
    <footer className={`footer py-4 mt-5 ${styles.footer}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-primary fw-bold">FormLingo</h5>
            <p className="text-muted small">
              Smart automation tool for SAP ABAP Adobe Forms translation
            </p>
          </div>
          
          <div className="col-md-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link href="/" className="text-muted text-decoration-none small">Extract XML</Link></li>
              <li><Link href="/translate" className="text-muted text-decoration-none small">Translate</Link></li>
              <li><Link href="/instructions" className="text-muted text-decoration-none small">Instructions</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h6 className="fw-bold">Connect</h6>
            <div className="d-flex gap-3">
              <a href="https://linkedin.com/in/gaurav-kumawat" target="_blank" rel="noopener noreferrer" className="text-muted">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="https://github.com/gaurav-kumawat" target="_blank" rel="noopener noreferrer" className="text-muted">
                <i className="bi bi-github fs-5"></i>
              </a>
              <a href="https://youtube.com/@gaurav-kumawat" target="_blank" rel="noopener noreferrer" className="text-muted">
                <i className="bi bi-youtube fs-5"></i>
              </a>
            </div>
          </div>
        </div>
        
        <hr className="my-3" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted small mb-0">
              © 2024 FormLingo. Created by Gaurav Kumawat, Associate Software Engineer at Accenture.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted small mb-0">
              Optimizing SAP processes with developer-friendly automation tools
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
