<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class SettingsController extends Controller
{
    public function getAllSettings()
    {
        $settings = DB::table('settings')
            ->get();
            
        if(request()->has('grouped') && request()->grouped == 1)
        {
            $settings = $settings->groupBy('group');
        }
            
        return $settings;
    }

    public function saveSettings()
    {
        $settings = request()->all();

        foreach($settings as $group => $settings_in_group)
        {
            foreach($settings_in_group as $setting)
            {
                DB::table('settings')
                    ->where('id', $setting['id'])
                    ->update([
                        'value' => $setting['value'],
                    ]);
            }
        }

        return ['success' => true];
    }

    public function getSettingByIdt()
    {
        $idt = request()->idt;

        $setting = DB::table('settings')->where('idt', $idt)->first();

        return $setting != null ? $setting->value : '';
    }
}