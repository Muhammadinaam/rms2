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
            $table->decimal('received_through_cash')->nullable()->after('receivable_amount');
            $table->decimal('received_through_card')->nullable()->after('received_through_cash');
            $table->bigInteger('received_by')->nullable()->after('received_through_card');
            $table->bigInteger('cancelled_by')->nullable()->after('received_by');
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
                    'received_through_cash',
                    'received_through_card',
                    'received_by',
                    'cancelled_by',
                    'order_booked_by',
                ]);

        });
    }
}
