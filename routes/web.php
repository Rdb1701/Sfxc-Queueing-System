<?php

use App\Events\QueueUpdated;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QueController;
use App\Http\Controllers\ScreenController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin'        => Route::has('login'),
//         'canRegister'     => Route::has('register'),
//         'laravelVersion'  => Application::VERSION,
//         'phpVersion'      => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', function () {
    return Inertia::render('Queview');
})->name('queview');


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('course', CourseController::class);
    Route::resource('users', UserController::class);

    //Staff Ques
    Route::resource('staff', TransactionController::class);

    //Changepass Routes
    Route::get('users/{user}/changepassword', [UserController::class, 'changepassView'])
        ->name('users.changepassword_view');
    Route::patch('users/{user}/changepassword', [UserController::class, 'changepassword'])
        ->name('users.changepassword');

    //Que routes
    Route::get('/que', [QueController::class, 'index'])
        ->name('que.index');

    Route::delete('/que/{que}', [QueController::class, 'destroy'])
        ->name('que.destroy');

    //staff requeue
    Route::get('/staff/{staff}/{que_number}', [TransactionController::class, 'requeue'])
        ->name('staff.requeue');
});

// Route for GET request
Route::get('/transac/{window_id}/{window_number}', [TransactionController::class, 'showTransac'])->name('transac.show');

Route::post('/transac/{window_id}/{window_number}', [TransactionController::class, 'store'])
    ->name('transac.store');


//QUEUE DISPLAY
Route::get('/screen', [ScreenController::class, 'index'])
    ->name('screen.index');

//SCREEN AXIOS API ROUTE
Route::get('/screen/latest-queues', [ScreenController::class, 'getLatestQueues']);


Route::get('/dashboard/queue-counts', [DashboardController::class, 'getCounts']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
