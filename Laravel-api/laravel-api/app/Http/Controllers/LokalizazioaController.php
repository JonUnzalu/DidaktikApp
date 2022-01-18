<?php

namespace App\Http\Controllers;

use App\Models\Lokalizazioa;
use Illuminate\Http\Request;

class LokalizazioaController extends Controller
{
    public function index(){
        return Lokalizazioa::all();
    }
}
