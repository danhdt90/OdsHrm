<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequests extends Model
{
    use HasFactory;
    protected $table = 'user_requests';
    protected $fillable = [
        'request_name',
        'request_template',
        'content_request',
        'flow_approvers',
        'id_user',
    ];
    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('order')->withTimestamps();
    }
}
