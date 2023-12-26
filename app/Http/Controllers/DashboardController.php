<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RequestTemplate;
use App\Models\User;
use App\Models\UserRequests;
use App\Models\UserRequestsApprover;
use App\Models\InputDetailRequest;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $userRequests = UserRequests::where('id_user', $userId)
            ->join('request_templates', 'user_requests.request_template', '=', 'request_templates.id')
            ->select('user_requests.*', 'request_templates.template_name')
            ->get();

        $userList = User::pluck('name', 'id')->all();
        $allTemplate = RequestTemplate::all();
        $inputDetailRequests = InputDetailRequest::pluck('input_description', 'input_name')->all();

        $needApprove = UserRequestsApprover::where('user_id', $userId)
            ->join('user_requests', 'user_requests.id', '=', 'user_request_approver.id_request')
            ->join('users', 'users.id', '=', 'user_requests.id_user')
            ->join('request_templates', 'user_requests.request_template', '=', 'request_templates.id')
            ->select('user_requests.*', 'users.name as user_name', 'request_templates.template_name')
            ->get();

        return Inertia::render('Dashboard', compact('allTemplate', 'userRequests', 'needApprove', 'inputDetailRequests', 'userList'));
    }

}
