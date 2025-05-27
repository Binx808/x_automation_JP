// SecurityMonitor.gs
// セキュリティ監視
class SecurityMonitor {
  static detectUnauthorized(requestCount) {
    if (requestCount > 10) {
      MailApp.sendEmail("admin@example.com", "不正アクセス検知", "大量リクエストを検知しました");
      return true;
    }
    return false;
  }
} 