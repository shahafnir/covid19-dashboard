export interface Statistics {
  date: Date;
  patients: {
    total: Number;
    active: Number;
    severityLevels: {
      critical: Number;
      high: Number;
      medium: Number;
      low: Number;
    };
    breathalysed: Number;
    deceased: Number;
    byAges: {
      '0-9': Number;
      '10-19': Number;
      '20-29': Number;
      '30-39': Number;
      '40-49': Number;
      '50-59': Number;
      '60-69': Number;
      '70-79': Number;
      '80-89': Number;
      '90+': Number;
    };
    byGender: {
      male: Number;
      female: Number;
      hospitalization: {
        community: Number;
        hotel: Number;
        hospital: Number;
      };
    };
  };
}
