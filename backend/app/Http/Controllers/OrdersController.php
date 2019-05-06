<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use DB;
use Auth;
use Illuminate\Support\Str;

class OrdersController extends Controller
{

    public function index()
    {
        return Order::all();
    }

    public function store()
    {
        $data = request()->all();

        $order = new Order;

        try {
            
            DB::beginTransaction();

            $this->saveOrder($order, $data);

            DB::commit();

            return [
                'success' => true,
                'tracking_number' => $order->tracking_number
            ];

        } catch (\Exception $ex) {
        
            throw $ex;
            return ['success' => false, 'message' => $ex->getMessage()];

        }
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

    public function saveOrder($order, $request_data)
    {
        $order_type_id = DB::table('order_types')->where('idt', $request_data['order_type_idt'])->first()->id;

        $order->order_type_id = $order_type_id;
        $order->order_number = $order->order_number != null ? $order->order_number : $this->generateOrderNumber($request_data['order_type_idt']);
        $order->customer_name = $request_data['customer_name'];
        $order->customer_address = $request_data['customer_address'];
        $order->customer_lat = $request_data['customer_lat'];
        $order->customer_long = $request_data['customer_long'];
        $order->customer_zipcode = $request_data['customer_zipcode'];
        $order->customer_phone = $request_data['customer_phone'];
        $order->order_amount_before_discount = $request_data['order_amount_before_discount'] != null ? $request_data['order_amount_before_discount'] : 0;
        $order->discount_percent = $request_data['discount_percent'] != null ? $request_data['discount_percent'] : 0;
        $order->discount_amount = $request_data['discount_amount'] != null ? $request_data['discount_amount'] : 0;
        $order->sales_tax_percent = $request_data['sales_tax_percent'] != null ? $request_data['sales_tax_percent'] : 0;
        $order->sales_tax_amount = $request_data['sales_tax_amount'] != null ? $request_data['sales_tax_amount'] : 0;
        $order->delivery_charges = $request_data['delivery_charges'] != null ? $request_data['delivery_charges'] : 0;
        
        $order->total_order_amount = 
            $order->order_amount_before_discount - 
            $order->discount_amount + 
            $order->sales_tax_amount +
            $order->delivery_charges;

        if(Auth::check())
        {
            $order->order_booked_by = Auth::user()->id;
        }

        if($order->id == null)  // new order
        {
            $order_status_idt = 'preparing';
            if( $request_data['order_type_idt'] == 'web-delivery')
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
        // order items

        DB::table('order_items')
            ->where('order_id', $order->id)
            ->delete();
        
        foreach($request_data['items'] as $item)
        {
            $order_item_id = (string) Str::uuid();
            DB::table('order_items')
                ->insert([
                    'id' => $order_item_id,
                    'order_id' => $order->id,
                    'item_id' => $item['id'],
                    'name' => $item['name'],
                    'price' => $item['price'],
                    'item_price_with_options' => $item['item_price_with_options'],
                    'quantity' => $item['quantity'],
                    'item_total_price' => $item['item_total_price'],
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
}
