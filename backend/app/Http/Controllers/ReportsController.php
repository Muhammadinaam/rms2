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
            ->select('order_number', 'receivable_amount')
            ->where('order_status_id', $this->OrderCloseStatucIdt)
            ->whereBetween('created_at', [request()->from, request()->to])
            ->get();

        $amounts_summary = $this->amountsSummary();

        return compact('sales_by_orders_data', 'amounts_summary');
    }

    public function amountsSummary()
    {
        return DB::table('orders')
            ->select(
                DB::raw('sum(sales_tax_amount) as sales_tax_amount'),
                DB::raw('sum(received_through_card) as received_through_card'),
                DB::raw('sum(receivable_amount - received_through_card) as received_through_cash'),
                DB::raw('sum(discount_amount) as discount_amount'),
            )->where('order_status_id', $this->OrderCloseStatucIdt)
            ->whereBetween('created_at', [request()->from, request()->to])
            ->get();
    }
}
