<?php

namespace App\Http\Controllers\Requests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserRequests;
use App\Models\RequestTemplate;
use App\Models\InputDetailRequest;
use Inertia\Inertia;

class UserRequestController extends Controller
{
    public function index()
    {
        return;
    }

    public function add_new_request_form(Request $request)
    {
        $id_template = $request->id_template;
        // $inputDetails = InputDetailRequest::find($id_template);
        $inputDetailRequests = InputDetailRequest::where('id_request_templates', $id_template)->get();

        return Inertia::render('Requests/Create_request', compact('inputDetailRequests'));
    }

    public function create(Request $request)
    {
        // Get the input values
        $request_name = $request->input('request_name');
       
    }
}
