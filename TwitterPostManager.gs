// TwitterPostManager.gs
// 投稿生成・X（Twitter）投稿管理クラス
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