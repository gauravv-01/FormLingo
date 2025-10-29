'use client'

import Link from 'next/link'
import styles from '../styles/components/navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white sticky-top ${styles.navbar}`}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" href="/">
          FormLingo
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Extract
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/translate">
                Translate
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/instructions">
                Instructions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
