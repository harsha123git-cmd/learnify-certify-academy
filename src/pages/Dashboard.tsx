
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Award, BookOpen } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { currentStudent, getEnrolledCourses } from "@/lib/data";

const Dashboard = () => {
  const enrolledCourses = getEnrolledCourses(currentStudent.id);
  const totalCertificates = currentStudent.certificates.length;

  // Calculate total attendance
  let totalAttendancePct = 0;
  let attendanceCount = 0;
  
  Object.values(currentStudent.attendance).forEach(records => {
    if (records.length > 0) {
      const presentCount = records.filter(r => r.status === 'present').length;
      const lateCount = records.filter(r => r.status === 'late').length;
      totalAttendancePct += ((presentCount + (lateCount * 0.5)) / records.length) * 100;
      attendanceCount++;
    }
  });

  const averageAttendance = attendanceCount > 0 
    ? Math.round(totalAttendancePct / attendanceCount) 
    : 0;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/courses">
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse All Courses
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-lms-primary/10">
                <Calendar className="h-6 w-6 text-lms-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">My Courses</p>
                <p className="text-3xl font-bold text-gray-900">{enrolledCourses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-lms-secondary/10">
                <Users className="h-6 w-6 text-lms-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                <p className="text-3xl font-bold text-gray-900">{averageAttendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-lms-accent/10">
                <Award className="h-6 w-6 text-lms-accent" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Certificates</p>
                <p className="text-3xl font-bold text-gray-900">{totalCertificates}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">My Courses</h2>
      
      {enrolledCourses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              isEnrolled={true} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
          <p className="mt-1 text-gray-500">Enroll in courses to start your learning journey</p>
          <div className="mt-6">
            <Link to="/courses">
              <Button className="bg-lms-primary hover:bg-lms-primary/90">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      )}

      {currentStudent.certificates.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">Recent Certificates</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {currentStudent.certificates.slice(0, 2).map((certificate) => (
              <Card key={certificate.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-lms-accent/10">
                      <Award className="h-6 w-6 text-lms-accent" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">{certificate.courseName}</h3>
                      <p className="text-sm text-gray-500">Issued on {certificate.issueDate}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to="/certificates">
                      <Button variant="outline" className="w-full">View Certificate</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
