import React, { useState } from 'react';
import ModulSidebar from '../components/ModulSidebar';
import ModulContent from '../components/ModulContent';

const ModulPage = () => {
  const [currentModuleId, setCurrentModuleId] = useState(1);

  // Sample data - in real app, this would come from API
  const modules = [
    { id: 1, title: 'Pengenalan HTML', completed: true, locked: false, duration: '15 min' },
    { id: 2, title: 'Struktur Dasar HTML', completed: true, locked: false, duration: '20 min' },
    { id: 3, title: 'HTML Tags dan Attributes', completed: false, locked: false, duration: '25 min' },
    { id: 4, title: 'CSS Dasar', completed: false, locked: false, duration: '30 min' },
    { id: 5, title: 'CSS Selectors', completed: false, locked: true, duration: '25 min' },
    { id: 6, title: 'CSS Layout', completed: false, locked: true, duration: '35 min' },
    { id: 7, title: 'JavaScript Dasar', completed: false, locked: true, duration: '40 min' },
    { id: 8, title: 'DOM Manipulation', completed: false, locked: true, duration: '30 min' },
  ];

  const moduleContent = {
    1: {
      id: 1,
      title: 'Pengenalan HTML',
      content: `
        <h2>Apa itu HTML?</h2>
        <p>HTML (HyperText Markup Language) adalah bahasa markup standar untuk membuat halaman web. HTML mendeskripsikan struktur halaman web menggunakan markup.</p>
        
        <h3>Sejarah HTML</h3>
        <p>HTML pertama kali dikembangkan oleh Tim Berners-Lee pada tahun 1990. Sejak itu, HTML telah berkembang melalui berbagai versi:</p>
        <ul>
          <li>HTML 1.0 (1993)</li>
          <li>HTML 2.0 (1995)</li>
          <li>HTML 3.2 (1997)</li>
          <li>HTML 4.01 (1999)</li>
          <li>HTML5 (2014)</li>
        </ul>
        
        <h3>Mengapa Belajar HTML?</h3>
        <p>HTML adalah fondasi dari semua halaman web. Dengan memahami HTML, Anda dapat:</p>
        <ul>
          <li>Membuat struktur halaman web</li>
          <li>Menambahkan konten seperti teks, gambar, dan video</li>
          <li>Membuat formulir interaktif</li>
          <li>Memahami cara kerja web secara fundamental</li>
        </ul>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman Pertama Saya</title>
</head>
<body>
    <h1>Selamat Datang di HTML!</h1>
    <p>Ini adalah paragraf pertama saya.</p>
    <a href="https://www.example.com">Ini adalah link</a>
</body>
</html>`,
      quiz: [
        {
          id: 1,
          question: 'Apa kepanjangan dari HTML?',
          options: [
            'HyperText Markup Language',
            'High Tech Modern Language',
            'Home Tool Markup Language',
            'Hyperlink and Text Markup Language'
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'Siapa yang pertama kali mengembangkan HTML?',
          options: [
            'Bill Gates',
            'Steve Jobs',
            'Tim Berners-Lee',
            'Mark Zuckerberg'
          ],
          correctAnswer: 2
        }
      ]
    },
    2: {
      id: 2,
      title: 'Struktur Dasar HTML',
      content: `
        <h2>Struktur Dasar Dokumen HTML</h2>
        <p>Setiap dokumen HTML memiliki struktur dasar yang terdiri dari beberapa elemen penting:</p>
        
        <h3>1. DOCTYPE Declaration</h3>
        <p>Deklarasi DOCTYPE memberitahu browser versi HTML yang digunakan. Untuk HTML5, kita menggunakan:</p>
        <code>&lt;!DOCTYPE html&gt;</code>
        
        <h3>2. Element HTML</h3>
        <p>Element &lt;html&gt; adalah root element yang membungkus seluruh konten halaman.</p>
        
        <h3>3. Element HEAD</h3>
        <p>Element &lt;head&gt; berisi metadata tentang dokumen, seperti:</p>
        <ul>
          <li>Title halaman</li>
          <li>Character encoding</li>
          <li>Viewport settings</li>
          <li>Link ke CSS dan JavaScript</li>
        </ul>
        
        <h3>4. Element BODY</h3>
        <p>Element &lt;body&gt; berisi semua konten yang akan ditampilkan di halaman web.</p>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="id">
<head>
    <!-- Metadata -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Deskripsi halaman">
    <title>Judul Halaman</title>
    
    <!-- Link ke CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Konten halaman -->
    <header>
        <h1>Header Halaman</h1>
    </header>
    
    <main>
        <p>Konten utama halaman</p>
    </main>
    
    <footer>
        <p>&copy; 2024 Website Saya</p>
    </footer>
    
    <!-- Link ke JavaScript -->
    <script src="script.js"></script>
</body>
</html>`,
      quiz: [
        {
          id: 1,
          question: 'Element mana yang berisi metadata dokumen HTML?',
          options: ['<body>', '<html>', '<head>', '<title>'],
          correctAnswer: 2
        }
      ]
    },
    3: {
      id: 3,
      title: 'HTML Tags dan Attributes',
      content: `
        <h2>HTML Tags dan Attributes</h2>
        <p>HTML menggunakan tags untuk mendefinisikan elemen dan attributes untuk memberikan informasi tambahan tentang elemen tersebut.</p>
        
        <h3>HTML Tags</h3>
        <p>Tags HTML biasanya berpasangan: opening tag dan closing tag. Beberapa tag bersifat self-closing.</p>
        
        <h3>HTML Attributes</h3>
        <p>Attributes memberikan informasi tambahan tentang elemen HTML. Attributes selalu ditulis di opening tag.</p>
        
        <h3>Tag-tag Penting</h3>
        <ul>
          <li><strong>&lt;h1&gt; - &lt;h6&gt;</strong>: Heading</li>
          <li><strong>&lt;p&gt;</strong>: Paragraf</li>
          <li><strong>&lt;a&gt;</strong>: Link</li>
          <li><strong>&lt;img&gt;</strong>: Gambar</li>
          <li><strong>&lt;div&gt;</strong>: Container</li>
          <li><strong>&lt;span&gt;</strong>: Inline container</li>
        </ul>
      `,
      codeExample: `<!-- Heading dengan berbagai level -->
<h1>Heading Level 1</h1>
<h2>Heading Level 2</h2>
<h3>Heading Level 3</h3>

<!-- Paragraf dengan attribute -->
<p class="intro" id="first-paragraph">
    Ini adalah paragraf dengan class dan id.
</p>

<!-- Link dengan attribute href dan target -->
<a href="https://www.example.com" target="_blank" title="Buka di tab baru">
    Klik di sini
</a>

<!-- Gambar dengan attribute src, alt, width, height -->
<img src="gambar.jpg" alt="Deskripsi gambar" width="300" height="200">

<!-- Div dengan multiple attributes -->
<div class="container" id="main-content" data-section="intro">
    <span style="color: blue; font-weight: bold;">Teks berwarna biru</span>
</div>

<!-- List -->
<ul>
    <li>Item pertama</li>
    <li>Item kedua</li>
    <li>Item ketiga</li>
</ul>`,
      quiz: [
        {
          id: 1,
          question: 'Attribute mana yang digunakan untuk memberikan alamat URL pada tag <a>?',
          options: ['src', 'href', 'link', 'url'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Tag mana yang digunakan untuk membuat heading level tertinggi?',
          options: ['<h6>', '<h3>', '<h1>', '<header>'],
          correctAnswer: 2
        }
      ]
    }
  };

  const currentModule = moduleContent[currentModuleId];
  const currentIndex = modules.findIndex(m => m.id === currentModuleId);
  const completedModules = modules.filter(m => m.completed).length;
  const progress = (completedModules / modules.length) * 100;

  const handleModuleSelect = (moduleId) => {
    setCurrentModuleId(moduleId);
  };

  const handleNext = () => {
    if (currentIndex < modules.length - 1) {
      const nextModule = modules[currentIndex + 1];
      if (!nextModule.locked) {
        setCurrentModuleId(nextModule.id);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentModuleId(modules[currentIndex - 1].id);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 pt-20">
      <ModulSidebar
        modules={modules}
        currentModuleId={currentModuleId}
        onModuleSelect={handleModuleSelect}
      />
      <ModulContent
        moduleData={currentModule}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={currentIndex < modules.length - 1 && !modules[currentIndex + 1]?.locked}
        hasPrevious={currentIndex > 0}
        progress={progress}
      />
    </div>
  );
};

export default ModulPage;