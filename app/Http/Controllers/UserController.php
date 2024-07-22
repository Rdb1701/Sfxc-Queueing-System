<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = DB::table('users')
            ->leftJoin('user_types as us', 'users.user_type_id', '=', 'us.id')
            ->leftJoin('window_lists as win', 'users.window_id', '=', 'win.id')
            ->select(
                'users.*',
                'us.name as user_type_name',
                'win.window_name as win_name'
            )
            ->paginate(10);



        return inertia("User/User", [
            "users" => UserResource::collection($users),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user_types = DB::table('user_types')->select('id', 'name')->get();
        $window = DB::table('window_lists')->select('*')->get();

        return inertia("User/Create", [
            "user_types" => $user_types,
            "window_list" => $window
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        User::create($data);

        return to_route('users.index')
            ->with('success', 'Successfully Created a User');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user_types = DB::table('user_types')->select('id', 'name')->get();
        $window = DB::table('window_lists')->select('*')->get();
        return inertia('User/Edit', [
            'user_edit' => new UserCrudResource($user),
            "user_types" => $user_types,
            "window_list" => $window
        ]);
    }

    public function changepassView(User $user)
    {
        return inertia("User/Changepassword", [
            'user_changepass' => new UserCrudResource($user),
        ]);
    }

    public function changepassword(ChangePasswordRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        $user->update($data);

        return to_route('users.index')
            ->with('success', "Successfully Change Password");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $user->update($data);
        return to_route('users.index')
            ->with('success', "User successfully updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return to_route('users.index')->with('success', 'User Deleted!');
    }
}
