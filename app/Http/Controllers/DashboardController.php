<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RequestTemplate;
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
        $needApprove = UserRequestsApprover::where('user_id', $userId)
            ->join('user_requests', 'user_requests.id', '=', 'user_request_approver.id_user_request')
            ->join('users', 'user_requests.id_user', '=', 'users.id')
            ->join('request_templates', 'user_requests.request_template', '=', 'request_templates.id')
            ->select('user_request_approver.*', 'user_requests.id as user_request_id', 'user_requests.request_name', 'request_templates.template_name', 'users.name as user_name')
            ->get();
        $allTemplate = RequestTemplate::all();
        $inputDetailRequests = InputDetailRequest::pluck('input_description', 'input_name')->all();

        return Inertia::render('Dashboard', compact('allTemplate', 'userRequests','needApprove','inputDetailRequests'));
    }

}
