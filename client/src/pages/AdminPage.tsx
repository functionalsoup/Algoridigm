import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

type Registration = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  secondaryRole: string | null;
  experience: string | null;
  availability: string | null;
  message: string | null;
  createdAt: string;
};

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest("GET", "/api/workshop-registrations");
        const data = await response.json();
        
        if (data.success && data.data) {
          setRegistrations(data.data);
        } else {
          toast({
            title: "Error Loading Data",
            description: "Could not retrieve contact submissions.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching registrations:", error);
        toast({
          title: "Error Loading Data",
          description: "Could not retrieve contact submissions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRegistrations();
  }, [toast]);
  
  // Format date/time for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="min-h-screen bg-corp-bg px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-corp-magenta">Contact Submissions</h1>
          <Button 
            onClick={() => window.location.href = "/"}
            className="text-white bg-corp-cyan hover:bg-corp-cyan/90 px-4 py-2"
          >
            Return to Main Site
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse text-corp-cyan">Loading submissions...</div>
          </div>
        ) : registrations.length === 0 ? (
          <div className="bg-corp-bg border border-corp-magenta/30 rounded-lg p-6 text-center">
            <p className="text-lg">No submissions found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {registrations.map((reg) => (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-corp-bg border border-corp-magenta/30 rounded-lg p-6 hover:border-corp-magenta/60 transition-colors"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                  <h2 className="text-xl font-semibold text-corp-cyan">{reg.name}</h2>
                  <div className="text-sm text-corp-cyan/70 mt-1 sm:mt-0">
                    Submitted: {formatDate(reg.createdAt)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-corp-magenta/80">Email:</p>
                    <p className="text-white">{reg.email}</p>
                  </div>
                  
                  {reg.phone && (
                    <div>
                      <p className="text-sm font-medium text-corp-magenta/80">Phone:</p>
                      <p className="text-white">{reg.phone}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium text-corp-magenta/80">Interest Area:</p>
                    <p className="text-white capitalize">{reg.role.replace('-', ' ')}</p>
                  </div>
                  
                  {reg.secondaryRole && (
                    <div>
                      <p className="text-sm font-medium text-corp-magenta/80">Secondary Role:</p>
                      <p className="text-white">{reg.secondaryRole}</p>
                    </div>
                  )}
                  
                  {reg.experience && (
                    <div>
                      <p className="text-sm font-medium text-corp-magenta/80">Experience:</p>
                      <p className="text-white">{reg.experience}</p>
                    </div>
                  )}
                  
                  {reg.availability && (
                    <div>
                      <p className="text-sm font-medium text-corp-magenta/80">Availability:</p>
                      <p className="text-white">{reg.availability}</p>
                    </div>
                  )}
                </div>
                
                {reg.message && (
                  <div>
                    <p className="text-sm font-medium text-corp-magenta/80 mb-1">Message:</p>
                    <p className="text-white bg-corp-bg/30 p-3 rounded border border-corp-cyan/20">{reg.message}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}