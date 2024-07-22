<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getCounts()
    {
        $cashier    = DB::table('transactions')->where('window_id', 1)->count();
        $assessment = DB::table('transactions')->where('window_id', 2)->count();
        $registrar  = DB::table('transactions')->where('window_id', 3)->count();

        return response()->json([
            'cashier'    => $cashier,
            'assessment' => $assessment,
            'registrar'  => $registrar,
        ]);
    }
}
