<?php

namespace App\Http\Controllers;

use App\Events\QueueUpdated;
use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()

    {
        $user_session = auth()->user();

        $transaction = Transaction::query()
            ->limit(1)
            ->where('window_id', $user_session->window_id)
            ->where('window_number', $user_session->window_num)
            ->where('status', 1)
            ->orderBy('id', 'desc')
            ->first();


        return inertia("Staff/StaffQue", [
            'que_number' => $transaction,

            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request, $window_id, $window_number)
    {
        // Define queue prefixes in arrays for each window type
        $queues = [
            1 => [
                0 => "CS",

            ],
            2 => [
                1 => "AS",
                2 => "AST",
                3 => "ASM",
            ],
            3 => [
                0 => "RG",

            ],
        ];

        // Validate window_id and window_number
        if (!isset($queues[$window_id]) || !isset($queues[$window_id][$window_number])) {
            return response()->json(['error' => 'Invalid window ID or window number'], 400);
        }

        // Determine the correct queue prefix based on window_id and window_number
        $queue_prefix = $queues[$window_id][$window_number];

        // Count existing transactions for each window type
        $cashier_count    = DB::table('transactions')->where('window_id', 1)->count();
        $assessment_count = DB::table('transactions')->where('window_id', 2)->count();
        $registrar_count  = DB::table('transactions')->where('window_id', 3)->count();

        // Determine queue number
        switch ($window_id) {
            case 1:
                $que_no = $cashier_count + 1;
                break;
            case 2:
                $que_no = $assessment_count + 1;
                break;
            case 3:
                $que_no = $registrar_count + 1;
                break;
            default:
                return response()->json(['error' => 'Invalid window ID'], 400);
        }

        // Construct the queue update string
        $que_update = $queue_prefix . $que_no;

        // Insert the transaction
        Transaction::create([
            'window_id'    => $window_id,
            'queue_number' => $que_update,
            'status'       => '0',
            'window_number' => $window_number
        ]);

        // Return response using Inertia.js
        return inertia('Queview', [
            'queue_number' => $que_update
        ]);
    }



    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        $user_session = auth()->user();

        $transaction = Transaction::query()
            ->limit(1)
            ->where('window_id', $user_session->window_id)
            ->where('window_number', $user_session->window_num)
            ->where('status', 1)
            ->orderBy('id', 'desc')
            ->first();

        return inertia("Staff/StaffQue", [
            'que_number' => $transaction
        ]);
    }

    /**
     * Show the transaction view for the transac route.
     */

    public function showTransac($window_id, $window_number)
    {
        // Fetch the transaction if needed or just return the view
        return inertia('Queview', [
            'window_id' => $window_id,
            'window_number' => $window_number,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Transaction $transaction)
    {
        $user_session = auth()->user();

        //get count when all ques has been completed to 
        $table_count    = DB::table('transactions')->where('window_id', $user_session->window_id)
            ->where('status', 0)
            ->count();

          // check if there are no ques available
        if ($table_count == 0) {
            $no_available = ['queue_number' => "No Que Available"];
            return inertia("Staff/StaffQue", [
                'que_number' => $no_available
            ]);
        }

        //set window number to 0 first for cashier and registrar
        if ($user_session->window_id == 1 || $user_session->window_id == 3) {

            $transaction->where('window_id', $user_session->window_id)
                ->where('status', 0)
                ->limit(1)
                ->update([
                    'status' => '1',
                    'window_number' => $user_session->window_num
                ]);
        } else {
            $transaction->where('window_id', $user_session->window_id)
                ->where('window_number', $user_session->window_num)
                ->where('status', 0)
                ->limit(1)
                ->update([
                    'status' => '1',

                ]);
        }

        //get latest serving que that has been updated 
        $que_view = Transaction::query()
            ->limit(1)
            ->where('window_id', $user_session->window_id)
            ->where('window_number', $user_session->window_num)
            ->where('status', 1)
            ->orderBy('id', 'desc')
            ->first();

        // Dispatch the event for socket
        event(new QueueUpdated($que_view->queue_number, $que_view->window_number));
        
        return inertia("Staff/StaffQue", [
            'que_number' => $que_view
        ]);
        return to_route('staff.index');
    }


    // public function requeue($window_id, $queue_number)
    // {
    //     // Insert the transaction
    //     Transaction::create([
    //         'window_id'    => $window_id,
    //         'queue_number' => $queue_number,
    //         'status'       => '0'
    //     ]);
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
