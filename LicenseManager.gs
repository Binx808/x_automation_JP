// ライセンス認証・制限管理クラス
class LicenseManager {
  constructor() {
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ライセンス管理");
  }

  authenticate(licenseId) {
    const data = this.sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === licenseId && data[i][2] > 0) return true;
    }
    return false;
  }

  checkLimits(licenseId) {
    const data = this.sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === licenseId) return data[i][2];
    }
    return 0;
  }
} 