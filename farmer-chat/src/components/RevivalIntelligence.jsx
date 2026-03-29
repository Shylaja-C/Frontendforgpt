import { useState } from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, XCircle, Lightbulb, Activity } from 'lucide-react';

export default function RevivalIntelligence({ cropData, diseaseInfo }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calculate revival probability based on multiple factors
  const analyzeRevivalPotential = () => {
    setLoading(true);
    
    // Simulate AI analysis (in production, this would call your ML model)
    setTimeout(() => {
      const factors = {
        diseaseStage: cropData?.diseaseStage || 'moderate', // early, moderate, severe
        cropAge: cropData?.cropAge || 45, // days
        affectedArea: cropData?.affectedArea || 30, // percentage
        weatherConditions: cropData?.weather || 'favorable', // favorable, neutral, unfavorable
        soilHealth: cropData?.soilHealth || 'good', // poor, fair, good, excellent
        cropType: cropData?.cropType || 'rice'
      };

      // Calculate survival probability
      let survivalScore = 100;
      
      // Disease stage impact
      if (factors.diseaseStage === 'severe') survivalScore -= 40;
      else if (factors.diseaseStage === 'moderate') survivalScore -= 20;
      else survivalScore -= 5;
      
      // Affected area impact
      survivalScore -= factors.affectedArea * 0.8;
      
      // Weather impact
      if (factors.weatherConditions === 'unfavorable') survivalScore -= 15;
      else if (factors.weatherConditions === 'favorable') survivalScore += 10;
      
      // Soil health impact
      if (factors.soilHealth === 'excellent') survivalScore += 10;
      else if (factors.soilHealth === 'poor') survivalScore -= 15;
      
      // Crop age impact (younger crops recover better)
      if (factors.cropAge < 30) survivalScore += 5;
      else if (factors.cropAge > 90) survivalScore -= 10;
      
      survivalScore = Math.max(0, Math.min(100, survivalScore));
      
      // Determine confidence level
      let confidence = 'High';
      if (survivalScore > 40 && survivalScore < 60) confidence = 'Medium';
      if (survivalScore < 30 || survivalScore > 85) confidence = 'High';
      
      // Decision
      const decision = survivalScore >= 50 ? 'recover' : 'replant';
      
      // Generate recommendations
      const recommendations = generateRecommendations(decision, survivalScore, factors);
      
      setAnalysis({
        survivalProbability: Math.round(survivalScore),
        confidence,
        decision,
        factors,
        recommendations,
        costAnalysis: calculateCostAnalysis(decision, factors)
      });
      
      setLoading(false);
    }, 2000);
  };

  const generateRecommendations = (decision, score, factors) => {
    if (decision === 'recover') {
      return [
        '🌱 Apply targeted fungicide treatment immediately',
        '💧 Adjust irrigation to prevent waterlogging',
        '🌿 Remove severely affected plants to prevent spread',
        '🔬 Monitor daily for 7-10 days for improvement',
        '💊 Apply foliar nutrients to boost plant immunity',
        '🌾 Maintain proper spacing for air circulation'
      ];
    } else {
      return [
        '🚜 Clear the field and remove all infected plant material',
        '🔥 Burn or bury infected plants away from field',
        '🌱 Treat soil with bio-fungicides before replanting',
        '💰 Consider crop rotation to break disease cycle',
        '📅 Wait 2-3 weeks before replanting',
        '🌾 Choose disease-resistant varieties for replanting'
      ];
    }
  };

  const calculateCostAnalysis = (decision, factors) => {
    if (decision === 'recover') {
      return {
        estimatedCost: '₹3,000 - ₹5,000 per acre',
        timeToRecovery: '2-3 weeks',
        expectedYield: '70-85% of normal yield',
        riskLevel: 'Medium'
      };
    } else {
      return {
        estimatedCost: '₹8,000 - ₹12,000 per acre',
        timeToRecovery: '4-5 months (full crop cycle)',
        expectedYield: '100% of normal yield',
        riskLevel: 'Low'
      };
    }
  };

  return (
    <div style={{ 
      background: '#fff', 
      borderRadius: '24px', 
      padding: '32px', 
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
      border: '2px solid #e8f5e9',
      marginBottom: '24px'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px', 
        marginBottom: '24px',
        paddingBottom: '20px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Brain size={32} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '800', 
            color: '#0f1f12', 
            margin: 0,
            marginBottom: '4px'
          }}>
            🧠 Revival Intelligence Engine
          </h2>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            margin: 0 
          }}>
            AI-powered decision support: Recover or Replant?
          </p>
        </div>
      </div>

      {!analysis && !loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Brain size={40} color="#fff" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f1f12', marginBottom: '12px' }}>
            Get AI-Powered Crop Decision
          </h3>
          <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Our intelligent system analyzes disease severity, crop health, weather conditions, and economic factors to recommend the best action.
          </p>
          <button
            onClick={analyzeRevivalPotential}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(102,126,234,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Activity size={20} />
            Analyze Crop Condition
          </button>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '6px solid #f3f3f3',
            borderTop: '6px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <div style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
            🧠 AI Engine Processing...
          </div>
          <div style={{ fontSize: '14px', color: '#999' }}>
            Analyzing crop health, disease severity, and environmental factors
          </div>
        </div>
      )}

      {analysis && !loading && (
        <div>
          {/* Decision Card */}
          <div style={{
            background: analysis.decision === 'recover' 
              ? 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'
              : 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '24px',
            border: `3px solid ${analysis.decision === 'recover' ? '#66bb6a' : '#ff9800'}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              {analysis.decision === 'recover' ? (
                <CheckCircle size={48} color="#2e7d32" />
              ) : (
                <XCircle size={48} color="#e65100" />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '4px' }}>
                  AI RECOMMENDATION
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '900', 
                  color: analysis.decision === 'recover' ? '#2e7d32' : '#e65100',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {analysis.decision === 'recover' ? '✅ RECOVER CROP' : '❌ REPLANT CROP'}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Survival Probability</div>
                <div style={{ fontSize: '28px', fontWeight: '900', color: analysis.decision === 'recover' ? '#2e7d32' : '#e65100' }}>
                  {analysis.survivalProbability}%
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Confidence Level</div>
                <div style={{ fontSize: '28px', fontWeight: '900', color: '#1565c0' }}>
                  {analysis.confidence}
                </div>
              </div>
            </div>
          </div>

          {/* Cost Analysis */}
          <div style={{ 
            background: '#f8faf8', 
            borderRadius: '16px', 
            padding: '24px', 
            marginBottom: '24px',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f1f12', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="#1565c0" />
              Economic Analysis
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>💰 Estimated Cost</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f1f12' }}>{analysis.costAnalysis.estimatedCost}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>⏱️ Time to Recovery</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f1f12' }}>{analysis.costAnalysis.timeToRecovery}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>🌾 Expected Yield</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f1f12' }}>{analysis.costAnalysis.expectedYield}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>⚠️ Risk Level</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: analysis.costAnalysis.riskLevel === 'Low' ? '#2e7d32' : '#ff9800' }}>
                  {analysis.costAnalysis.riskLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '16px', 
            padding: '24px',
            border: '1px solid #e8f5e9'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f1f12', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lightbulb size={20} color="#fbc02d" />
              Action Plan
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {analysis.recommendations.map((rec, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  padding: '14px',
                  background: '#f8faf8',
                  borderRadius: '12px',
                  border: '1px solid #e8f5e9'
                }}>
                  <div style={{ 
                    background: analysis.decision === 'recover' ? '#e8f5e9' : '#fff3e0',
                    color: analysis.decision === 'recover' ? '#2e7d32' : '#e65100',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: '700',
                    height: 'fit-content'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.6', flex: 1 }}>
                    {rec}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Re-analyze Button */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              onClick={() => setAnalysis(null)}
              style={{
                background: '#fff',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Run New Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
