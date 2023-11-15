<?php
namespace App\Http\Controllers\Requests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\RequestTemplate;
class RequestTemplateController extends Controller
{
    public function index()
    {
        // Hiển thị danh sách các request templates
        $templates = RequestTemplate::all();
        // return view('templates.index', compact('templates'));
        return Inertia::render('Requests/Request_templates', compact('templates'));

    }

    public function create(Request $request)
    {
        $user = RequestTemplate::create([
            'template_name' => $request->template_name
        ]);
        // Trang tạo mới request template
        return redirect()->route('Request_templates');
    }

    public function store(Request $request)
    {
        // Lưu request template mới
        $template = new RequestTemplate();
        $template->template_name = $request->input('template_name');
        $template->request_form = $request->input('request_form');
        $template->flow_of_approvers = $request->input('flow_of_approvers');
        $template->save();

        return redirect()->route('Request_templates')->with('success', 'Request Template created successfully');
    }

    public function edit($id)
    {
        // Trang chỉnh sửa request template
        $template = RequestTemplate::findOrFail($id);
        
        return Inertia::render('Requests/Detail_request_template', compact('template'));
    }

    public function update(Request $request, $id)
    {
        // Cập nhật request template
        $template = RequestTemplate::findOrFail($id);
        $template->template_name = $request->input('template_name');
        $template->request_form = $request->input('request_form');
        $template->flow_of_approvers = $request->input('flow_of_approvers');
        $template->save();

        return redirect()->route('Request_templates')->with('success', 'Request Template updated successfully');
    }

    public function destroy(Request $request, $id)
    {
        // Xóa request template
        $template = RequestTemplate::findOrFail($request->id);
        $template->delete();

        return redirect()->route('Request_templates')->with('success', 'Request Template deleted successfully');
    }
}
