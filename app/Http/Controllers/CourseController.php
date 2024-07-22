<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Course::query();
        $courses = $query->paginate(10);

        return inertia("Course/Index", [
            "courses" => CourseResource::collection($courses),
            'success' => session('success'),
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Course/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request->validated();
        Course::create($data);

        return to_route('course.index')
            ->with('success', 'Successfully Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        return inertia('Course/EditCourse', [
            'course' => new CourseResource($course),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $data = $request->validated();
        $course->update($data);

        return to_route('course.index')->with('success', 'Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return to_route('course.index')->with('success', 'Course Deleted!');
    }
}
