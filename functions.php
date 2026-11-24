<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    if (DB_NAME === 'YOUR_DATABASE_NAME') {
        http_response_code(503);
        exit('يرجى ضبط بيانات قاعدة البيانات في config.php ثم تشغيل install.php.');
    }
    $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}
function e(?string $value): string { return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}
function csrf_check(): void {
    $sent = $_POST['csrf'] ?? '';
    if (!is_string($sent) || !hash_equals(csrf_token(), $sent)) { http_response_code(403); exit('انتهت صلاحية الطلب. حدّث الصفحة وحاول مجددًا.'); }
}
function article_url(array $post): string { return 'article.php?slug=' . rawurlencode($post['slug']); }
function get_post(string $slug, bool $publishedOnly = true): ?array {
    $sql = 'SELECT * FROM posts WHERE slug = ?' . ($publishedOnly ? " AND status = 'published'" : '') . ' LIMIT 1';
    $q = db()->prepare($sql); $q->execute([$slug]); $row = $q->fetch(); return $row ?: null;
}
function excerpt(string $text, int $length = 150): string {
    $text = trim(preg_replace('/\s+/u', ' ', strip_tags($text)) ?? '');
    return mb_strlen($text) > $length ? mb_substr($text, 0, $length) . '…' : $text;
}
function start_site_session(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params(['httponly'=>true, 'secure'=>!empty($_SERVER['HTTPS']), 'samesite'=>'Strict']);
        session_start();
    }
}
start_site_session();
