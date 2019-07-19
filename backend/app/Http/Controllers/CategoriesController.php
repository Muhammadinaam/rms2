<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Option;
use App\OptionItem;
use DB;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = new Category;

        $relations = [];
        if(request()->has('withitems') && request()->withitems == 1)
        {
            $relations[] = 'items';
        }

        if(request()->has('withoptions') && request()->withoptions == 1)
        {
            $relations[] = 'options.options_items';
        }

        if(count($relations) > 0)
        {
            $categories = $categories->with($relations);
        }

        if(request()->has('limit'))
        {
            $categories = $categories->limit(request()->limit);
        }

        if(request()->has('offset'))
        {
            $categories = $categories->offset(request()->offset);
        }

        if( (request()->has('all') && request()->all == 1) ||
        request()->has('limit') ||
        request()->has('offset') )
        {
            return $categories->get();
        }

        $categories = $categories
            ->where('name', 'like', '%'.request()->search.'%')
            ->orWhere('information', 'like', '%'.request()->search.'%')
            ->paginate(10);
        return $categories;
    }

    public function store()
    {
        $this->validate(request(), [
            'name' => 'required|unique:categories,name',
        ]);

        try {
            
            DB::beginTransaction();

            $category = new Category();

            $this->saveRequestDataToCategory($category);
            
            DB::commit();
            return ['success' => true, 'id' => $category->id];
            
        } catch (\Throwable $ex) {
            DB::rollBack();
            //throw $ex;
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    private function validateOptions()
    {
        for($i = 0; $i < count(request()->options); $i++)
        {
            $option = request()->options[$i];
            if($option['name'] == '')
            {
                return 'Name for Option No. ' . ($i + 1) . ' is empty';
            }

            if( !isset($option['options_items']) || count($option['options_items']) == 0)
            {
                return 'Option No. ' . ($i + 1) . ' has no option items';
            }

            for($j = 0; $j < count($option['options_items']); $j++)
            {
                $option_item = $option['options_items'][$j];
                if($option_item['name'] == '')
                {
                    return 'Name for Option Item No. ' . ($j + 1) . ' for Option No. ' . ($i + 1) . ' is empty';
                }
            }
        }

        return '';
    }

    public function update($id)
    {
        $this->validate(request(), [
            'name' => 'required|unique:categories,name,' . $id,
        ]);

        try {
            
            DB::beginTransaction();

            $category = Category::find($id);

            $this->saveRequestDataToCategory($category);
            
            DB::commit();
            return ['success' => true, 'id' => $category->id];
            
        } catch (\Throwable $ex) {
            DB::rollBack();
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    private function saveRequestDataToCategory($category)
    {
        $optionsValidationError = $this->validateOptions();
        if($optionsValidationError != '')
        {
            throw new \Exception($optionsValidationError);
        }

        $category->name = request()->name;
        $category->image = request()->image;
        $category->information = request()->information;
        $category->is_activated = request()->is_activated;

        $category->save();

        $this->saveOptions($category);
    }

    private function saveOptions($category)
    {
        foreach($category->options as $option)
        {
            $option->options_items()->delete();
        }
        $category->options()->delete();


        for($i = 0; $i < count(request()->options); $i++)
        {
            $optionData = request()->options[$i];

            $option = new Option();
            $option->category_id = $category->id;
            $option->name = $optionData['name'];
            $option->type = $optionData['type'];
            $option->save();

            for($j = 0; $j < count($optionData['options_items']); $j++)
            {
                $option_item_data = $optionData['options_items'][$j];
                
                $option_item = new OptionItem();
                $option_item->option_id = $option->id;
                $option_item->name = $option_item_data['name'];
                $option_item->price = $option_item_data['price'];
                $option_item->save();
            }
        }
    }

    public function edit($id)
    {
        $category = Category::with('options.options_items')->find($id);
        return $category;
    }

    public function getCategoryWithItems()
    {
        $category = Category::with(['items', 'options.options_items']);

        if(request()->has('name'))
        {   
            $category = $category->where('name', request()->name)
                ->first();

            return $category;
        }

        if(request()->has('id'))
        {
            $category = $category->where('id', request()->id)
                ->first();

            return $category;
        }
    }
}
