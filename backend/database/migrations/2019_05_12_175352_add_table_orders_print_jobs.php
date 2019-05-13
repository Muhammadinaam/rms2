<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTableOrdersPrintJobs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders_print_jobs', function (Blueprint $table) {
            
            $table->bigIncrements('id');

            $table->string('print_type');
            $table->uuid('order_id');
            $table->uuid('order_edit_id')->nullable();
            
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
        Schema::dropIfExists('orders_print_jobs');
    }
}
