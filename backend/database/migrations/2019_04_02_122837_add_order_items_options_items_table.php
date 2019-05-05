<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrderItemsOptionsItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items_options_items', function (Blueprint $table) {
            
            $table->bigIncrements('id');

            $table->bigInteger('order_item_option_id');
            $table->bigInteger('option_item_id');
            $table->string('name');
            $table->string('price');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items_options_items');
    }
}
