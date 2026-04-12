'use client';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FeedbackRecord {
  id: string;
  fields: {
    Consulta?: string;
    'Valoración'?: string;
    Estado?: string;
    'Pregunta del usuario'?: string;
    'Respuesta del agente'?: string;
    'Contexto completo'?: string;
    'Notas / Corrección'?: string;
    Fecha?: string;
  };
}

type FilterType = 'pending' | 'negative' | 'all';

export default function FeedbackAdminPage() {
  const [records, setRecords] = useState<FeedbackRecord[]>([]);
  const [filter, setFilter] = useState<FilterType>('pending');
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/feedback/list?filter=${filter}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? `Error ${res.status}`);
        setRecords([]);
      } else {
        setRecords(data.records ?? []);
      }
    } catch (e) {
      setError('No se pudo conectar con la API');
      setRecords([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRecords(); }, [filter]);

  const markAs = async (recordId: string, estado: string) => {
    setUpdatingId(recordId);
    await fetch('/api/feedback/list', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recordId, fields: { Estado: estado } }),
    });
    await fetchRecords();
    setUpdatingId(null);
  };

  const analyze = async () => {
    setAnalyzing(true);
    setSuggestions(null);
    const res = await fetch('/api/feedback/analyze', { method: 'POST' });
    const data = await res.json();
    setSuggestions(data.suggestions);
    setAnalyzing(false);
  };

  const pendingCount = records.filter((r) => r.fields.Estado === 'Pendiente').length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#0D2E35', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'white', letterSpacing: '-0.04em' }}>Asesor</span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#00B5AD', letterSpacing: '-0.04em', position: 'relative', top: '-2px' }}>IA</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>·</span>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Panel de feedback</span>
        <a href="/chat" style={{ marginLeft: 'auto', fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>← Volver al chat</a>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Filters + analyze button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {([['pending', '👎 Pendientes'], ['negative', 'Todos los negativos'], ['all', 'Todos']] as [FilterType, string][]).map(([f, label]) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: filter === f ? '1.5px solid #0D2E35' : '1px solid #E5E7EB',
                backgroundColor: filter === f ? '#0D2E35' : 'white',
                color: filter === f ? 'white' : '#374151',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: filter === f ? 600 : 400,
              }}
            >
              {label}
            </button>
          ))}

          <button
            onClick={analyze}
            disabled={analyzing}
            style={{
              marginLeft: 'auto',
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: analyzing ? '#9CA3AF' : '#00B5AD',
              color: '#0D2E35',
              fontSize: '13px',
              fontWeight: 700,
              cursor: analyzing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {analyzing ? (
              <>
                <svg style={{ animation: 'spin 1s linear infinite' }} width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                </svg>
                Analizando...
              </>
            ) : (
              '✦ Analizar con IA'
            )}
          </button>
        </div>

        {/* AI Suggestions panel */}
        {suggestions && (
          <div style={{ backgroundColor: 'white', border: '1.5px solid #00B5AD', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0D2E35', margin: 0 }}>
                ✦ Sugerencias de mejora del prompt
              </h2>
              <button
                onClick={() => navigator.clipboard.writeText(suggestions)}
                style={{ fontSize: '12px', color: '#6B7280', background: 'none', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}
              >
                Copiar todo
              </button>
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.7, color: '#374151' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{suggestions}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid rgba(220,38,38,0.25)', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#991b1b' }}>Error al cargar feedback</p>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#b91c1c' }}>{error}</p>
              {error.includes('AIRTABLE_API_KEY') && (
                <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#6B7280' }}>
                  Añade <code style={{ backgroundColor: '#F3F4F6', padding: '1px 5px', borderRadius: '4px', fontFamily: 'monospace' }}>AIRTABLE_API_KEY=tu_key</code> a <code style={{ backgroundColor: '#F3F4F6', padding: '1px 5px', borderRadius: '4px', fontFamily: 'monospace' }}>.env.local</code> y reinicia el servidor.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Records */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF', fontSize: '14px' }}>Cargando...</div>
        ) : records.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF', fontSize: '14px' }}>
            No hay registros para este filtro
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 4px 0' }}>
              {records.length} registro{records.length !== 1 ? 's' : ''}{pendingCount > 0 ? ` · ${pendingCount} pendiente${pendingCount !== 1 ? 's' : ''}` : ''}
            </p>

            {records.map((rec) => {
              const f = rec.fields;
              const isExpanded = expanded === rec.id;
              const isNeg = f['Valoración'] === '👎 Negativo';

              return (
                <div
                  key={rec.id}
                  style={{
                    backgroundColor: 'white',
                    border: `1px solid ${isNeg ? 'rgba(220,38,38,0.15)' : 'rgba(34,197,94,0.2)'}`,
                    borderLeft: `3px solid ${isNeg ? '#dc2626' : '#22c55e'}`,
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header row */}
                  <div
                    style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                    onClick={() => setExpanded(isExpanded ? null : rec.id)}
                  >
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{isNeg ? '👎' : '👍'}</span>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {f.Consulta ?? '(sin consulta)'}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        flexShrink: 0,
                        backgroundColor:
                          f.Estado === 'Pendiente' ? 'rgba(234,170,0,0.12)' :
                          f.Estado === 'Revisado' ? 'rgba(59,130,246,0.1)' :
                          'rgba(34,197,94,0.1)',
                        color:
                          f.Estado === 'Pendiente' ? '#92733A' :
                          f.Estado === 'Revisado' ? '#1d4ed8' :
                          '#15803d',
                        fontWeight: 500,
                      }}
                    >
                      {f.Estado ?? 'Pendiente'}
                    </span>
                    <span style={{ fontSize: '11px', color: '#9CA3AF', flexShrink: 0 }}>
                      {f.Fecha ? new Date(f.Fecha).toLocaleDateString('es-ES') : ''}
                    </span>
                    <svg
                      width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"
                      style={{ flexShrink: 0, transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Expanded */}
                  {isExpanded && (
                    <div style={{ borderTop: '1px solid #F3F4F6', padding: '16px' }}>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <div>
                          <p style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Pregunta</p>
                          <p style={{ fontSize: '13px', color: '#111827', lineHeight: 1.6, backgroundColor: '#F9FAFB', padding: '10px 12px', borderRadius: '8px', margin: 0 }}>
                            {f['Pregunta del usuario'] ?? '—'}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Respuesta del agente</p>
                          <div
                            style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, backgroundColor: '#F9FAFB', padding: '10px 12px', borderRadius: '8px', maxHeight: '200px', overflow: 'auto' }}
                          >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {(f['Respuesta del agente'] ?? '—').slice(0, 1200)}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                        {f.Estado === 'Pendiente' && (
                          <button
                            onClick={() => markAs(rec.id, 'Revisado')}
                            disabled={updatingId === rec.id}
                            style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #3b82f6', backgroundColor: 'rgba(59,130,246,0.06)', color: '#1d4ed8', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}
                          >
                            Marcar revisado
                          </button>
                        )}
                        {f.Estado !== 'Aplicado al prompt' && (
                          <button
                            onClick={() => markAs(rec.id, 'Aplicado al prompt')}
                            disabled={updatingId === rec.id}
                            style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #16a34a', backgroundColor: 'rgba(34,197,94,0.06)', color: '#15803d', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}
                          >
                            Aplicado al prompt ✓
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
