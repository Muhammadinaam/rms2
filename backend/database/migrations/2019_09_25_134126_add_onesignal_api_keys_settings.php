<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOnesignalApiKeysSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('settings', function (Blueprint $table) {

            DB::table('settings')
            ->insert([
                [
                    'group' => 'Push Notifications',
                    'name' => 'API Key',
                    'idt' => 'api-key',
                    'type' => 'text',
                    'instructions' => null
                ],
                [
                    'group' => 'Push Notifications',
                    'name' => 'APP ID',
                    'idt' => 'app-id',
                    'type' => 'text',
                    'instructions' => null
                ],
            ]);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('settings', function (Blueprint $table) {
            
            DB::table('settings')
            ->whereIn('idt', [
                'api-key',
                'app-id',
            ])
            ->delete();


        });
    }
}
