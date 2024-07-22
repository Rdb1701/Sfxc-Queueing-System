<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScreenController extends Controller
{
    public function index()
    {
        // Function to get the latest transaction
        function getTransaction($window_id, $window_number)
        {
            return DB::table('transactions')
                ->limit(1)
                ->where('status', 1)
                ->where('window_id', $window_id)
                ->where('window_number', $window_number)
                ->orderBy('id', 'desc')
                ->first();
        }

        // Arrays to hold transaction data
        $cashiers = [];
        $assessments = [];
        $registrars = [];

        // Populate the arrays with data
        for ($i = 1; $i <= 3; $i++) {
            $cashiers[$i]    = getTransaction(1, $i);
            $assessments[$i] = getTransaction(2, $i);
            $registrars[$i]  = getTransaction(3, $i);
        }

        return inertia("Screen", [
            'cashier1'    => $cashiers[1],
            'cashier2'    => $cashiers[2],
            'cashier3'    => $cashiers[3],
            'assessment1' => $assessments[1],
            'assessment2' => $assessments[2],
            'assessment3' => $assessments[3],
            'registrar1'  => $registrars[1],
            'registrar2'  => $registrars[2],
            'registrar3'  => $registrars[3],
        ]);
    }

    public function getLatestQueues()
    {
        function getTransact($window_id, $window_number)
        {
            return DB::table('transactions')
                ->limit(1)
                ->where('status', 1)
                ->where('window_id', $window_id)
                ->where('window_number', $window_number)
                ->orderBy('id', 'desc')
                ->first();
        }

        // Arrays to hold transaction data
        $cashiers = [];
        $assessments = [];
        $registrars = [];

        // Populate the arrays with data
        for ($i = 1; $i <= 3; $i++) {
            $cashiers[$i]    = getTransact(1, $i);
            $assessments[$i] = getTransact(2, $i);
            $registrars[$i]  = getTransact(3, $i);
        }
        return response()->json([
            'cashier1'    => $cashiers[1],
            'cashier2'    => $cashiers[2],
            'cashier3'    => $cashiers[3],
            'assessment1' => $assessments[1],
            'assessment2' => $assessments[2],
            'assessment3' => $assessments[3],
            'registrar1'  => $registrars[1],
            'registrar2'  => $registrars[2],
            'registrar3'  => $registrars[3],
        ]);
    }
}
