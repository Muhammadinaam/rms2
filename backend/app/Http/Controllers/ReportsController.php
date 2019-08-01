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

        $receipts_summary = $this->receiptsSummary(request()->from, request()->to);

        return compact('sales_by_orders_data', 'receipts_summary');
    }

    public function receiptsSummary($from, $to)
    {
        $receipts_summary = DB::table('receipts')
                                ->select('receipttypes.name', 'receipts.customer', DB::raw('sum(receipts.actual_amount) as amount'))
                                ->join('orders', 'orders.id', '=', 'receipts.order_id')
                                ->join('receipttypes', 'receipttypes.id', '=', 'receipts.receipttype_id')
                                ->whereBetween('orders.created_at', [$from, $to])
                                ->groupBy('receipttypes.name', 'receipts.customer')
                                ->get();
        return $receipts_summary;
    }
}
