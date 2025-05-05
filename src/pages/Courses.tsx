
import { useState } from "react";
import { Input } from "@/components/ui/input";
import CourseCard from "@/components/CourseCard";
import { 
  currentStudent, 
  getEnrolledCourses, 
  getAvailableCourses,
  enrollInCourse
} from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Courses = () => {
  const [search, setSearch] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const enrolledCourses = getEnrolledCourses(currentStudent.id);
  const availableCourses = getAvailableCourses(currentStudent.id);

  const handleEnroll = (courseId: string) => {
    enrollInCourse(currentStudent.id, courseId);
    setRefreshTrigger(prev => prev + 1); // Force refresh
  };

  const filterCourses = (courses: any[]) => {
    if (!search) return courses;
    const searchLower = search.toLowerCase();
    return courses.filter(
      course => course.title.toLowerCase().includes(searchLower) || 
               course.description.toLowerCase().includes(searchLower) ||
               course.instructor.toLowerCase().includes(searchLower)
    );
  };

  const filteredEnrolled = filterCourses(enrolledCourses);
  const filteredAvailable = filterCourses(availableCourses);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search courses by title, description or instructor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="available">Available Courses</TabsTrigger>
          <TabsTrigger value="enrolled">My Enrolled Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          {filteredAvailable.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAvailable.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isEnrolled={false}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              {search ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900">No matching courses</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search to find more courses</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
                  <p className="mt-1 text-gray-500">You've enrolled in all available courses</p>
                </>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="enrolled">
          {filteredEnrolled.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEnrolled.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isEnrolled={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              {search ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900">No matching enrolled courses</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search criteria</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900">No enrolled courses</h3>
                  <p className="mt-1 text-gray-500">Enroll in courses from the Available Courses tab</p>
                </>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
