
import { Link } from "react-router-dom";
import { Course } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnroll?: (courseId: string) => void;
}

const CourseCard = ({ course, isEnrolled = false, onEnroll }: CourseCardProps) => {
  const { toast } = useToast();

  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(course.id);
      toast({
        title: "Enrolled Successfully",
        description: `You have successfully enrolled in ${course.title}.`,
      });
    }
  };

  return (
    <div className="course-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <img
        src={`https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=800&q=80`}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          <span>Instructor: {course.instructor}</span>
          <span>Duration: {course.duration}</span>
        </div>
        
        {isEnrolled && course.progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-medium">Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          {isEnrolled ? (
            <Link to={`/courses/${course.id}`} className="w-full">
              <Button variant="default" className="w-full bg-lms-primary hover:bg-lms-primary/90">
                Continue Learning
              </Button>
            </Link>
          ) : (
            <Button 
              variant="default" 
              className="w-full bg-lms-primary hover:bg-lms-primary/90"
              onClick={handleEnroll}
            >
              Enroll Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
