<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSettingsInSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        DB::table('settings')
            ->insert([
                [
                    'group' => 'General Settings',
                    'name' => 'Web Discount %',
                    'idt' => 'web-discount-percent',
                    'type' => 'number',
                    'instructions' => null,
                ],
                [
                    'group' => 'General Settings',
                    'name' => 'Sales Tax %',
                    'idt' => 'sales-tax-percent',
                    'type' => 'number',
                    'instructions' => null,
                ],
                [
                    'group' => 'General Settings',
                    'name' => 'Currency Code',
                    'idt' => 'currency-code',
                    'type' => 'text',
                    'instructions' => 'For example: GBP for £ and USD for $',
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
                'web-discount-percent',
                'sales-tax-percent',
                'currency-code',
            ])
            ->delete();
    }
}
