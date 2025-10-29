# FormLingo - SAP ABAP Adobe Forms Translation Tool

A smart automation tool built to simplify the SAP ABAP Adobe Forms translation process.

## 🚀 Features

- **Extract XML**: Paste XML from SAP SE63 and download auto-generated Excel
- **Translate**: Upload translated Excel and get final XML output
- **Instructions**: Step-by-step guide for the translation process
- **Responsive Design**: Mobile and tablet friendly
- **Modern UI**: Built with Bootstrap 5 and SCSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Bootstrap 5 + SCSS modules
- **HTTP Requests**: Axios
- **Icons**: Bootstrap Icons
- **Language**: JavaScript/JSX

## 📁 Project Structure

```
formlingo/
├── app/
│   ├── layout.jsx
│   ├── page.jsx (Home/Extract page)
│   ├── translate/
│   │   └── page.jsx
│   ├── instructions/
│   │   └── page.jsx
│   └── api/
│       ├── extract/route.js
│       └── translate/route.js
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
├── styles/
│   ├── globals.scss
│   └── components/
│       ├── navbar.module.scss
│       ├── footer.module.scss
│       ├── forms.module.scss
│       └── instructions.module.scss
└── package.json
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### 1. Extract XML
- Paste your XML string from SAP SE63
- Click "Download Excel" to get structured translation file

### 2. Translate
- Upload the translated Excel file
- Paste original XML string
- Click "Translate" to get final XML output

### 3. Instructions
- Follow the step-by-step guide
- Learn about FormLingo's features

## 🔧 API Endpoints

- `POST /api/extract` - Extract XML and return Excel file
- `POST /api/translate` - Translate XML using uploaded Excel

## 👨‍💻 About the Creator

**Gaurav Kumawat** - Associate Software Engineer at Accenture

Built FormLingo to solve the repetitive manual effort involved in SAP ABAP Adobe Form translations using SE63.

## 📄 License

MIT License - see LICENSE file for details
