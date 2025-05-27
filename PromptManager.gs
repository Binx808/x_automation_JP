// PromptManager.gs
// プロンプト管理クラス
class PromptManager {
  constructor() {
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("プロンプト管理");
  }

  getPrompt(category, subCategory) {
    const data = this.sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === category && data[i][1] === subCategory) return data[i][2];
    }
    return "プロンプトが見つかりません";
  }

  getPromptCategories() {
    const data = this.sheet.getDataRange().getValues();
    let categories = [];
    for (let i = 1; i < data.length; i++) {
      if (!categories.includes(data[i][0])) categories.push(data[i][0]);
    }
    return categories;
  }
} 