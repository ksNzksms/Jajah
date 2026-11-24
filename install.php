<?php
// شغّل مرة واحدة بعد ضبط config.php. بعد إنشاء المدير احذف هذا الملف من الاستضافة.
require_once __DIR__ . '/functions.php';
try {
    $pdo = db();
    $pdo->exec("CREATE TABLE IF NOT EXISTS admins (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(80) NOT NULL UNIQUE, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS posts (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, title VARCHAR(240) NOT NULL, slug VARCHAR(240) NOT NULL UNIQUE, category VARCHAR(100) NOT NULL DEFAULT 'ثقافة', author VARCHAR(140) NOT NULL DEFAULT 'فريق التحرير', excerpt TEXT NOT NULL, content MEDIUMTEXT NOT NULL, cover_url VARCHAR(500) NOT NULL DEFAULT '', status ENUM('draft','published') NOT NULL DEFAULT 'draft', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, INDEX(status, created_at), INDEX(category)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS messages (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(190) NOT NULL, subject VARCHAR(200) NOT NULL, message TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $count = (int)$pdo->query('SELECT COUNT(*) FROM admins')->fetchColumn();
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $count === 0) {
        csrf_check();
        $username = trim((string)($_POST['username'] ?? ''));
        $password = (string)($_POST['password'] ?? '');
        if (!preg_match('/^[a-zA-Z0-9_.-]{4,80}$/', $username) || strlen($password) < 12) $error = 'استخدم اسمًا من 4 أحرف على الأقل وكلمة مرور لا تقل عن 12 حرفًا.';
        else {
            $q = $pdo->prepare('INSERT INTO admins(username,password_hash) VALUES(?,?)');
            $q->execute([$username, password_hash($password, PASSWORD_DEFAULT)]);
            $done = true;
        }
    }
} catch (Throwable $e) { http_response_code(500); exit('تعذر إعداد قاعدة البيانات. راجع بيانات config.php وإعدادات MySQL.'); }
?><!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>إعداد ركن المعرفة</title><link rel="stylesheet" href="assets/site.css"><main class="narrow panel"><h1>إعداد الموقع</h1><?php if(isset($done)): ?><p>تم إنشاء حساب المدير. احذف install.php من الاستضافة ثم <a href="admin/login.php">سجّل الدخول</a>.</p><?php elseif($count > 0): ?><p>تم الإعداد بالفعل. احذف هذا الملف من الاستضافة.</p><?php else: ?>
<p>أنشئ حساب المدير. كلمة المرور لا تقل عن 12 حرفًا.</p><?php if(isset($error)): ?><p class="error"><?=e($error)?></p><?php endif; ?><form method="post"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><label>اسم المستخدم<input name="username" required minlength="4" autocomplete="username"></label><label>كلمة المرور<input name="password" type="password" required minlength="12" autocomplete="new-password"></label><button class="btn">إنشاء الحساب</button></form><?php endif; ?></main></html>
