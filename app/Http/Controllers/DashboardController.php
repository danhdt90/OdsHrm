<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RequestTemplate;
class DashboardController extends Controller
{
    public function index()
    {
        $allTemplate = RequestTemplate::all();
        return Inertia::render('Dashboard',compact('allTemplate'));
    }
}
