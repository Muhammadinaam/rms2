<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTableSessions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            
            $table->bigIncrements('id');
            
            $table->datetime('start_datetime');
            $table->datetime('end_datetime')->nullable();
            $table->decimal('opening_cash')->default(0);
            $table->decimal('closing_cash')->default(0);
            $table->bigInteger('closed_by');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
    }
}
