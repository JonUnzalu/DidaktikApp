<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lokalizazioa extends Model
{
    protected $fillable = ['izena','latitudea','longitudea'];
}
