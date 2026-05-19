<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    protected function generatePermissions() : array
    {
        $models = [];
        $path   = app_path('Models');
        $permissions = ['create', 'read', 'update', 'delete'];

        foreach (glob($path. '/*.php') as $file) {
            $model_name = strtolower(basename($file, '.php'));
            foreach ($permissions as $permission) {
                $models[] = "{$permission} {$model_name}";
            }
        }

        return $models;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         collect($this->generatePermissions())
            ->each( fn ($permission) => Permission::create([
                'name' => $permission
            ]));

        $role_permissions = collect([
            'root' => Permission::pluck('name')->toArray(),
            'civil' => [
                'read report',
            ],
        ]);

        $role_permissions->each( function ($permissions, $role) {
            $role_instance = Role::firstOrCreate(['name' => $role]);
            $role_instance->givePermissionTo($permissions);
        });
    }
}
