<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;

class AddUseridColumnInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('userid')->after('id');
        });

        // default user
        DB::table('users')
            ->insert([
                'name' => 'Admin',
                'userid' => 'admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('123456'),
                'is_activated' => 1,
                'user_type' => 'Super Admin',
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['userid']);
        });
    }
}
