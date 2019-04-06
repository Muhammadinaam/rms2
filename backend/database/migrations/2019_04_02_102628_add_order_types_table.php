<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrderTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_types', function (Blueprint $table) {
            
            $table->bigIncrements('id');
            
            $table->string('idt');
            $table->string('name');
        });

        DB::table('order_types')
            ->insert(
                [
                    'idt' => 'web-delivery',
                    'name' => 'Web Delivery',
                ],
                [
                    'idt' => 'dine-in',
                    'name' => 'Dine In',
                ],
                [
                    'idt' => 'take-away',
                    'name' => 'Take Away',
                ],
                [
                    'idt' => 'other-delivery',
                    'name' => 'Other Delivery',
                ]
            );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_types');
    }
}
