<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class QueueUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $window_no;

    public function __construct($message, $window_no)
    {
        $this->message   = $message;
        $this->window_no = $window_no;
    }

    public function broadcastOn()
    {
        return new Channel('my-channel');
    }

    public function broadcastAs()
    {
        return 'que-event';
    }
}
