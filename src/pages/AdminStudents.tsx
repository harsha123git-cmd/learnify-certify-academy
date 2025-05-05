
import { useState } from "react";
import { 
  allStudents, 
  getEnrolledCourses, 
  Student, 
  recordAttendance
} from "@/lib/data";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AttendanceTable from "@/components/AttendanceTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const AdminStudents = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>(allStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    
    if (student.enrolledCourses.length > 0) {
      setSelectedCourseId(student.enrolledCourses[0]);
    } else {
      setSelectedCourseId("");
    }
    
    setDialogOpen(true);
  };

  const handleMarkAttendance = (date: string, status: 'present' | 'absent' | 'late') => {
    if (selectedStudent && selectedCourseId) {
      recordAttendance(selectedStudent.id, selectedCourseId, date, status);
      
      // Update the local students state to reflect the change
      const updatedStudents = students.map(student => {
        if (student.id === selectedStudent.id) {
          // Create a new attendance record if it doesn't exist
          if (!student.attendance[selectedCourseId]) {
            student.attendance[selectedCourseId] = [];
          }
          
          // Update or add the attendance record
          const recordIndex = student.attendance[selectedCourseId].findIndex(
            record => record.date === date
          );
          
          if (recordIndex >= 0) {
            student.attendance[selectedCourseId][recordIndex].status = status;
          } else {
            student.attendance[selectedCourseId].push({ date, status });
          }
        }
        return student;
      });
      
      setStudents(updatedStudents);
      setRefreshTrigger(prev => prev + 1);
      
      toast({
        title: "Attendance updated",
        description: `Marked ${selectedStudent.name} as ${status} for ${date}`,
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Students Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold">{students.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Active Enrollments</p>
              <p className="text-2xl font-bold">
                {students.reduce((total, student) => total + student.enrolledCourses.length, 0)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Certificates Issued</p>
              <p className="text-2xl font-bold">
                {students.reduce((total, student) => total + student.certificates.length, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Input
          placeholder="Search students by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Enrolled Courses</TableHead>
                  <TableHead>Certificates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.enrolledCourses.length}</TableCell>
                      <TableCell>{student.certificates.length}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewStudent(student)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedStudent.name}</h2>
                  <p className="text-gray-500">{selectedStudent.email}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    Enrolled in {selectedStudent.enrolledCourses.length} courses
                  </span>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {selectedStudent.certificates.length} certificates earned
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-4">Attendance Management</h3>
                
                {selectedStudent.enrolledCourses.length > 0 ? (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
                      <div className="w-full sm:w-72">
                        <p className="text-sm text-gray-500 mb-1">Select Course</p>
                        <Select 
                          value={selectedCourseId} 
                          onValueChange={setSelectedCourseId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedStudent.enrolledCourses.map((courseId) => {
                              const course = getEnrolledCourses(selectedStudent.id)
                                .find(c => c.id === courseId);
                              return course ? (
                                <SelectItem key={courseId} value={courseId}>
                                  {course.title}
                                </SelectItem>
                              ) : null;
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const today = new Date().toISOString().split('T')[0];
                            handleMarkAttendance(today, 'present');
                          }}
                        >
                          Mark Present Today
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const today = new Date().toISOString().split('T')[0];
                            handleMarkAttendance(today, 'absent');
                          }}
                        >
                          Mark Absent Today
                        </Button>
                      </div>
                    </div>
                    
                    {selectedCourseId && (
                      <AttendanceTable 
                        records={selectedStudent.attendance[selectedCourseId] || []}
                        courseId={selectedCourseId}
                        editable={true}
                        onMarkAttendance={(date, status) => handleMarkAttendance(date, status)}
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">
                      This student is not enrolled in any courses
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStudents;
