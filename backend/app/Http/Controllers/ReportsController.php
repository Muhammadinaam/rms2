<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OrderStatus;
use DB;

class ReportsController extends Controller
{
    private $OrderCloseStatusIdt;

    public function __construct(){
        $this->OrderCloseStatusIdt = OrderStatus::getIdByIdt('closed');
    }

    public function salesReport()
    {
        $sales_by_orders_data = \DB::table('orders')
            ->where('order_status_id', $this->OrderCloseStatusIdt)
            ->whereBetween('created_at', [request()->from, request()->to])
            ->get();

        $receipts_summary = $this->receiptsSummary(request()->from, request()->to);

        return compact('sales_by_orders_data', 'receipts_summary');
    }

    public function salesAndTaxReport()
    {
        $starting_number = \DB::table('orders')
            ->where('created_at', '<', request()->from)
            ->count();

        $sales_by_orders_data = \DB::table('orders')
            ->where('order_status_id', $this->OrderCloseStatusIdt)
            ->whereBetween('created_at', [request()->from, request()->to])
            ->get();

        $receipts_summary = $this->receiptsSummary(request()->from, request()->to);

        return compact($starting_number, 'sales_by_orders_data', 'receipts_summary');
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

    public function topSellingItemsReport() {

        $common_query = \DB::table('order_items')
        ->join('orders', 'orders.id', '=', 'order_items.order_id')
        ->join('items', 'items.id', '=', 'order_items.item_id')
        ->where('orders.order_status_id', $this->OrderCloseStatusIdt)
        ->whereBetween('orders.created_at', [request()->from, request()->to])
        ->groupBy('items.name');

        $top_selling_items_qty = $common_query
            ->select('items.name as item_name', DB::raw('sum(order_items.quantity) as quantity'))
            ->get();

        $top_selling_items_amount = $common_query
            ->select('items.name as item_name', DB::raw('sum(order_items.item_price_with_options) as amount'))
            ->get();

        return compact('top_selling_items_qty', 'top_selling_items_amount');
    }

    public function topAreaCodesReport()
    {
        $common_query = \DB::table('orders')
        ->where('orders.order_status_id', $this->OrderCloseStatusIdt)
        ->whereBetween('orders.created_at', [request()->from, request()->to])
        ->groupBy('orders.customer_zipcode');

        $top_areacodes = $common_query
            ->select('orders.customer_zipcode', DB::raw('count(orders.id) as count'))
            ->get();

        return compact('top_areacodes');
    }
}
