<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_image' => $user->profile_image ? asset('storage/' . $user->profile_image) : null,
            ],
            'token' => $token,
            'expires_at' => now()->addDays(30)
        ]);
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->tokens()->where('id', $user->currentAccessToken()?->id)->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function profile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'profile_image' => $user->profile_image ? asset('storage/' . $user->profile_image) : null,
        ]);
    }

    public function updateProfile(Request $request)
    {
        try {
            // Log request data for debugging
            Log::info('Update Profile Request', [
                'has_file' => $request->hasFile('profile_image'),
                'has_profile_image' => $request->has('profile_image'),
                'all_data' => $request->all(),
                'files' => $request->allFiles(),
            ]);

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'profile_image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            /** @var \App\Models\User $user */
            $user = $request->user();

            if ($request->has('name')) {
                $user->name = $request->name;
            }

            if ($request->hasFile('profile_image')) {
                Log::info('Profile image file detected', [
                    'file_name' => $request->file('profile_image')->getClientOriginalName(),
                    'file_size' => $request->file('profile_image')->getSize(),
                    'mime_type' => $request->file('profile_image')->getMimeType(),
                ]);

                // Delete old profile image if exists
                if ($user->profile_image && file_exists(storage_path('app/public/' . $user->profile_image))) {
                    unlink(storage_path('app/public/' . $user->profile_image));
                }

                // Store new profile image
                $path = $request->file('profile_image')->store('profile_images', 'public');
                Log::info('Profile image stored', ['path' => $path]);
                
                $user->profile_image = $path;
            } else {
                Log::warning('No profile image file in request');
            }

            $user->save();

            Log::info('User profile saved', [
                'user_id' => $user->id,
                'profile_image' => $user->profile_image,
            ]);

            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'profile_image' => $user->profile_image ? asset('storage/' . $user->profile_image) : null,
                ]
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error in updateProfile', [
                'errors' => $e->errors(),
            ]);
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error in updateProfile', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Error updating profile: ' . $e->getMessage()
            ], 500);
        }
    }

    public function refresh(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $currentTokenId = $user->currentAccessToken()?->id;
        if ($currentTokenId) {
            $user->tokens()->where('id', $currentTokenId)->delete();
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_image' => $user->profile_image ? asset('storage/' . $user->profile_image) : null,
            ],
            'token' => $token,
            'expires_at' => now()->addDays(30)
        ]);
    }
}