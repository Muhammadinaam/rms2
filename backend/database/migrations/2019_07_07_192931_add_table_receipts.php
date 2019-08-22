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
            $table->string('customer')->nullable()->default(null);
            $table->decimal('received_amount')->default(0);
            $table->decimal('returned_amount')->default(0);
            $table->decimal('actual_amount')->default(0);
            $table->string('remarks')->nullable();

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
