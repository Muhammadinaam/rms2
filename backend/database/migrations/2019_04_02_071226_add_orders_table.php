<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            
            $table->uuid('id')->primary();

            $table->integer('order_type_id');
            $table->string('order_number')->unique();
            
            $table->string('customer_name')->nullable();
            $table->string('customer_address')->nullable();
            $table->string('customer_phone')->nullable();
            $table->string('customer_zipcode')->nullable();

            $table->decimal('customer_lat', 10, 7)->nullable();
            $table->decimal('customer_long', 10, 7)->nullable();

            $table->decimal('order_amount_before_discount');
            
            $table->decimal('discount_percent');
            $table->decimal('discount_amount');
            
            $table->decimal('sales_tax_percent');
            $table->decimal('sales_tax_amount');
            
            $table->decimal('delivery_charges');

            $table->integer('order_status_id');

            $table->string('tracking_number')->nullable();

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
        Schema::dropIfExists('orders');
    }
}
