import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "general",
    message: ""
  });
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    
    try {
      await apiRequest("POST", "/api/workshop-registration", formData);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us about ALGORIDIGM. We'll be in touch soon!",
        variant: "default",
      });
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Message Failed to Send",
        description: "There was a problem submitting your contact information. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    } finally {
      setIsPending(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-corp-bg rounded-lg border border-corp-cyan/40 text-center"
      >
        <h3 className="text-2xl font-display font-semibold text-corp-cyan mb-4">Thank You!</h3>
        <p className="mb-4">Your message has been submitted successfully.</p>
        <p>We'll contact you soon with more information about ALGORIDIGM.</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-corp-bg rounded-lg border border-corp-magenta/40"
    >
      <h3 className="text-xl font-display font-semibold mb-4 text-corp-magenta">Contact Us</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="interest" className="block text-sm font-medium mb-1">Interest Area</label>
            <select
              id="interest"
              name="interest"
              className="w-full p-2 bg-corp-bg border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white"
              value={formData.interest}
              onChange={handleInputChange}
              required
            >
              <option value="general">General Information</option>
              <option value="acting">Acting Opportunities</option>
              <option value="design">Design Opportunities</option>
              <option value="tech">Technical Opportunities</option>
              <option value="donation">Support/Donations</option>
              <option value="collaboration">Artistic Collaboration</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            className="w-full p-2 bg-transparent border border-corp-magenta/40 focus:border-corp-magenta rounded-md text-white min-h-[120px]"
            placeholder="Please share your message, questions, or how you'd like to get involved with ALGORIDIGM"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            type="submit" 
            disabled={isPending}
            className="bg-corp-cyan hover:bg-corp-cyan/80 text-black font-semibold py-2 px-6"
          >
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}