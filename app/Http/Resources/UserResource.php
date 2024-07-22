<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'name'           => $this->name,
            'email'          => $this->email,
            'user_type_name' => $this->user_type_name,
            'win_name'       => $this->win_name,
            'user_type_id'   => $this->user_type_id,
            'window_id'      => $this->window_id,
            'window_num'     => $this->window_num,
            'created_at'     => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
