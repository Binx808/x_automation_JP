// TwitterPostManager.gs
// 投稿生成とXへの投稿
class TwitterPostManager {
  constructor() {
    this.logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("投稿ログ");
  }

  generatePost(prompt, input) {
    return `${prompt} ${input}`;
  }

  postToX(postContent) {
    this.logSheet.appendRow([new Date(), postContent, "成功"]);
    return true;
  }
} 