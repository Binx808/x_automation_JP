// エラー通知・ログ管理クラス
class ErrorMonitor {
  static logError(error) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("エラーログ");
    sheet.appendRow([new Date(), error, "未解決"]);
    MailApp.sendEmail("admin@example.com", "エラー発生", error);
  }
} 