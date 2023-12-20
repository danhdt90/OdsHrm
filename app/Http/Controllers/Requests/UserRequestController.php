<?php

namespace App\Http\Controllers\Requests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserRequests;
use App\Models\RequestTemplate;
use App\Models\InputDetailRequest;
use App\Models\User;
use App\Models\UserRequestsApprover;

use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserRequestController extends Controller
{
    public function index()
    {
        // $userRequests = UserRequests::all();
        $allLeaderAdmin = User::whereIn('role', ['1', '99'])->get();

        $userRequests = UserRequests::join('users', 'user_requests.id_user', '=', 'users.id')
            ->join('request_templates', 'user_requests.request_template', '=', 'request_templates.id')
            ->select('user_requests.*', 'users.name as user_name', 'request_templates.template_name')
            ->get();
        return Inertia::render('Requests/Request_list', compact('userRequests','allLeaderAdmin'));
    }

    public function add_new_request_screen(Request $request)
    {
        $id_template = $request->id_template;

        // $inputDetails = InputDetailRequest::find($id_template);
        $inputDetailRequests = InputDetailRequest::where('id_request_templates', $id_template)->get();
        $allLeaderAdmin = User::whereIn('role', ['1', '99'])->get();
        return Inertia::render('Requests/Create_request', compact('inputDetailRequests','allLeaderAdmin','id_template'));
    }

    public function create(Request $request)
    {
        // Get the input values
            $requestAll = $request->all();
            // Xử lý file
            $uploadedFiles = [];
            if ($request->allFiles()) {
                $allFiles = $request->allFiles();
                foreach ($allFiles as $name_input => $file) {
                    $fileName = $file->getClientOriginalName();
                    $path = $file->store('public/files');

                    $requestAll[$name_input] = [
                        'file_name' => $fileName,
                        'file_path' => Storage::url($path),
                    ];
                }
            }


            $json_data = json_encode($requestAll, JSON_UNESCAPED_UNICODE);
            // Lưu vào cơ sở dữ liệu

            $userRequest = UserRequests::create([
                'id_user' => $request->id_user,
                'request_template' => $request->id_template,
                'content_request' => $json_data,
            ]);

            if ($request->input('follower')) {
                $followerValue = $request->input('follower');
                try {
                    UserRequestsApprover::create([
                        'user_id' => $followerValue,
                        'id_user_request' => $userRequest->id,
                    ]);
                } catch (\Throwable $th) {
                    throw $th;
                }

                // Sử dụng giá trị của trường dữ liệu "follower" ở đây
            }

            // return response()->json(['status'=>true]);
            return response()->json(['status' => true]);
        }
    public function delete(Request $request)
    {
        $id = $request->id;
        $userRequest = UserRequests::find($id);
        $userRequest->delete();
        return response()->json(['status' => true]);
    }
}
