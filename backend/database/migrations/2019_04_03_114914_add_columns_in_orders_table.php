<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsInOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            
            $table->decimal('receivable_amount')->after('delivery_charges');
            $table->bigInteger('cancelled_by')->nullable()->after('receivable_amount');
            $table->bigInteger('order_booked_by')->nullable()->after('cancelled_by');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            
            $table->dropColumn(
                [
                    'receivable_amount',
                    'cancelled_by',
                    'order_booked_by',
                ]);

        });
    }
}
