
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CertificateCard from "@/components/CertificateCard";
import { currentStudent, Certificate, courses, generateCertificate } from "@/lib/data";
import { Award, Download, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Certificates = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState(currentStudent.certificates);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewCertificate = (certId: string) => {
    const cert = certificates.find(c => c.id === certId);
    if (cert) {
      setSelectedCertificate(cert);
      setDialogOpen(true);
    }
  };

  const handleDownload = () => {
    toast({
      title: "Certificate downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
    setDialogOpen(false);
  };

  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "Certificate share link copied to clipboard.",
    });
  };

  // Generate a test certificate for demonstration purposes
  const generateDemoCertificate = () => {
    if (!currentStudent.enrolledCourses.length) {
      toast({
        title: "No enrolled courses",
        description: "You need to be enrolled in a course to generate a certificate.",
        variant: "destructive",
      });
      return;
    }

    // Get a course that doesn't already have a certificate
    const enrolledCourseIds = currentStudent.enrolledCourses;
    const existingCertCourseIds = certificates.map(c => c.courseId);
    const availableCourseIds = enrolledCourseIds.filter(
      id => !existingCertCourseIds.includes(id)
    );

    if (availableCourseIds.length === 0) {
      toast({
        title: "All certificates generated",
        description: "You already have certificates for all your enrolled courses.",
        variant: "destructive",
      });
      return;
    }

    const courseId = availableCourseIds[0];
    const cert = generateCertificate(
      currentStudent.id, 
      courseId, 
      ["Course completion", "Excellent performance"]
    );

    if (cert) {
      setCertificates([...certificates, cert]);
      toast({
        title: "Certificate generated",
        description: "Your new certificate has been generated successfully.",
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
        <Button 
          variant="outline" 
          onClick={generateDemoCertificate} 
          className="bg-white hover:bg-gray-50"
        >
          <Award className="h-4 w-4 mr-2" />
          Generate Demo Certificate
        </Button>
      </div>

      {certificates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((certificate) => (
            <CertificateCard 
              key={certificate.id} 
              certificate={certificate}
              onView={handleViewCertificate}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">No certificates yet</h3>
          <p className="mt-1 text-gray-500">
            Complete courses to earn certificates for your achievements
          </p>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Certificate of Achievement</DialogTitle>
          </DialogHeader>
          
          {selectedCertificate && (
            <div className="certificate-card p-10 rounded-lg border-4 border-lms-primary/20">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <Award className="h-16 w-16 text-lms-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Certificate of Achievement</h2>
                  <p className="text-lg text-gray-600 mt-2">This certifies that</p>
                  <p className="text-2xl font-semibold text-lms-primary mt-2">
                    {selectedCertificate.studentName}
                  </p>
                  <p className="text-lg text-gray-600 mt-6">has successfully completed</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-2">
                    {selectedCertificate.courseName}
                  </p>
                  <p className="text-base text-gray-500 mt-8">Issued on {selectedCertificate.issueDate}</p>
                  
                  {selectedCertificate.achievements.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-medium uppercase text-gray-500">Achievements</p>
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {selectedCertificate.achievements.map((achievement, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lms-primary/10 text-lms-primary"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Certificate ID: {selectedCertificate.id}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Verify this certificate at learnifyedu.example.com/verify
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button 
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificates;
