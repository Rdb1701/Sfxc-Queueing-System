<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'window_id',
        'queue_number',
        'status',
        'window_number'
    ];

    public function window()
    {
        return $this->belongsTo(Window_list::class);
    }
}
