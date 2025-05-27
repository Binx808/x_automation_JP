// Api.gs
// APIエンドポイント（doPost）定義
function doPost(e) {
  const params = JSON.parse(e.postData.contents);
  const licenseManager = new LicenseManager();
  const promptManager = new PromptManager();

  switch (params.action) {
    case "authenticate":
      return ContentService.createTextOutput(
        JSON.stringify({ success: licenseManager.authenticate(params.licenseId) })
      );
    case "checkLimits":
      return ContentService.createTextOutput(
        JSON.stringify({ limits: licenseManager.checkLimits(params.licenseId) })
      );
    case "getPrompt":
      return ContentService.createTextOutput(
        JSON.stringify({ prompt: promptManager.getPrompt(params.category, params.subCategory) })
      );
    case "getPromptCategories":
      return ContentService.createTextOutput(
        JSON.stringify({ categories: promptManager.getPromptCategories() })
      );
    case "logPost":
      const logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("投稿ログ");
      logSheet.appendRow([new Date(), params.postContent, params.status]);
      return ContentService.createTextOutput(JSON.stringify({ success: true }));
    default:
      return ContentService.createTextOutput(JSON.stringify({ error: "無効なアクション" }));
  }
} 