<?php

namespace Database\Seeders;

use App\Models\Report;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Report::create([
            'user_id' => 2,
            'title' => 'Kekurangan Bangku',
            'where_is' => 'Komdigi Medan',
            'phone' => '082274040496',
            'image' => null,
            // 'status' => 'menunggu',
            'report' => 'Perlu ada penambahan bangku agar daya tampung komdigi lebih banyak.',
        ]);

        Report::create([
            'user_id' => 3,
            'title' => 'Kekurangan Bangku',
            'where_is' => 'Komdigi Medan',
            'phone' => '082274040496',
            'image' => null,
            // 'status' => 'menunggu',
            'report' => 'Perlu ada penambahan bangku agar daya tampung komdigi lebih banyak.',
        ]);
    }
}
