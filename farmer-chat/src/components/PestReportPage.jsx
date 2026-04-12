import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Camera, AlertTriangle, Send, CheckCircle, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BASE_API_URL } from '../config';

export default function PestReportPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [pestType, setPestType] = useState('');
  const [cropAffected, setCropAffected] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    getLocation();
    fetchNearbyReports();
  }, []);

  function getLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => console.log('Location access denied')
    );
  }

  async function fetchNearbyReports() {
    try {
      const res = await fetch(`${BASE_API_URL}/pest-reports`);
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!coords) {
      alert('Please enable location access');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('pest_type', pestType);
    formData.append('crop_affected', cropAffected);
    formData.append('severity', severity);
    formData.append('description', description);
    formData.append('lat', coords.lat);
    formData.append('lon', coords.lon);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await fetch(`${BASE_API_URL}/api/report_pest`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setPestType('');
        setCropAffected('');
        setSeverity('medium');
        setDescription('');
        setImage(null);
        setImagePreview('');
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowForm(false);
          fetchNearbyReports();
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to submit report:', err);
      alert('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', marginBottom: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
            <Shield size={32} color="#667eea" />
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', margin: 0 }}>
              {t('pestReport')}
            </h1>
          </div>
          <p style={{ color: '#718096', fontSize: '16px', margin: 0 }}>
            Report pest outbreaks and view alerts in your area
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div style={{ background: '#10b981', color: 'white', borderRadius: '15px', padding: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={24} />
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Report submitted successfully!</span>
          </div>
        )}

        {/* Report Form Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              padding: '18px 30px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              boxShadow: '0 5px 20px rgba(102, 126, 234, 0.4)'
            }}
          >
            <AlertTriangle size={20} />
            Report New Pest Outbreak
          </button>
        )}

        {/* Report Form */}
        {showForm && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '30px', marginBottom: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1a202c', marginBottom: '20px' }}>
              Submit Pest Report
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Pest Type */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
                    Pest Type *
                  </label>
                  <input
                    type="text"
                    value={pestType}
                    onChange={(e) => setPestType(e.target.value)}
                    placeholder="e.g., Aphids, Caterpillars, Locusts"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Crop Affected */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
                    Crop Affected *
                  </label>
                  <input
                    type="text"
                    value={cropAffected}
                    onChange={(e) => setCropAffected(e.target.value)}
                    placeholder="e.g., Rice, Wheat, Cotton"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Severity */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
                    Severity Level *
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  >
                    <option value="low">Low - Minor damage</option>
                    <option value="medium">Medium - Moderate damage</option>
                    <option value="high">High - Severe damage</option>
                    <option value="critical">Critical - Crop failure risk</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the pest problem, symptoms, and affected area..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
                    Upload Photo (Optional)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <label style={{
                      background: '#f7fafc',
                      border: '2px dashed #cbd5e0',
                      borderRadius: '10px',
                      padding: '15px 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      color: '#4a5568'
                    }}>
                      <Camera size={20} />
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />
                    )}
                  </div>
                </div>

                {/* Location Info */}
                {coords && (
                  <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={18} color="#16a34a" />
                    <span style={{ fontSize: '14px', color: '#166534' }}>
                      Location: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
                    </span>
                  </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading ? '#cbd5e0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '14px 28px',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Send size={18} />
                    {loading ? 'Submitting...' : 'Submit Report'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    style={{
                      background: '#f7fafc',
                      color: '#4a5568',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '14px 28px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Nearby Reports */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1a202c', marginBottom: '20px' }}>
            Recent Reports in Your Area
          </h2>
          {reports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
              <Clock size={48} style={{ margin: '0 auto 15px', opacity: 0.5 }} />
              <p style={{ fontSize: '16px', margin: 0 }}>No recent pest reports in your area</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {reports.map((report, idx) => (
                <div key={idx} style={{
                  background: '#f7fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <AlertTriangle size={18} color={
                        report.severity === 'critical' ? '#dc2626' :
                        report.severity === 'high' ? '#ea580c' :
                        report.severity === 'medium' ? '#f59e0b' : '#84cc16'
                      } />
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a202c', margin: 0 }}>
                        {report.pest_type}
                      </h3>
                    </div>
                    <p style={{ fontSize: '14px', color: '#4a5568', margin: '5px 0' }}>
                      Crop: {report.crop_affected}
                    </p>
                    {report.description && (
                      <p style={{ fontSize: '14px', color: '#718096', margin: '5px 0' }}>
                        {report.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '13px', color: '#9ca3af' }}>
                      <span>📍 {report.distance || '0'} km away</span>
                      <span>🕐 {report.time || 'Recently'}</span>
                    </div>
                  </div>
                  <span style={{
                    background: report.severity === 'critical' ? '#fee2e2' :
                               report.severity === 'high' ? '#ffedd5' :
                               report.severity === 'medium' ? '#fef3c7' : '#ecfccb',
                    color: report.severity === 'critical' ? '#dc2626' :
                           report.severity === 'high' ? '#ea580c' :
                           report.severity === 'medium' ? '#f59e0b' : '#84cc16',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    {report.severity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
