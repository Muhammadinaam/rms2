<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTableSessionAmounts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('session_amounts', function (Blueprint $table) {
            
            $table->bigIncrements('id');
            
            $table->bigInteger('session_id');
            $table->bigInteger('receipttype_id');
            $table->decimal('system_amount');
            $table->decimal('actual_amount');

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
        Schema::dropIfExists('session_amounts');
    }
}
