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
            
            $table->string('idt')->unique();
            $table->string('name')->unique();
        });

        DB::table('order_types')
            ->insert([
                [
                    'idt' => 'od',
                    'name' => 'Online Delivery',
                ],
                [
                    'idt' => 'di',
                    'name' => 'Dine In',
                ],
                [
                    'idt' => 'ta',
                    'name' => 'Take Away',
                ],
                [
                    'idt' => 'otd',
                    'name' => 'Other Delivery',
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
        Schema::dropIfExists('order_types');
    }
}
