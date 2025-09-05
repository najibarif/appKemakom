<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Alumni;
use App\Models\Angkatan;
use App\Models\News;
use App\Models\Modul;
use App\Models\Contact;
use App\Models\Timeline;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin BEM KEMAKOM',
            'email' => 'admin@kemakom.ac.id',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        // Seed Alumni
        $alumniData = [
            [
                'name' => 'Ahmad Rizki',
                'year' => '2020',
                'company' => 'Google Indonesia',
                'position' => 'Software Engineer',
                'location' => 'Jakarta',
                'thesis' => 'Machine Learning untuk Prediksi Cuaca'
            ],
            [
                'name' => 'Sari Dewi',
                'year' => '2019',
                'company' => 'Tokopedia',
                'position' => 'Frontend Developer',
                'location' => 'Jakarta',
                'thesis' => 'Sistem Informasi E-Commerce'
            ],
            [
                'name' => 'Budi Santoso',
                'year' => '2021',
                'company' => 'Gojek',
                'position' => 'Data Scientist',
                'location' => 'Jakarta',
                'thesis' => 'Analisis Big Data untuk Transportasi Online'
            ],
            [
                'name' => 'Maya Putri',
                'year' => '2018',
                'company' => 'Microsoft',
                'position' => 'Cloud Engineer',
                'location' => 'Singapura',
                'thesis' => 'Cloud Computing untuk Sistem Terdistribusi'
            ],
            [
                'name' => 'Andi Pratama',
                'year' => '2020',
                'company' => 'Shopee',
                'position' => 'Backend Developer',
                'location' => 'Jakarta',
                'thesis' => 'Microservices Architecture'
            ],
            [
                'name' => 'Rina Sari',
                'year' => '2019',
                'company' => 'Traveloka',
                'position' => 'Product Manager',
                'location' => 'Jakarta',
                'thesis' => 'User Experience dalam Aplikasi Mobile'
            ]
        ];

        foreach ($alumniData as $alumni) {
            Alumni::create($alumni);
        }

        // Seed Angkatan
        $angkatanData = [
            [
                'year' => '2024',
                'total' => 45,
                'active' => 42,
                'achievements' => ['Juara 1 Hackathon Nasional', 'Best Paper Conference']
            ],
            [
                'year' => '2023',
                'total' => 38,
                'active' => 35,
                'achievements' => ['Juara 2 Programming Contest', 'Outstanding Project Award']
            ],
            [
                'year' => '2022',
                'total' => 42,
                'active' => 40,
                'achievements' => ['Best Innovation Award', 'Community Service Excellence']
            ],
            [
                'year' => '2021',
                'total' => 35,
                'active' => 33,
                'achievements' => ['Research Excellence', 'Leadership Award']
            ],
            [
                'year' => '2020',
                'total' => 40,
                'active' => 38,
                'achievements' => ['Digital Innovation Award', 'Academic Excellence']
            ],
            [
                'year' => '2019',
                'total' => 37,
                'active' => 35,
                'achievements' => ['Startup Competition Winner', 'Tech Innovation']
            ]
        ];

        foreach ($angkatanData as $angkatan) {
            Angkatan::create($angkatan);
        }

        // Seed News
        $newsData = [
            [
                'title' => 'Bincang Karir 2025',
                'content' => 'Program bincang karir dengan alumni sukses akan diadakan pada 20 Juli 2025',
                'image' => 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
                'date' => '2025-01-15',
                'views' => 150
            ],
            [
                'title' => 'Juara Coding Competition',
                'content' => 'Tim Kemakom berhasil meraih juara 1 dalam kompetisi coding tingkat nasional',
                'image' => 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
                'date' => '2025-01-10',
                'views' => 230
            ],
            [
                'title' => 'Kerjasama dengan Industri',
                'content' => 'BEM Kemakom menjalin kerjasama dengan 5 perusahaan teknologi terkemuka',
                'image' => 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
                'date' => '2025-01-05',
                'views' => 180
            ]
        ];

        foreach ($newsData as $news) {
            News::create($news);
        }

        // Seed Moduls
        $modulData = [
            [
                'title' => 'Algoritma dan Struktur Data',
                'description' => 'Modul pembelajaran lengkap tentang algoritma dasar dan struktur data',
                'category' => 'Semester 2',
                'downloads' => 1250,
                'views' => 3420,
                'date' => '2025-01-15',
                'file' => 'algoritma-struktur-data.pdf'
            ],
            [
                'title' => 'Pemrograman Web',
                'description' => 'Panduan lengkap HTML, CSS, JavaScript dan framework modern',
                'category' => 'Semester 3',
                'downloads' => 980,
                'views' => 2890,
                'date' => '2025-01-10',
                'file' => 'pemrograman-web.pdf'
            ],
            [
                'title' => 'Database Management System',
                'description' => 'Konsep database, SQL, dan manajemen basis data',
                'category' => 'Semester 4',
                'downloads' => 756,
                'views' => 2156,
                'date' => '2025-01-08',
                'file' => 'database-management.pdf'
            ],
            [
                'title' => 'Jaringan Komputer',
                'description' => 'Fundamental jaringan, protokol, dan keamanan jaringan',
                'category' => 'Semester 5',
                'downloads' => 634,
                'views' => 1876,
                'date' => '2025-01-05',
                'file' => 'jaringan-komputer.pdf'
            ],
            [
                'title' => 'Machine Learning',
                'description' => 'Pengenalan machine learning dan implementasi algoritma',
                'category' => 'Semester 6',
                'downloads' => 892,
                'views' => 2543,
                'date' => '2025-01-03',
                'file' => 'machine-learning.pdf'
            ],
            [
                'title' => 'Mobile Programming',
                'description' => 'Pengembangan aplikasi mobile Android dan iOS',
                'category' => 'Semester 5',
                'downloads' => 567,
                'views' => 1654,
                'date' => '2025-01-01',
                'file' => 'mobile-programming.pdf'
            ]
        ];

        foreach ($modulData as $modul) {
            Modul::create($modul);
        }

        // Seed Contacts
        $contactData = [
            [
                'type' => 'email',
                'title' => 'Email',
                'info' => 'bem.kemakom@university.ac.id'
            ],
            [
                'type' => 'phone',
                'title' => 'Telepon',
                'info' => '+62 123 4567 8901'
            ],
            [
                'type' => 'address',
                'title' => 'Alamat',
                'info' => "Gedung Fakultas Ilmu Komputer, Lantai 3\nJl. Pendidikan No. 123, Kota"
            ]
        ];

        foreach ($contactData as $contact) {
            Contact::create($contact);
        }

        // Seed Timeline
        $timelineData = [
            [
                'year' => '2006',
                'title' => 'Pendirian KEMAKOM',
                'description' => 'Kemakom didirikan pada 26 Januari 2006 sebagai organisasi kemahasiswaan FPMIPA UPI',
                'icon' => 'building'
            ],
            [
                'year' => '2008',
                'title' => 'Pembentukan BEM',
                'description' => 'Pembentukan Badan Eksekutif Mahasiswa KEMAKOM untuk mewadahi aspirasi mahasiswa',
                'icon' => 'users'
            ],
            [
                'year' => '2010',
                'title' => 'Program DUDU Pertama',
                'description' => 'Peluncuran program DUDU (Diskusi Untuk Dunia) sebagai wadah diskusi akademik',
                'icon' => 'award'
            ],
            [
                'year' => '2012',
                'title' => 'EDUKOM Diluncurkan',
                'description' => 'Program EDUKOM dimulai untuk meningkatkan kualitas pendidikan komputer',
                'icon' => 'award'
            ],
            [
                'year' => '2015',
                'title' => 'Kerjasama Industri',
                'description' => 'Memulai kerjasama dengan berbagai perusahaan teknologi untuk program magang',
                'icon' => 'building'
            ],
            [
                'year' => '2018',
                'title' => 'Era Digital',
                'description' => 'Transformasi digital organisasi dengan website dan sistem informasi modern',
                'icon' => 'building'
            ],
            [
                'year' => '2020',
                'title' => 'Adaptasi Pandemi',
                'description' => 'Adaptasi kegiatan online selama pandemi COVID-19 dengan inovasi program virtual',
                'icon' => 'users'
            ],
            [
                'year' => '2024',
                'title' => 'KEMAKOM Modern',
                'description' => 'KEMAKOM berkembang menjadi organisasi modern dengan berbagai prestasi nasional',
                'icon' => 'award'
            ]
        ];

        foreach ($timelineData as $timeline) {
            Timeline::create($timeline);
        }
    }
}