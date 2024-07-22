<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'window_id'    => $this->window_id,
            'queue_number' => $this->queue_number,
            'status'       => $this->status,
            'created_at'   => (new Carbon($this->created_at))->format('Y-m-d'),

        ];
    }
}
