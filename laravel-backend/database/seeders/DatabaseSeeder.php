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
        // Run dedicated seeders for users and learning modules
        $this->call([
            UserSeeder::class,
            LearningModuleSeeder::class,
        ]);

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

        // Seed Timeline Table
        $events = [
            ['year' => '1985', 'title' => 'Pendirian Program Studi', 'description' => 'Pendirian Program Studi Pendidikan Ilmu Komputer dan Ilmu Komputer UPI', 'icon' => 'building'],
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
