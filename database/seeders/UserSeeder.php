<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = collect([
            'root' => [
                'name' => 'JVG',
                'email' => 'root@komdigi.com',
                'password' => bcrypt('komdigi'),
                'email_verified_at' => now(),
            ],
            'civil' => [
                'name' => 'Civil Account',
                'email' => 'owner@komdigi.com',
                'password' => bcrypt('komdigi'),
                'email_verified_at' => now(),
            ],
        ]);

        $users->each(function ($data, $role) {
            $instanceUser = User::create($data);
            $instanceUser->assignRole($role);
        });
    }
}
