<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
public function index(Request $request)
{
    $query = Post::query();

    if ($request->has('search')) {
        $query->where('title', 'like', '%' . $request->search . '%');
    }

    $posts = $query->get();

    return response()->json([
        'data' => $posts
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post = Post::create($request->all());

        return response()->json([
            'message' => 'Post created',
            'data' => $post
        ]);
    }

    public function show($id)
    {
        return response()->json(Post::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $post->update($request->all());

        return response()->json([
            'message' => 'Post updated',
            'data' => $post
        ]);
    }

    public function destroy($id)
    {
        Post::destroy($id);

        return response()->json([
            'message' => 'Post deleted'
        ]);
    }
}
