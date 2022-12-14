<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CreditCard;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index(Request $request) {
        $categories = Category::all();
        return response()->json($categories);
    }

    protected function storeOrUpdate($request, $mode, $categoryId = null) : Model {
        $name = $request->name;
        $parentId = $request->parentId;

        if($mode === 'create') {
            $category = new Category();
        } else if($mode === 'update') {
            $category = Category::findOrFail($categoryId);
        }

        $category->name = $name;
        $category->parent_id = $parentId;
        $category->save();

        if($request->hasFile('preview')) {
            $ext = $request->file('preview')->extension();
            $location = "/categories/$category->id/";
            $request->file('preview')->storeAs($location, "preview.$ext");
            $category->preview = $location."preview.$ext";
            $category->save();
        }

        return $category;
    }

    public function store(Request $request) {
        $card = $this->storeOrUpdate($request, "create");
        return response()->json($card);
    }

    public function update(Request $request, $categoryId) {
        $card = $this->storeOrUpdate($request, "update", $categoryId);
        return response()->json($card);
    }

    public function delete(Request $request, $categoryId) {
//        $adminUser = Auth::user();
        $category = CreditCard::findOrFail($categoryId);
        $ids = $this->getNestedCategories($category->id);
        Category::whereIn('id', $ids)->delete();
        return response()->json("OK");
    }

    protected function getNestedCategories($parentId) {
        $parent = Category::findOrFail($parentId);
        $subCategories = Category::where('parent_id', $parentId)->get();

        $ids[] = $parent->id;
        foreach ($subCategories as $category) {
            $ids = [...$ids, ...$this->getNestedCategories($category->id) ];
        }

        return $ids;
    }
}
