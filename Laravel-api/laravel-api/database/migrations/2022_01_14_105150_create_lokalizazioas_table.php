<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLokalizazioasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lokalizazioas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('izena');
            $table->float('latitudea',30,20);;
            $table->float('longitudea',30,20);;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lokalizazioas');
    }
}
