<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
// use function now; 
class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Seed Alumni Table
        for ($i = 1; $i <= 20; $i++) {
            DB::table('alumni')->insert([
                'name' => 'Alumni ' . $i,
                'year' => (string)(2015 + ($i % 10)),
                'company' => 'Company ' . chr(65 + ($i % 5)),
                'position' => 'Position ' . ($i % 5 + 1),
                'location' => 'City ' . ($i % 10 + 1),
                'thesis' => 'Thesis title about ' . Str::random(10) . ' and its applications',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Angkatan Table
        for ($i = 1; $i <= 10; $i++) {
            DB::table('angkatan')->insert([
                'year' => (string)(2015 + $i),
                'total' => 100 + ($i * 10),
                'active' => 90 + ($i * 5),
                'achievements' => json_encode([
                    'achievement1' => 'Achievement ' . ($i * 3 - 2),
                    'achievement2' => 'Achievement ' . ($i * 3 - 1),
                    'achievement3' => 'Achievement ' . ($i * 3),
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed News Table
        for ($i = 1; $i <= 15; $i++) {
            DB::table('news')->insert([
                'title' => 'News Title ' . $i,
                'content' => 'This is a detailed news content about ' . Str::random(15) . '. ' . 
                            'It includes various information and updates about our department.',
                'image' => 'news_image_' . $i . '.jpg',
                'date' => now()->subDays($i * 5)->format('Y-m-d'),
                'views' => rand(50, 1000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Moduls Table
        $categories = ['Pemrograman', 'Jaringan', 'Basis Data', 'AI', 'Keamanan'];
        for ($i = 1; $i <= 20; $i++) {
            DB::table('moduls')->insert([
                'title' => 'Modul ' . $categories[$i % 5] . ' ' . $i,
                'description' => 'Modul pembelajaran tentang ' . $categories[$i % 5] . ' untuk mahasiswa angkatan ' . (2020 + ($i % 5)),
                'category' => $categories[$i % 5],
                'downloads' => rand(50, 500),
                'views' => rand(100, 1000),
                'date' => now()->subDays($i * 3)->format('Y-m-d'),
                'file' => 'modul_' . Str::slug($categories[$i % 5]) . '_' . $i . '.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Contacts Table
        $contacts = [
            ['type' => 'email', 'title' => 'Email', 'info' => 'info@kemakom.com'],
            ['type' => 'phone', 'title' => 'Phone', 'info' => '+62 1234 5678'],
            ['type' => 'address', 'title' => 'Alamat', 'info' => 'Jl. Raya Janti No.143, Karang Jambe, Banguntapan, Bantul, Yogyakarta 55198'],
            ['type' => 'facebook', 'title' => 'Facebook', 'info' => 'facebook.com/kemakom'],
            ['type' => 'instagram', 'title' => 'Instagram', 'info' => '@kemakom_ugm'],
        ];

        foreach ($contacts as $contact) {
            DB::table('contacts')->insert([
                'type' => $contact['type'],
                'title' => $contact['title'],
                'info' => $contact['info'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Timeline Table
        $events = [
            ['year' => '1985', 'title' => 'Pendirian Program Studi', 'description' => 'Pendirian Program Studi Ilmu Komputer UGM', 'icon' => 'building'],
            ['year' => '1990', 'title' => 'Akreditasi Pertama', 'description' => 'Mendapatkan akreditasi pertama dari BAN-PT', 'icon' => 'award'],
            ['year' => '2000', 'title' => 'Pembangunan Gedung Baru', 'description' => 'Pembangunan gedung baru untuk menampung mahasiswa yang semakin bertambah', 'icon' => 'building'],
            ['year' => '2010', 'title' => 'Kerjasama Internasional', 'description' => 'Penandatanganan kerjasama dengan universitas di luar negeri', 'icon' => 'users'],
            ['year' => '2020', 'title' => 'Pandemi COVID-19', 'description' => 'Penerapan pembelajaran daring selama pandemi', 'icon' => 'calendar'],
        ];

        foreach ($events as $event) {
            DB::table('timeline')->insert([
                'year' => $event['year'],
                'title' => $event['title'],
                'description' => $event['description'],
                'icon' => $event['icon'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
