// Init.gs
// スプレッドシート初期化・自動投稿・スケジュール

function initializeSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ["設定", "メイン実行", "ライセンス管理", "プロンプト管理", "投稿ログ", "エラーログ"];
  sheets.forEach(name => {
    if (!ss.getSheetByName(name)) ss.insertSheet(name);
  });

  const configSheet = ss.getSheetByName("設定");
  configSheet.getRange("A1:C1").setValues([["Email", "License ID", "APIキー"]]);
  
  const mainSheet = ss.getSheetByName("メイン実行");
  mainSheet.getRange("A1:D1").setValues([["カテゴリ", "サブカテゴリ", "入力", "Xアカウント"]]);
  const promptManager = new PromptManager();
  const categories = promptManager.getPromptCategories();
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(categories)
    .build();
  mainSheet.getRange("A2:A").setDataValidation(rule);
}

function executeAutoPost() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mainSheet = ss.getSheetByName("メイン実行");
  const data = mainSheet.getRange("A2:D2").getValues()[0];
  const [category, subCategory, input, xAccount] = data;

  const promptManager = new PromptManager();
  const twitterPostManager = new TwitterPostManager();
  const prompt = promptManager.getPrompt(category, subCategory);
  const postContent = twitterPostManager.generatePost(prompt, input);
  
  try {
    twitterPostManager.postToX(postContent);
  } catch (e) {
    ErrorMonitor.logError(e.message);
  }
}

function setSchedule() {
  ScriptApp.newTrigger("executeAutoPost")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
} 