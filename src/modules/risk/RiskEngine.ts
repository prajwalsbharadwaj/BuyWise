import { RiskRule, RiskReport, Anomaly, ExtractedDataPoint } from './types';

// Mock rule set for MVP Phase 2
// In production, these would be loaded from config/locations/karnataka.ts
const KARNATAKA_RULES: RiskRule[] = [
  {
    id: 'KAR-RERA-001',
    name: 'RERA Compliance Check',
    evaluate: (data) => {
      if (data.PropertyType === 'Apartment' && data.ConstructionStatus === 'Under Construction' && !data.RERANumber) {
        return {
          type: 'HIGH',
          title: 'Missing RERA Registration',
          desc: 'Under-construction apartments in Karnataka must have a valid RERA registration. Proceeding without this is extremely high risk.',
          recommendedService: { name: 'RERA Verification Service', link: '/services/VER_RERA' }
        };
      }
      return null;
    }
  },
  {
    id: 'KAR-KHATA-002',
    name: 'Khata Match Check',
    evaluate: (data) => {
      if (data.SellerNameSaleDeed && data.SellerNameKhata && data.SellerNameSaleDeed !== data.SellerNameKhata) {
        return {
          type: 'HIGH',
          title: 'Name Mismatch',
          desc: `Seller name on Sale Deed ("${data.SellerNameSaleDeed}") does not exactly match Khata Certificate ("${data.SellerNameKhata}").`,
          recommendedService: { name: 'Title Search & Legal Verification', link: '/services/VER_OWNERSHIP' }
        };
      }
      return null;
    }
  },
  {
    id: 'KAR-EC-003',
    name: 'EC Duration Check',
    evaluate: (data) => {
      const ecYears = parseInt(data.ECYearsCovered || '0');
      if (ecYears > 0 && ecYears < 15) {
        return {
          type: 'MEDIUM',
          title: 'Missing EC Year',
          desc: `Encumbrance Certificate does not cover the required 15-year history (only ${data.ECYearsCovered} years found).`,
          recommendedService: { name: 'EC Retrieval Service', link: '/services/DOC_RETRIEVAL' }
        };
      }
      return null;
    }
  }
];

export class RiskEngine {
  private rules: RiskRule[];

  constructor(rules: RiskRule[] = KARNATAKA_RULES) {
    this.rules = rules;
  }

  /**
   * Evaluates a set of extracted data points and returns a comprehensive Risk Report
   */
  public evaluate(transactionId: string, extractedData: ExtractedDataPoint[]): RiskReport {
    const dataMap: Record<string, any> = {};
    
    // Convert array of extracted data into a key-value map for rules evaluation
    extractedData.forEach(d => {
      // Very basic normalization for MVP purposes
      const key = d.label.replace(/\s+/g, '');
      dataMap[key] = d.value;
    });
    


    const anomalies: Anomaly[] = [];
    let score = 100;

    // Run rules
    this.rules.forEach(rule => {
      const anomaly = rule.evaluate(dataMap);
      if (anomaly) {
        anomalies.push(anomaly);
        
        // Deduct score based on severity
        if (anomaly.type === 'CRITICAL') score -= 50;
        else if (anomaly.type === 'HIGH') score -= 25;
        else if (anomaly.type === 'MEDIUM') score -= 10;
        else if (anomaly.type === 'LOW') score -= 5;
      }
    });

    // Ensure score doesn't drop below 0
    score = Math.max(0, score);

    return {
      transactionId,
      score,
      anomalies,
      extractedData
    };
  }
}
