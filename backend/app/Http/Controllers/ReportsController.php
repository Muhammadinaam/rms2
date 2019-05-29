<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ReportsController extends Controller
{
    public function salesReport()
    {
        return \DB::table('orders')
            ->select('order_number', 'receivable_amount')
            ->where('order_status_id', 7)
            ->get();

        
    }
}
