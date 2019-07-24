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
                    'name' => 'Website Discount %',
                    'idt' => 'website-discount-percent',
                    'type' => 'number',
                    'instructions' => 'Discount on orders through Website',
                ],
                [
                    'group' => 'General Settings',
                    'name' => 'App Discount %',
                    'idt' => 'app-discount-percent',
                    'type' => 'number',
                    'instructions' => 'Discount on orders through Mobile App',
                ],
                [
                    'group' => 'General Settings',
                    'name' => 'General Discount %',
                    'idt' => 'general-discount-percent',
                    'type' => 'number',
                    'instructions' => 'Discount on orders other than through Website or Mobile App',
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
                'online-discount-percent',
                'general-discount-percent',
                'sales-tax-percent',
                'currency-code',
            ])
            ->delete();
    }
}
