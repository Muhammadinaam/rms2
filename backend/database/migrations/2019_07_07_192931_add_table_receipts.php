<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTableReceipts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('receipts', function (Blueprint $table) {
            
            $table->bigIncrements('id');
            
            $table->uuid('order_id');
            $table->bigInteger('session_id');
            $table->bigInteger('received_by');
            $table->bigInteger('receipttype_id');
            $table->decimal('received_amount');
            $table->decimal('returned_amount');
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
        Schema::dropIfExists('receipts');
    }
}
