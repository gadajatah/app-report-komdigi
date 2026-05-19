<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            UserSeeder::class,
        ]);

        $usr2 = User::create([
            'name' => 'Civil Account Beda',
            'email' => 'civil2@komdigi.com',
            'password' => bcrypt('komdigi'),
            'email_verified_at' => now(),
        ]);

        $usr2->assignRole('civil');

        $this->call(ReportSeeder::class);
    }
}
