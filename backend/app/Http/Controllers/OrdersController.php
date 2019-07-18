<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderStatus;
use App\Table;
use DB;
use Auth;
use Illuminate\Support\Str;

class OrdersController extends Controller
{
    private $printJobTypes = [
        'new' => 'new',
        'edit' => 'edit',
        'cancel' => 'cancel',
        'reprint' => 'reprint',
        'print-for-customer' => 'print-for-customer',
    ];

    public function index()
    {
        return Order::all();
    }

    public function store()
    {
        $order_data = request()->order;

        $order = new Order;

        try {
            
            DB::beginTransaction();

            $this->saveOrder($order, $order_data, false, null, null);

            DB::commit();

            return [
                'success' => true,
                'tracking_number' => $order->tracking_number,
                'order_number' => $order->order_number
            ];

        } catch (\Exception $ex) {
        
            return ['success' => false, 'message' => $ex->getMessage()];

        }
    }

    public function update()
    {
        $order_data = request()->order;
        $new_items = request()->new_items;
        $removed_items = request()->removed_items;

        $order = Order::find($order_data['id']);

        try {
            
            DB::beginTransaction();

            $this->saveOrder($order, $order_data, true, $new_items, $removed_items);

            DB::commit();

            return [
                'success' => true,
                'tracking_number' => $order->tracking_number,
                'order_number' => $order->order_number
            ];

        } catch (\Exception $ex) {
        
            return ['success' => false, 'message' => $ex->getMessage()];

        }
    }

    public function edit($id)
    {
        //\DB::enableQueryLog();
        //return \App\OrderItem::with('options.options_items')->get();
        //return \DB::getQueryLog();

        //\DB::enableQueryLog();
        $order = Order::with(['items.options.options_items', 'tables'])->where('orders.id', $id)->first();
        //return \DB::getQueryLog();

        return $order;
    }

    private function generateOrderNumber($order_type)
    {
        if($order_type == null || $order_type == '')
        {
            throw new \Exception('Error in generateOrderNumber Function: order_type is null or empty');
        }

        $order_type = $order_type == '' ? null : $order_type;

        $period = date('Ym');

        $last_sequence = DB::table('order_number_sequences')
            ->where('period', $period)
            ->where('order_type', $order_type)
            ->first();

        if($last_sequence == null)
        {
            DB::table('order_number_sequences')
                ->insert(
                    [
                        'period' => $period,
                        'order_type' => $order_type == '' ? null : $order_type,
                        'number' => 1,
                    ]);

            return $period . '-' . 1 . '-' . $order_type;
        }

        $last_number = $last_sequence->number;
        $new_number = $last_number + 1;

        //throw new \Exception($last_number);

        DB::table('order_number_sequences')
            ->where('period', $period)
            ->where('order_type', $order_type)
            ->update([
                'number' => $new_number,
            ]);

        return $period . '-' . $new_number . '-' . $order_type;
    }

    public function saveOrder($order, $order_data, $is_editing, $new_items, $removed_items)
    {
        $order_type_id = DB::table('order_types')->where('idt', $order_data['order_type_idt'])->first()->id;

        $order->order_type_id = $order_type_id;
        $order->order_number = $order->order_number != null ? $order->order_number : $this->generateOrderNumber($order_data['order_type_idt']);
        $order->guests = isset($order_data['guests']) ? $order_data['guests'] : 0;
        $order->customer_name = $order_data['customer_name'];
        $order->customer_address = $order_data['customer_address'];
        $order->customer_lat = $order_data['customer_lat'];
        $order->customer_long = $order_data['customer_long'];
        $order->customer_zipcode = $order_data['customer_zipcode'];
        $order->customer_phone = $order_data['customer_phone'];
        $order->order_amount_before_discount = $order_data['order_amount_before_discount'] != null ? $order_data['order_amount_before_discount'] : 0;
        $order->discount_percent = $order_data['discount_percent'] != null ? $order_data['discount_percent'] : 0;
        $order->discount_remarks = $order_data['discount_remarks'];
        $order->discount_amount = $order_data['discount_amount'] != null ? $order_data['discount_amount'] : 0;
        $order->sales_tax_percent = $order_data['sales_tax_percent'] != null ? $order_data['sales_tax_percent'] : 0;
        $order->sales_tax_amount = $order_data['sales_tax_amount'] != null ? $order_data['sales_tax_amount'] : 0;
        $order->delivery_charges = $order_data['delivery_charges'] != null ? $order_data['delivery_charges'] : 0;
        
        $order->receivable_amount = 
            $order->order_amount_before_discount - 
            $order->discount_amount + 
            $order->sales_tax_amount +
            $order->delivery_charges;

        if(Auth::check())
        {
            $order->order_booked_by = Auth::user()->id;
        }

        $order_status_idt = isset($order_data['order_status_idt']) ? $order_data['order_status_idt'] : '';
        $isSavingNewOrder = false;
        if($order->id == null)  // new order
        {
            $isSavingNewOrder = true;
            $order_status_idt = 'preparing';
            if( $order_data['order_type_idt'] == 'od')
            {
                $order_status_idt = 'phone-confirmation-pending';
            }

            $order->order_status_id = DB::table('order_statuses')
                ->where('idt', $order_status_idt)
                ->first()->id;
        }

        $order->tracking_number = $order->order_number;
        $order->save();


        ///////////////////////////////////////
        // order tables
        $this->freeOrdersTables($order->id);
        
        if(isset($order_data['tables']))
        {
            foreach($order_data['tables'] as $table)
            {
                Table::where('id', $table['id'])
                ->update(
                    [
                        'order_id' => $order->id,
                    ]
                );
            }
        }


        ///////////////////////////////////////
        // order items
        DB::table('order_items')
            ->where('order_id', $order->id)
            ->delete();
        $this->saveOrderItems($order->id, null, $order_data['items'], null);


        //////////////////////////////////////
        // order edit
        if($is_editing == true)
        {
            $order_edit = new \App\OrderEdit;
            $order_edit->created_by = \Auth::user()->id;
            $order_edit->save();

            $this->saveOrderItems(null, $order_edit->id, $new_items, 'new_item');
            $this->saveOrderItems(null, $order_edit->id, $removed_items, 'removed_item');
        }

        // Print job
        if($order_status_idt != 'phone-confirmation-pending')
        {
            if($isSavingNewOrder)
            {
                $this->insertPrintJob(
                    $this->printJobTypes['new'], $order->id, null );
            }
            else
            {
                $this->insertPrintJob(
                    $this->printJobTypes['edit'], $order->id, $order_edit->id );
            }
        }

    }

    private function saveOrderItems($order_id, $order_edit_id, $items, $edit_type)
    {
        foreach($items as $item)
        {
            $order_item_id = (string) Str::uuid();
            DB::table('order_items')
                ->insert([
                    'id' => $order_item_id,
                    'order_id' => $order_id,
                    'order_edit_id' => $order_edit_id,
                    'edit_type' => $edit_type,
                    'item_id' => $item['id'],
                    'name' => $item['name'],
                    'price' => $item['price'],
                    'instructions' => $item['instructions'],
                    'item_price_with_options' => $item['item_price_with_options'],
                    'quantity' => $item['quantity'],
                    'printer' => $item['printer'],
                    'is_taxable' => $item['is_taxable'],
                    'item_total_price' => $item['item_price_with_options'] * $item['quantity'],
                ]);

            foreach($item['options'] as $option)
            {
                $order_item_option_id = (string) Str::uuid();
                DB::table('order_items_options')
                    ->insert([
                        'id' => $order_item_option_id,
                        'order_item_id' => $order_item_id,
                        'option_id' => $option['id'],
                        'name' => $option['name'],
                    ]);

                foreach($option['options_items'] as $option_item)
                {
                    DB::table('order_items_options_items')
                        ->insert([
                            'id' => (string) Str::uuid(),
                            'order_item_option_id' => $order_item_option_id,
                            'option_item_id' => $option_item['id'],
                            'name' => $option_item['name'],
                            'price' => $option_item['price'],
                        ]);
                }
            }
        }
    }

    private function freeOrdersTables($order_id)
    {
        //throw new \Exception($order_id);
        Table::where('order_id', $order_id)
            ->update(
                [
                    'order_id' => null,
                ]
            );
            
    }

    public function getOrderStatus()
    {
        $tracking_number = request()->tracking_number;

        $order_status = DB::table('orders')
            ->select('order_statuses.idt', 'order_statuses.name')
            ->join('order_statuses', 'orders.order_status_id', '=', 'order_statuses.id')
            ->where('orders.tracking_number', $tracking_number)
            ->first();

        return compact('order_status');
    }

    public function openOrders()
    {
        $open_orders = DB::table('orders')
        ->select('orders.*', 
            'order_statuses.name as order_status_name', 
            'order_statuses.idt as order_status_idt',
            'order_types.name as order_type_name')
        ->join('order_statuses', 'orders.order_status_id', '=', 'order_statuses.id')
        ->join('order_types', 'orders.order_type_id', '=', 'order_types.id')
        ->whereNotIn('order_statuses.idt', ['cancelled', 'closed'])
        ->get();

        return $open_orders;
    }

    public function assignableStatuses()
    {
        $statuses = DB::table('order_statuses')->where('is_assignable', 1)->get();
        return $statuses;
    }

    public function changeOrderStatus()
    {
        return $this->changeOrderStatusMethod(request()->order_id, request()->status_idt, request()->cancellation_remarks);
    }

    private function changeOrderStatusMethod($order_id, $status_idt, $cancellation_remarks = null)
    {
        try
        {
            $status = OrderStatus::where('idt', $status_idt)
                ->first();

            if($status == null)
                throw new \Exception('Order Status: ' . $status_idt . ' is not valid.');

            $order = Order::with('order_status')->where('id', $order_id)->first();

            if($order == null)
                throw new \Exception('Order not found.');

            try
            {
                DB::beginTransaction();

                $old_status = $order->order_status;

                $order->order_status_id = $status->id;
                $order->cancellation_remarks = $cancellation_remarks;
                $order->save();

                if($old_status->idt == 'phone-confirmation-pending' && 
                    ($status->idt != 'closed' || $status->idt != 'cancelled' || $status->idt != 'printed-for-customer' )
                )
                {
                    $this->insertPrintJob(
                        $this->printJobTypes['new'], $order->id, null );
                }
                else if($status->idt == 'cancelled')
                {
                    $this->insertPrintJob(
                        $this->printJobTypes['cancel'], $order->id, null );

                    $this->freeOrdersTables($order->id);
                }
                else if($status->idt == 'printed-for-customer')
                {
                    $this->insertPrintJob(
                        $this->printJobTypes['print-for-customer'], $order->id, null );
                }

                DB::commit();
            }
            catch(\Exception $ex)
            {
                DB::rollback();
                throw $ex;
            }

            return ['success' => true, 'message' => 'Command Executed Successfully'];
        }
        catch(\Exception $ex)
        {
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    private function insertPrintJob($print_type, $order_id, $order_edit_id)
    {
        DB::table('orders_print_jobs')
            ->insert([
                'print_type' => $print_type,
                'order_id' => $order_id,
                'order_edit_id' => $order_edit_id,
            ]);
    }

    public function sendPrintCommand()
    {
        $this->insertPrintJob(
            request()->print_type,
            request()->order_id,
            request()->order_edit_id
        );

        return ['success' => true, 'message' => 'Command Executed Successfully'];
    }

    public function closeOrder()
    {

        try
        {
            $status = OrderStatus::where('idt', 'closed')
            ->first();

            $order = Order::where('id', request()->order_id)
            ->update([
                'order_status_id' => $status->id,
            ]);

            Table::where('order_id', request()->order_id)
                ->update([
                    'order_id' => null
                ]);

            return ['success' => true, 'message' => 'Order Closed'];
        }
        catch(\Exception $ex)
        {
            return ['success' => false, 'message' => 'Error: ' . $ex->getMessage()];
        }
    }

    public function getPrintJobs()
    {
        return DB::table('orders_print_jobs')
            ->orderBy('id')
            ->limit(10)
            ->get();
    }

    public function deletePrintJob($print_job_id)
    {
        DB::table('orders_print_jobs')
            ->where('id', $print_job_id)
            ->delete();

        return ['success' => true, 'message' => 'Deleted Successfully'];
    }

    public function saveDiscount()
    {
        try
        {
            $order = Order::find(request()->order_id);

            $order->sales_tax_amount = $order->sales_tax_amount * 
                (100 / (100 - $order->discount_percent)) *
                ((100 - request()->discount_percent) / 100);

            $order->discount_percent = request()->discount_percent;
            $order->discount_amount = request()->discount_amount;
            $order->discount_remarks = request()->discount_remarks;

            $order->receivable_amount = $order->order_amount_before_discount
                - $order->discount_amount 
                + $order->sales_tax_amount 
                + $order->delivery_charges;

            $order->discount_given_by = \Auth::user()->id;

            $order->save();

            return ['message' => 'Saved Successfully'];
        }
        catch(\Exception $ex)
        {
            return ['message' => 'Error Occurred: ' . $ex->getMessage()];
        }
    }
}
