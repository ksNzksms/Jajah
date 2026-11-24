<?php
require_once __DIR__ . '/includes.php';
$q = db()->query("SELECT * FROM posts WHERE status='published' ORDER BY created_at DESC LIMIT 12"); $posts = $q->fetchAll();
$featured = $posts[0] ?? null;
page_header('الرئيسية', 'مقالات وتحليلات عربية في العلوم والثقافة والتقنية.');
?>
<?php if($featured): ?><section class="hero"><div class="hero-copy"><span class="eyebrow">المقال الرئيسي · <?=e($featured['category'])?></span><h1><a href="<?=e(article_url($featured))?>"><?=e($featured['title'])?></a></h1><p><?=e($featured['excerpt'])?></p><a class="btn" href="<?=e(article_url($featured))?>">اقرأ المقال ←</a><div class="meta"><?=e($featured['author'])?> · <?=e(date('Y-m-d',strtotime($featured['created_at'])))?></div></div><a class="hero-art" href="<?=e(article_url($featured))?>" <?php if($featured['cover_url']): ?>style="background-image:linear-gradient(0deg,#10243f77,#10243f11),url('<?=e($featured['cover_url'])?>')"<?php endif; ?>><span>قراءة مختارة</span></a></section><?php else: ?><section class="hero"><div class="hero-copy"><span class="eyebrow">مرحبًا بكم</span><h1>المعرفة تبدأ بسؤال جيد.</h1><p>ركن المعرفة مساحة عربية للمقالات والتحليلات في العلوم والثقافة والتقنية.</p><a class="btn" href="search.php">اكتشف المقالات</a></div><div class="hero-art"><span>ركن المعرفة</span></div></section><?php endif; ?>
<section class="sectionhead"><div><span class="eyebrow">قراءات جديدة</span><h2>أحدث المقالات</h2></div><a href="archive.php">الأرشيف ←</a></section><div class="grid"><?php foreach(array_slice($posts, 0, 9) as $post) post_card($post); ?></div>
<section class="newsletter"><span class="eyebrow">kamel3lom</span><h2>معرفة مختارة، تصل بهدوء</h2><p>تابع الجديد من مقالات ركن المعرفة.</p><a class="btn" href="search.php">ابدأ التصفح</a></section>
<?php page_footer(); ?>
