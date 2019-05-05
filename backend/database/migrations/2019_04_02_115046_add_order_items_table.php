<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            
            $table->uuid('id')->primary();
            
            $table->uuid('order_id');
            
            $table->bigInteger('item_id');
            $table->string('name');
            $table->decimal('price');
            $table->decimal('item_price_with_options');
            $table->decimal('quantity');
            $table->decimal('item_total_price');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
    }
}
