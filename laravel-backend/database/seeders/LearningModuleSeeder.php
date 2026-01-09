<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LearningModule;

class LearningModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing modules to avoid duplicates
        LearningModule::truncate();
        
        // Define modules data directly (without dependency on moduls table)
        $modulesData = [
            [
                'title' => 'Modul Pemrograman',
                'description' => 'Pembelajaran dasar pemrograman web dengan HTML, CSS, dan JavaScript',
                'category' => 'Pemrograman',
                'duration' => '45 min',
            ],
            [
                'title' => 'Modul Jaringan',
                'description' => 'Konsep dasar jaringan komputer dan protokol komunikasi',
                'category' => 'Jaringan',
                'duration' => '40 min',
            ],
            [
                'title' => 'Modul Basis Data',
                'description' => 'Pengenalan sistem basis data dan SQL',
                'category' => 'Basis Data',
                'duration' => '35 min',
            ],
            [
                'title' => 'Modul AI',
                'description' => 'Pengantar kecerdasan buatan dan machine learning',
                'category' => 'AI',
                'duration' => '50 min',
            ],
            [
                'title' => 'Modul Keamanan',
                'description' => 'Prinsip keamanan informasi dan cybersecurity',
                'category' => 'Keamanan',
                'duration' => '40 min',
            ],
        ];

        // Quiz questions by category
        $quizzesByCategory = [
            'Pemrograman' => [
                [
                    'id' => 1,
                    'question' => 'Apa kepanjangan dari HTML?',
                    'options' => [
                        'Hyperlinks and Text Markup Language',
                        'Home Tool Markup Language',
                        'Hyper Text Markup Language',
                        'Hyper Text Making Language'
                    ],
                    'correctAnswer' => 2,
                    'explanation' => 'HTML adalah singkatan dari Hyper Text Markup Language.'
                ],
                [
                    'id' => 2,
                    'question' => 'Tag manakah yang digunakan untuk membuat paragraf?',
                    'options' => ['<par>', '<p>', '<para>', '<paragraph>'],
                    'correctAnswer' => 1,
                    'explanation' => 'Tag <p> digunakan untuk membuat paragraf dalam HTML.'
                ],
                [
                    'id' => 3,
                    'question' => 'Tag manakah yang merupakan root element dari dokumen HTML?',
                    'options' => ['<head>', '<body>', '<html>', '<!DOCTYPE>'],
                    'correctAnswer' => 2,
                    'explanation' => '<html> adalah root element dari dokumen HTML.'
                ],
                [
                    'id' => 4,
                    'question' => 'Tag manakah yang digunakan untuk menambahkan CSS eksternal?',
                    'options' => ['<style>', '<css>', '<link>', '<script>'],
                    'correctAnswer' => 2,
                    'explanation' => 'Tag <link> dengan atribut rel="stylesheet" digunakan untuk menambahkan CSS eksternal.'
                ],
                [
                    'id' => 5,
                    'question' => 'Manakah yang BUKAN termasuk elemen semantik HTML5?',
                    'options' => ['<div>', '<article>', '<section>', '<footer>'],
                    'correctAnswer' => 0,
                    'explanation' => '<div> adalah elemen non-semantik, sementara yang lainnya adalah elemen semantik HTML5.'
                ],
            ],
            'Jaringan' => [
                [
                    'id' => 1,
                    'question' => 'Apa kepanjangan dari TCP/IP?',
                    'options' => [
                        'Transmission Control Protocol/Internet Protocol',
                        'Transfer Control Protocol/Internet Protocol',
                        'Transmission Control Process/Internet Process',
                        'Transfer Control Process/Internet Process'
                    ],
                    'correctAnswer' => 0,
                    'explanation' => 'TCP/IP adalah singkatan dari Transmission Control Protocol/Internet Protocol.'
                ],
                [
                    'id' => 2,
                    'question' => 'Port default untuk HTTP adalah?',
                    'options' => ['80', '443', '21', '25'],
                    'correctAnswer' => 0,
                    'explanation' => 'Port default untuk HTTP adalah 80, sedangkan HTTPS menggunakan port 443.'
                ],
                [
                    'id' => 3,
                    'question' => 'Apa fungsi dari router dalam jaringan?',
                    'options' => [
                        'Menghubungkan perangkat dalam jaringan lokal',
                        'Mengarahkan paket data antar jaringan',
                        'Menguatkan sinyal jaringan',
                        'Menyimpan data jaringan'
                    ],
                    'correctAnswer' => 1,
                    'explanation' => 'Router berfungsi untuk mengarahkan paket data antar jaringan yang berbeda.'
                ],
                [
                    'id' => 4,
                    'question' => 'Protokol manakah yang digunakan untuk mengirim email?',
                    'options' => ['HTTP', 'FTP', 'SMTP', 'TCP'],
                    'correctAnswer' => 2,
                    'explanation' => 'SMTP (Simple Mail Transfer Protocol) digunakan untuk mengirim email.'
                ],
            ],
            'Basis Data' => [
                [
                    'id' => 1,
                    'question' => 'Apa kepanjangan dari SQL?',
                    'options' => [
                        'Structured Query Language',
                        'Simple Query Language',
                        'Standard Query Language',
                        'System Query Language'
                    ],
                    'correctAnswer' => 0,
                    'explanation' => 'SQL adalah singkatan dari Structured Query Language.'
                ],
                [
                    'id' => 2,
                    'question' => 'Perintah SQL manakah yang digunakan untuk mengambil data?',
                    'options' => ['INSERT', 'SELECT', 'UPDATE', 'DELETE'],
                    'correctAnswer' => 1,
                    'explanation' => 'Perintah SELECT digunakan untuk mengambil/mengquery data dari tabel.'
                ],
                [
                    'id' => 3,
                    'question' => 'Apa fungsi dari PRIMARY KEY dalam tabel?',
                    'options' => [
                        'Menyimpan data utama',
                        'Mengidentifikasi baris secara unik',
                        'Mengurutkan data',
                        'Menyimpan nilai default'
                    ],
                    'correctAnswer' => 1,
                    'explanation' => 'PRIMARY KEY digunakan untuk mengidentifikasi setiap baris dalam tabel secara unik.'
                ],
                [
                    'id' => 4,
                    'question' => 'Relasi manakah yang memungkinkan satu baris di tabel A memiliki banyak baris di tabel B?',
                    'options' => ['One-to-One', 'One-to-Many', 'Many-to-One', 'Many-to-Many'],
                    'correctAnswer' => 1,
                    'explanation' => 'Relasi One-to-Many memungkinkan satu baris di tabel A memiliki banyak baris di tabel B.'
                ],
            ],
            'AI' => [
                [
                    'id' => 1,
                    'question' => 'Apa yang dimaksud dengan Machine Learning?',
                    'options' => [
                        'Pemrograman komputer tradisional',
                        'Sistem yang belajar dari data tanpa pemrograman eksplisit',
                        'Database management system',
                        'Network protocol'
                    ],
                    'correctAnswer' => 1,
                    'explanation' => 'Machine Learning adalah sistem yang dapat belajar dari data tanpa perlu diprogram secara eksplisit.'
                ],
                [
                    'id' => 2,
                    'question' => 'Jenis pembelajaran manakah yang menggunakan data berlabel?',
                    'options' => ['Unsupervised Learning', 'Supervised Learning', 'Reinforcement Learning', 'Deep Learning'],
                    'correctAnswer' => 1,
                    'explanation' => 'Supervised Learning menggunakan data yang sudah berlabel untuk melatih model.'
                ],
                [
                    'id' => 3,
                    'question' => 'Apa fungsi dari Neural Network?',
                    'options' => [
                        'Menyimpan data',
                        'Meniru cara kerja otak manusia untuk memproses informasi',
                        'Mengirim paket data',
                        'Mengelola database'
                    ],
                    'correctAnswer' => 1,
                    'explanation' => 'Neural Network dirancang untuk meniru cara kerja otak manusia dalam memproses informasi.'
                ],
            ],
            'Keamanan' => [
                [
                    'id' => 1,
                    'question' => 'Apa yang dimaksud dengan enkripsi?',
                    'options' => [
                        'Menyimpan data dalam bentuk asli',
                        'Mengubah data menjadi bentuk yang tidak dapat dibaca tanpa kunci',
                        'Menghapus data',
                        'Mengirim data tanpa perlindungan'
                    ],
                    'correctAnswer' => 1,
                    'explanation' => 'Enkripsi adalah proses mengubah data menjadi bentuk yang tidak dapat dibaca tanpa kunci dekripsi.'
                ],
                [
                    'id' => 2,
                    'question' => 'Apa yang dimaksud dengan firewall?',
                    'options' => [
                        'Sistem yang memblokir akses tidak sah ke jaringan',
                        'Program antivirus',
                        'Database management system',
                        'Network router'
                    ],
                    'correctAnswer' => 0,
                    'explanation' => 'Firewall adalah sistem keamanan yang memblokir akses tidak sah ke jaringan atau sistem.'
                ],
                [
                    'id' => 3,
                    'question' => 'Serangan manakah yang mencoba menebak password dengan mencoba berbagai kombinasi?',
                    'options' => ['Phishing', 'Brute Force', 'SQL Injection', 'XSS'],
                    'correctAnswer' => 1,
                    'explanation' => 'Brute Force attack adalah serangan yang mencoba menebak password dengan mencoba berbagai kombinasi.'
                ],
                [
                    'id' => 4,
                    'question' => 'Apa yang dimaksud dengan HTTPS?',
                    'options' => [
                        'HTTP dengan enkripsi SSL/TLS',
                        'HTTP versi baru',
                        'HTTP untuk mobile',
                        'HTTP untuk database'
                    ],
                    'correctAnswer' => 0,
                    'explanation' => 'HTTPS adalah HTTP yang dilengkapi dengan enkripsi SSL/TLS untuk keamanan data.'
                ],
            ],
        ];

        // Content templates
        $contentTemplates = [
            'Pemrograman' => "# Modul Pemrograman\n\nPembelajaran dasar pemrograman web dengan HTML, CSS, dan JavaScript.\n\n## Pengenalan\n\nModul ini akan membahas tentang pemrograman web secara mendalam.\n\n## Materi Pembelajaran\n\n### 1. HTML (HyperText Markup Language)\n\nHTML adalah bahasa markup yang digunakan untuk membuat struktur halaman web.\n\n- Tag dasar HTML\n- Struktur dokumen HTML\n- Elemen semantik HTML5\n\n### 2. CSS (Cascading Style Sheets)\n\nCSS digunakan untuk mengatur tampilan dan layout halaman web.\n\n- Selector dan properties\n- Layout dengan Flexbox dan Grid\n- Responsive design\n\n### 3. JavaScript\n\nJavaScript adalah bahasa pemrograman untuk membuat halaman web interaktif.\n\n- Variabel dan tipe data\n- Fungsi dan event handling\n- DOM manipulation\n\n## Latihan\n\nDi tab \"Simulasi\", Anda dapat mencoba praktik langsung dengan editor yang tersedia.\n\n## Kuis\n\nSetelah mempelajari materi, uji pemahaman Anda dengan mengerjakan kuis di tab \"Kuis\".",
            'Jaringan' => "# Modul Jaringan\n\nKonsep dasar jaringan komputer dan protokol komunikasi.\n\n## Pengenalan\n\nModul ini membahas tentang jaringan komputer dan komunikasi data.\n\n## Materi Pembelajaran\n\n### 1. Konsep Dasar Jaringan\n\n- Pengertian jaringan komputer\n- Topologi jaringan\n- Perangkat jaringan\n\n### 2. Protokol Jaringan\n\n- TCP/IP\n- HTTP/HTTPS\n- DNS\n\n### 3. Keamanan Jaringan\n\n- Firewall\n- VPN\n- Enkripsi data\n\n## Kuis\n\nSetelah mempelajari materi, uji pemahaman Anda dengan mengerjakan kuis di tab \"Kuis\".",
            'Basis Data' => "# Modul Basis Data\n\nPengenalan sistem basis data dan SQL.\n\n## Pengenalan\n\nModul ini membahas tentang sistem basis data dan bahasa SQL.\n\n## Materi Pembelajaran\n\n### 1. Konsep Basis Data\n\n- Pengertian basis data\n- Model data (relasional, NoSQL)\n- Normalisasi\n\n### 2. SQL (Structured Query Language)\n\n- DDL (Data Definition Language)\n- DML (Data Manipulation Language)\n- Query dan join\n\n### 3. Database Management System\n\n- MySQL, PostgreSQL\n- Indexing dan optimization\n- Backup dan recovery\n\n## Kuis\n\nSetelah mempelajari materi, uji pemahaman Anda dengan mengerjakan kuis di tab \"Kuis\".",
            'AI' => "# Modul AI\n\nPengantar kecerdasan buatan dan machine learning.\n\n## Pengenalan\n\nModul ini membahas tentang kecerdasan buatan dan machine learning.\n\n## Materi Pembelajaran\n\n### 1. Konsep Dasar AI\n\n- Pengertian AI\n- Sejarah perkembangan AI\n- Aplikasi AI dalam kehidupan\n\n### 2. Machine Learning\n\n- Supervised Learning\n- Unsupervised Learning\n- Reinforcement Learning\n\n### 3. Neural Network\n\n- Konsep neural network\n- Deep learning\n- Aplikasi praktis\n\n## Kuis\n\nSetelah mempelajari materi, uji pemahaman Anda dengan mengerjakan kuis di tab \"Kuis\".",
            'Keamanan' => "# Modul Keamanan\n\nPrinsip keamanan informasi dan cybersecurity.\n\n## Pengenalan\n\nModul ini membahas tentang keamanan informasi dan cybersecurity.\n\n## Materi Pembelajaran\n\n### 1. Konsep Keamanan\n\n- Confidentiality, Integrity, Availability (CIA)\n- Ancaman keamanan\n- Vulnerabilities dan exploits\n\n### 2. Enkripsi dan Kriptografi\n\n- Symmetric encryption\n- Asymmetric encryption\n- Digital signature\n\n### 3. Praktik Keamanan\n\n- Firewall dan IDS/IPS\n- Secure coding\n- Incident response\n\n## Kuis\n\nSetelah mempelajari materi, uji pemahaman Anda dengan mengerjakan kuis di tab \"Kuis\".",
        ];

        // Simulation code - ONLY for web/HTML related modules (Pemrograman)
        $simulationCodeWeb = '<!DOCTYPE html>
<html>
<head>
  <title>Simulasi Pemrograman Web</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255,255,255,0.1);
      padding: 30px;
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }
    h1 { color: #fff; text-align: center; }
    .code-block {
      background: rgba(0,0,0,0.3);
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
      font-family: monospace;
    }
    button {
      background: #fff;
      color: #667eea;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }
    button:hover {
      background: #f0f0f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Selamat Belajar Pemrograman Web!</h1>
    <p>Coba ubah kode di editor untuk melihat hasilnya.</p>
    <div class="code-block">
      <p>console.log("Hello, World!");</p>
    </div>
    <button onclick="alert(\'Halo dari JavaScript!\')">Klik Saya</button>
  </div>
  <script>
    console.log("JavaScript berjalan!");
  </script>
</body>
</html>';

        foreach ($modulesData as $index => $moduleData) {
            // Remove numbers from title (e.g., "Modul Jaringan 1" -> "Modul Jaringan")
            $title = preg_replace('/\s+\d+$/', '', $moduleData['title']);
            
            // Get content based on category
            $content = $contentTemplates[$moduleData['category']] ?? $contentTemplates['Pemrograman'];
            
            // Get quiz based on category
            $quiz = $quizzesByCategory[$moduleData['category']] ?? [];
            
            // Simulation code ONLY for web/HTML modules (Pemrograman category)
            $simulationCode = ($moduleData['category'] === 'Pemrograman') ? $simulationCodeWeb : null;
            
            // Create learning module
            LearningModule::create([
                'title' => $title,
                'description' => $moduleData['description'],
                'content' => $content,
                'simulation_code' => $simulationCode,
                'quiz' => $quiz,
                'duration' => $moduleData['duration'],
                'order' => $index + 1,
                'is_active' => true,
            ]);
        }
        
        $this->command->info('Learning modules seeded successfully!');
    }
}
