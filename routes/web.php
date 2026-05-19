<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');

    Route::controller(Controllers\ReportController::class)
        ->prefix('report')->name('report.')
        ->group(function () {
            Route::middleware(['role:root|civil'])
                ->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('/create', 'store')->name('store');
                    Route::patch('/{report}/update', 'update')->name('update');
                    Route::delete('/{report}/delete', 'destroy')->name('destroy');
                });
        });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/dev.php';
