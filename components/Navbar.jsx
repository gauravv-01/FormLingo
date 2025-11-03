'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../styles/components/navbar.module.scss'

export default function Navbar() {
  const pathname = usePathname() || '/'

  const navItems = [
    { href: '/', label: 'Extract' },
    { href: '/translate', label: 'Translate' },
    { href: '/instructions', label: 'Instructions' },
  ]

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
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <li className="nav-item" key={href}>
                  <Link
                    href={href}
                    className={`nav-link ${isActive ? 'active fw-semibold text-primary' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    prefetch
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
