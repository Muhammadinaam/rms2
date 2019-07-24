<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMoreSettings extends Migration
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
                    'group' => 'Order Settings',
                    'name' => 'Delivery Charges Note',
                    'idt' => 'delivery-charges-note',
                    'type' => 'text',
                    'instructions' => 'Example: Rs. 90 will be charged as delivery charges on orders upto Rs. 500. No Delivery Charges on Order of Rs. 500 or more'
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Restaurant name',
                    'idt' => 'restaurant-name',
                    'type' => 'text',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Welcome Note',
                    'idt' => 'welcome-note',
                    'type' => 'textarea',
                    'instructions' => 'Example: At Chillies, we are passionate about good food. We deliver excellent food and service consistently with the help of our well-groomed staffs, so we stand out from the rest. We have an extensive traditional and authentic menu to choose from. We believe our food is exceptional due to the standards of selecting the finest ingredients and spices to make meal a good experience to remember. We would welcome you to try out our menu. We promise you that with all the passion and effort that we put into our food, it would be miles ahead of your expectations.'
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Opening Hours',
                    'idt' => 'opening-hours',
                    'type' => 'text',
                    'instructions' => 'Start Time and End Time (separated by comma), Example: 3:00PM,11:00PM'
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Online Delivery Time',
                    'idt' => 'online-delivery-time',
                    'type' => 'text',
                    'instructions' => 'Start Time and End Time (separated by comma), Example: 3:00PM,11:00PM'
                ],
                [
                    'group' => 'Order Settings',
                    'name' => 'Delivery Areas',
                    'idt' => 'delivery-areas',
                    'type' => 'text',
                    'instructions' => 'Example: We deliver in Area1, Area2, Area3 etc'
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Address',
                    'idt' => 'address',
                    'type' => 'text',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Email',
                    'idt' => 'email',
                    'type' => 'text',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Telephone',
                    'idt' => 'telephone',
                    'type' => 'text',
                    'instructions' => null
                ],

                [
                    'group' => 'Site Settings',
                    'name' => 'Facebook Link',
                    'idt' => 'facebook-link',
                    'type' => 'text',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Twitter Link',
                    'idt' => 'twitter-link',
                    'type' => 'text',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Instagram Link',
                    'idt' => 'instagram-link',
                    'type' => 'text',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Youtube Link',
                    'idt' => 'youtube-link',
                    'type' => 'text',
                    'instructions' => null
                ],

                [
                    'group' => 'Site Settings',
                    'name' => 'Android App Link',
                    'idt' => 'android-app-link',
                    'type' => 'text',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Iphone App Link',
                    'idt' => 'iphone-app-link',
                    'type' => 'text',
                    'instructions' => null
                ],
                [
                    'group' => 'Site Settings',
                    'name' => 'Instructions',
                    'idt' => 'instructions',
                    'type' => 'text',
                    'instructions' => 'instructions in html, example: <ul><li>There is no refund offered on food</li><li>All Credit Cards accepted</li></ul>'
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
                'delivery-charges-note',
                'restaurant-name',
                'welcome-note',
                'opening-hours',
                'online-delivery-time',
                'delivery-areas',
                'address',
                'email',
                'telephone',
                'facebook-link',
                'twitter-link',
                'instagram-link',
                'youtube-link',
                'android-app-link',
                'iphone-app-link',
                'instructions',
            ])
            ->delete();


        });
    }
}
