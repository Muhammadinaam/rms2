<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;
use DB;

class ItemsController extends Controller
{
    public function index()
    {
        $items = Item::with(['category' => function($query){
            $query->where('name', 'like', '%'.request()->search.'%');
        }])
            ->where('name', 'like', '%'.request()->search.'%')
            ->orWhere('information', 'like', '%'.request()->search.'%')
            ->orWhere('printer', 'like', '%'.request()->search.'%')
            ->paginate(10);
        return $items;
    }

    public function store()
    {
        $this->validate(request(), [
            'name' => 'required',
            'price' => 'required',
        ]);

        try {
            
            DB::beginTransaction();

            $item = new Item();

            $this->saveRequestDataToItem($item);

            DB::commit();
            return ['success' => true, 'id' => $item->id];

        } catch (\Throwable $ex) {
            DB::rollBack();
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    public function edit($id)
    {
        return Item::find($id);
    }

    public function show($id) 
    {
        return Item::with('category.options.options_items')->find($id);
    }

    public function update($id)
    {
        $this->validate(request(), [
            'name' => 'required',
            'price' => 'required',
        ]);

        try {
            
            DB::beginTransaction();

            $item = Item::find($id);

            $this->saveRequestDataToItem($item);

            DB::commit();
            return ['success' => true, 'id' => $item->id];

        } catch (\Throwable $ex) {
            DB::rollBack();
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    private function saveRequestDataToItem($item)
    {
        $item->category_id = request()->category_id;
        $item->name = request()->name;
        $item->price = request()->price;
        $item->image = request()->image;
        $item->information = request()->information;
        $item->printer = request()->printer;
        $item->is_taxable = request()->is_taxable == null ? 0 : request()->is_taxable;
        $item->is_activated = request()->is_activated;

        $item->save();
    }
}
