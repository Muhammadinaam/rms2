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
            $table->string('description');
        });

        DB::table('order_statuses')
            ->insert
            ([
                [
                    'idt' => 'phone-confirmation-pending',
                    'name' => 'Phone Confirmation Pending',
                    'description' => 'We will call you to confirm your order'
                ],
                [
                    'idt' => 'phone-not-confirmed',
                    'name' => 'Phone Not Confirmed',
                    'description' => 'We were not able to call you at provided number. Please call us'
                ],
                [
                    'idt' => 'preparing',
                    'name' => 'Preparing',
                    'description' => 'We are preparing your order'
                ],
                [
                    'idt' => 'on-the-way',
                    'name' => 'On The Way',
                    'description' => 'Your order is on the way'
                ],
                [
                    'idt' => 'served',
                    'name' => 'Served',
                    'description' => 'Order has been served'
                ],
                [
                    'idt' => 'printed-for-customer',
                    'name' => 'Printed For Customer',
                    'description' => 'Order has been printed for customer'
                ],
                [
                    'idt' => 'cancelled',
                    'name' => 'Cancelled',
                    'description' => 'Order has been cancelled'
                ],
                [
                    'idt' => 'closed',
                    'name' => 'Completed',
                    'description' => 'Order has been completed'
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
