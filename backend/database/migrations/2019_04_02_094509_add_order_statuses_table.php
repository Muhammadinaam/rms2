<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrderStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_statuses', function (Blueprint $table) {
            
            $table->bigIncrements('id');
            
            $table->string('idt');
            $table->string('name');
        });

        DB::table('order_statuses')
            ->insert
            ([
                [
                    'idt' => 'phone-confirmation-pending',
                    'name' => 'Phone Confirmation Pending',
                ],
                [
                    'idt' => 'preparing',
                    'name' => 'Preparing',
                ],
                [
                    'idt' => 'on-the-way',
                    'name' => 'On The Way',
                ],
                [
                    'idt' => 'served',
                    'name' => 'Served',
                ],
                [
                    'idt' => 'printed-for-customer',
                    'name' => 'Printed For Customer',
                ],
                [
                    'idt' => 'cancelled',
                    'name' => 'Cancelled',
                ],
                [
                    'idt' => 'closed',
                    'name' => 'Closed',
                ]
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_statuses');
    }
}
