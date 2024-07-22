<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QueController extends Controller
{
    public function index()
    {
        $query = DB::table('transactions as trans')
            ->select('win.window_name as win_name', DB::raw('COUNT(trans.queue_number) as que_count'), 'win.id')
            ->leftJoin('window_lists as win', 'win.id', '=', 'trans.window_id')
            ->groupBy('win.id', 'win.window_name')
            ->distinct()
            ->get();


        return inertia("Que/Que", [
            'ques' => $query,
            'success' => session('success'),
        ]);
    }

    public function destroy($que_id)
    {
        $query =  DB::table('transactions')
            ->where('window_id', $que_id)
            ->where('status', '!=', 2);


        $query->delete();
        return to_route("que.index")
            ->with('success', 'Successfully Deleted');
    }
}
