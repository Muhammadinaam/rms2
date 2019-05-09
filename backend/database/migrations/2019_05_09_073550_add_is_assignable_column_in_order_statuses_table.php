<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIsAssignableColumnInOrderStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_statuses', function (Blueprint $table) {
            
            $table->boolean('is_assignable')->default(0);

        });

        DB::table('order_statuses')
            ->whereIn('order_statuses.idt', [
                'phone-confirmation-pending',
                'preparing',
                'on-the-way',
                'served'
            ])
            ->update([
                'is_assignable' => 1,
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_statuses', function (Blueprint $table) {
            $table->dropColumn(['is_assignable']);
        });
    }
}
