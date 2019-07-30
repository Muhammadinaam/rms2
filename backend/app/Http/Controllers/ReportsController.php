<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OrderStatus;
use DB;

class ReportsController extends Controller
{
    private $OrderCloseStatucIdt;

    public function __construct(){
        $this->OrderCloseStatucIdt = OrderStatus::getIdByIdt('closed');
    }

    public function salesReport()
    {
        $sales_by_orders_data = \DB::table('orders')
            ->where('order_status_id', $this->OrderCloseStatucIdt)
            ->whereBetween('created_at', [request()->from, request()->to])
            ->get();

        $receipts_summary = $this->receiptsSummary();

        return compact('sales_by_orders_data', 'receipts_summary');
    }

    public function receiptsSummary()
    {
        return [];
    }
}
