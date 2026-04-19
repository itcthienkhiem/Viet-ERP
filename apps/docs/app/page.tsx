import { DOCUMENTATION, getTableOfContents } from '../src/content'

export default function DocsPage() {
  const toc = getTableOfContents()
  const intro = DOCUMENTATION.find(d => d.id === 'intro')

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: '#161b22', borderRight: '1px solid #30363d', padding: '1.5rem 1rem', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#58a6ff', margin: 0 }}>VietERP Docs</h1>
          <p style={{ fontSize: '0.75rem', color: '#8b949e', margin: '0.25rem 0 0' }}>Developer Portal</p>
        </div>
        {toc.map(cat => (
          <div key={cat.category} style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem' }}>
              {cat.categoryLabel}
            </p>
            {cat.sections.map(s => (
              <a key={s.id} href={`#${s.id}`} style={{ display: 'block', padding: '0.3rem 0.5rem', fontSize: '0.875rem', color: '#c9d1d9', textDecoration: 'none', borderRadius: 4, marginBottom: 2 }}>
                {s.title}
              </a>
            ))}
          </div>
        ))}
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: '2rem 3rem', maxWidth: 860, overflowY: 'auto' }}>
        <div style={{ marginBottom: '2rem', padding: '1rem 1.5rem', background: '#161b22', borderRadius: 8, border: '1px solid #30363d' }}>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1rem', color: '#58a6ff' }}>🚀 Quick Links</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { label: 'HRM', url: 'http://localhost:3001', port: 3001 },
              { label: 'HRM-AI', url: 'http://localhost:3002', port: 3002 },
              { label: 'HRM-Unified', url: 'http://localhost:3003', port: 3003 },
              { label: 'MRP', url: 'http://localhost:3005', port: 3005 },
              { label: 'Accounting', url: 'http://localhost:3007', port: 3007 },
              { label: 'Ecommerce', url: 'http://localhost:3008', port: 3008 },
              { label: 'OTB', url: 'http://localhost:3009', port: 3009 },
              { label: 'CRM', url: 'http://localhost:3018', port: 3018 },
              { label: 'Liphoco', url: 'http://localhost:3020', port: 3020 },
              { label: 'Landing', url: 'http://localhost:3012', port: 3012 },
              { label: 'TPM-web', url: 'http://localhost:5180', port: 5180 },
            ].map(app => (
              <a key={app.port} href={app.url} target="_blank" rel="noopener noreferrer"
                style={{ padding: '0.35rem 0.75rem', background: '#21262d', border: '1px solid #30363d', borderRadius: 6, fontSize: '0.8rem', color: '#58a6ff', textDecoration: 'none' }}>
                {app.label} :{app.port}
              </a>
            ))}
          </div>
        </div>

        {DOCUMENTATION.map(doc => (
          <section key={doc.id} id={doc.id} style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #21262d' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: '#21262d', border: '1px solid #30363d', borderRadius: 4, color: '#8b949e', textTransform: 'uppercase' }}>
                {doc.category}
              </span>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#e2e8f0' }}>{doc.title}</h2>
              <span style={{ color: '#8b949e', fontSize: '0.875rem' }}>/ {doc.titleVi}</span>
            </div>
            <pre style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 8, padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6, color: '#c9d1d9', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {doc.content.trim()}
            </pre>
          </section>
        ))}
      </main>
    </div>
  )
}
