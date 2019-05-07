<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSliderImagesInSettings extends Migration
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
                    'group' => 'Site Settings',
                    'name' => 'Slider Image 1',
                    'idt' => 'slider-image-1',
                    'type' => 'image',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Slider Image 2',
                    'idt' => 'slider-image-2',
                    'type' => 'image',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Slider Image 3',
                    'idt' => 'slider-image-3',
                    'type' => 'image',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Slider Image 4',
                    'idt' => 'slider-image-4',
                    'type' => 'image',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Slider Image 5',
                    'idt' => 'slider-image-5',
                    'type' => 'image',
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
                'slider-image-1',
                'slider-image-2',
                'slider-image-3',
                'slider-image-4',
                'slider-image-5',
            ])
            ->delete();
            
        });
    }
}
