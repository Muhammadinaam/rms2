<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTableReceipttypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('receipttypes', function (Blueprint $table) {
            
            $table->bigIncrements('id');

            $table->string('name');
            $table->boolean('amount_can_be_more_than_bill')->default(false);
            $table->boolean('customer_name_required')->default(false);
            $table->boolean('auto_add')->default(false);
            $table->boolean('is_activated')->default(true);
            
            $table->timestamps();
        });

        DB::table('receipttypes')
            ->insert([
                [
                    'name' => 'Cash',
                    'amount_can_be_more_than_bill' => true,
                    'auto_add' => true,
                ],
                [
                    'name' => 'Card',
                    'amount_can_be_more_than_bill' => false,
                    'auto_add' => true,
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
        Schema::dropIfExists('receipttypes');
    }
}
