<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::table('settings')
            ->insert([
                [
                    'group' => 'Order Settings',
                    'name' => 'Minimum Order Amount',
                    'idt' => 'minimum-order-amount',
                    'type' => 'number',
                    'instructions' => null,
                ],
                [
                    'group' => 'Order Settings',
                    'name' => 'Delivery Charges Function',
                    'idt' => 'delivery-charges-function',
                    'type' => 'text',
                    'instructions' => 'Function for delivery charges e.g. (order_amount) => { return order_amount < 100 ? 10 : 0; }',
                ],
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('settings')
            ->whereIn('idt', [
                'minimum-order-amount',
                'delivery-charges',
            ])
            ->delete();
    }
}
