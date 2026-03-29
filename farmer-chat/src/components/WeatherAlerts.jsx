import { useState, useEffect } from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle, Bell } from 'lucide-react';

const severityConfig = {
  critical: {
    bg: '#ffebee',
    border: '#ef5350',
    icon: AlertTriangle,
    color: '#c62828',
    iconColor: '#ef5350'
  },
  high: {
    bg: '#fff3e0',
    border: '#ff9800',
    icon: AlertCircle,
    color: '#e65100',
    iconColor: '#ff9800'
  },
  medium: {
    bg: '#fff9c4',
    border: '#fbc02d',
    icon: Info,
    color: '#f57f17',
    iconColor: '#fbc02d'
  },
  low: {
    bg: '#e8f5e9',
    border: '#66bb6a',
    icon: CheckCircle,
    color: '#2e7d32',
    iconColor: '#66bb6a'
  }
};

export default function WeatherAlerts({ coords }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (coords) {
      fetchAlerts();
    }
  }, [coords]);

  async function fetchAlerts() {
    if (!coords) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`http://localhost:5000/alerts?lat=${coords.lat}&lon=${coords.lon}`);
      if (!res.ok) throw new Error('Failed to fetch alerts');
      
      const data = await res.json();
      setAlerts(data.alerts || []);
    } catch (err) {
      setError('Could not load weather alerts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!coords) return null;

  const criticalAlerts = alerts.filter(a => a.severity === 'critical' || a.severity === 'high');
  const otherAlerts = alerts.filter(a => a.severity === 'medium' || a.severity === 'low');

  return (
    <div style={{ 
      background: '#fff', 
      borderRadius: '24px', 
      padding: '32px', 
      marginBottom: '24px', 
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
      border: '1px solid #e8f5e9'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '24px',
        paddingBottom: '20px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <Bell size={28} color="#1565c0" />
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '800', 
            color: '#0f1f12', 
            margin: 0,
            marginBottom: '4px'
          }}>
            Weather Alert Dashboard
          </h2>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            margin: 0 
          }}>
            Real-time farming recommendations based on current conditions
          </p>
        </div>
        {!loading && alerts.length > 0 && (
          <div style={{
            background: criticalAlerts.length > 0 ? '#ffebee' : '#e8f5e9',
            color: criticalAlerts.length > 0 ? '#c62828' : '#2e7d32',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '700'
          }}>
            {alerts.length} Active Alert{alerts.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          fontSize: '15px', 
          color: '#666' 
        }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #1565c0',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }} />
          <div>Loading weather alerts...</div>
        </div>
      )}

      {error && (
        <div style={{ 
          background: '#ffebee', 
          borderRadius: '16px', 
          padding: '20px',
          border: '2px solid #ef5350',
          color: '#c62828',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          <AlertTriangle size={24} style={{ marginBottom: '8px' }} />
          <div>{error}</div>
        </div>
      )}

      {!loading && !error && alerts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: '#f8faf8',
          borderRadius: '16px',
          border: '2px dashed #e0e0e0'
        }}>
          <CheckCircle size={48} color="#66bb6a" style={{ marginBottom: '16px' }} />
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#2e7d32', marginBottom: '8px' }}>
            All Clear!
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            No weather alerts at this time. Conditions are favorable for farming.
          </div>
        </div>
      )}

      {!loading && !error && alerts.length > 0 && (
        <>
          {/* Critical/High Alerts */}
          {criticalAlerts.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#c62828', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertTriangle size={20} />
                Urgent Alerts ({criticalAlerts.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {criticalAlerts.map((alert, index) => {
                  const config = severityConfig[alert.severity];
                  const Icon = config.icon;
                  
                  return (
                    <div 
                      key={index}
                      style={{
                        background: config.bg,
                        borderRadius: '16px',
                        padding: '20px',
                        border: `2px solid ${config.border}`,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <Icon 
                          size={24} 
                          color={config.iconColor} 
                          style={{ flexShrink: 0, marginTop: '2px' }} 
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontWeight: '700', 
                            fontSize: '16px', 
                            color: config.color,
                            marginBottom: '8px'
                          }}>
                            {alert.title}
                          </div>
                          <div style={{ 
                            fontSize: '14px', 
                            color: config.color,
                            marginBottom: '12px',
                            opacity: 0.9
                          }}>
                            {alert.message}
                          </div>
                          
                          {alert.recommendations && alert.recommendations.length > 0 && (
                            <div style={{ 
                              marginTop: '12px',
                              paddingTop: '12px',
                              borderTop: `1px solid ${config.border}40`
                            }}>
                              <div style={{ 
                                fontSize: '13px', 
                                fontWeight: '600',
                                color: config.color,
                                marginBottom: '8px'
                              }}>
                                ⚡ Action Required:
                              </div>
                              <ul style={{ 
                                margin: 0, 
                                paddingLeft: '20px',
                                fontSize: '13px',
                                color: config.color,
                                lineHeight: '1.7'
                              }}>
                                {alert.recommendations.map((rec, i) => (
                                  <li key={i} style={{ marginBottom: '6px' }}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other Alerts */}
          {otherAlerts.length > 0 && (
            <div>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#555', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Info size={20} />
                General Advisories ({otherAlerts.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {otherAlerts.map((alert, index) => {
                  const config = severityConfig[alert.severity];
                  const Icon = config.icon;
                  
                  return (
                    <div 
                      key={index}
                      style={{
                        background: config.bg,
                        borderRadius: '16px',
                        padding: '18px',
                        border: `2px solid ${config.border}`,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <Icon 
                          size={22} 
                          color={config.iconColor} 
                          style={{ flexShrink: 0, marginTop: '2px' }} 
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontWeight: '700', 
                            fontSize: '15px', 
                            color: config.color,
                            marginBottom: '6px'
                          }}>
                            {alert.title}
                          </div>
                          <div style={{ 
                            fontSize: '13px', 
                            color: config.color,
                            marginBottom: '10px',
                            opacity: 0.9
                          }}>
                            {alert.message}
                          </div>
                          
                          {alert.recommendations && alert.recommendations.length > 0 && (
                            <div style={{ 
                              marginTop: '10px',
                              paddingTop: '10px',
                              borderTop: `1px solid ${config.border}40`
                            }}>
                              <ul style={{ 
                                margin: 0, 
                                paddingLeft: '18px',
                                fontSize: '12px',
                                color: config.color,
                                lineHeight: '1.6'
                              }}>
                                {alert.recommendations.slice(0, 2).map((rec, i) => (
                                  <li key={i} style={{ marginBottom: '4px' }}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
