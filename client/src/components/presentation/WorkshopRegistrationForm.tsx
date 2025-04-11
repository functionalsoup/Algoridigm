import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertWorkshopRegistrationSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Extend the insert schema with validation rules
const formSchema = insertWorkshopRegistrationSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  role: z.string().min(1, "Please select a primary role"),
  secondaryRole: z.string().optional(),
  experience: z.string().optional(),
  availability: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function WorkshopRegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      secondaryRole: "",
      experience: "",
      availability: "",
      message: "",
    },
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest("POST", "/api/workshop-registration", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Thank you for registering for our workshop. We'll be in touch soon!",
        variant: "default",
      });
      setIsSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: "There was a problem submitting your registration. Please try again.",
        variant: "destructive",
      });
      console.error("Registration error:", error);
    },
  });
  
  function onSubmit(data: FormValues) {
    mutate(data);
  }
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-corp-bg rounded-lg border border-corp-cyan/40 text-center"
      >
        <h3 className="text-2xl font-display font-semibold text-corp-cyan mb-4">Thank You!</h3>
        <p className="mb-4">Your registration has been submitted successfully.</p>
        <p>We'll contact you soon with more details about the workshop.</p>
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
      <h3 className="text-xl font-display font-semibold mb-4 text-corp-magenta">Register for the Workshop</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      {...field}
                      className="bg-transparent border-corp-magenta/40 focus:border-corp-magenta"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Your email address" 
                      {...field}
                      className="bg-transparent border-corp-magenta/40 focus:border-corp-magenta"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your phone number" 
                      {...field}
                      className="bg-transparent border-corp-magenta/40 focus:border-corp-magenta"
                      onChange={field.onChange}
                      value={field.value || ""} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger className="bg-transparent border-corp-magenta/40 focus:border-corp-magenta">
                        <SelectValue placeholder="Select primary role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="actor">Actor/Performer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="tech">Technical Crew</SelectItem>
                      <SelectItem value="artist">Visual Artist</SelectItem>
                      <SelectItem value="writer">Writer/Dramaturg</SelectItem>
                      <SelectItem value="director">Director</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="secondaryRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Role (optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger className="bg-transparent border-corp-magenta/40 focus:border-corp-magenta">
                      <SelectValue placeholder="Select secondary role if interested" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="actor">Actor/Performer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="tech">Technical Crew</SelectItem>
                    <SelectItem value="artist">Visual Artist</SelectItem>
                    <SelectItem value="writer">Writer/Dramaturg</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="production">Production Manager</SelectItem>
                    <SelectItem value="stage">Stage Manager</SelectItem>
                    <SelectItem value="none">None - Just Primary Role</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Briefly describe your relevant experience" 
                    {...field} 
                    className="bg-transparent border-corp-magenta/40 focus:border-corp-magenta min-h-[80px]"
                    value={field.value || ""} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summer Availability</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please describe your availability during summer" 
                    {...field} 
                    className="bg-transparent border-corp-magenta/40 focus:border-corp-magenta min-h-[80px]"
                    value={field.value || ""} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Anything else you'd like to share" 
                    {...field} 
                    className="bg-transparent border-corp-magenta/40 focus:border-corp-magenta min-h-[80px]"
                    value={field.value || ""} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-center mt-6">
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-corp-cyan hover:bg-corp-cyan/80 text-black font-semibold py-2 px-6"
            >
              {isPending ? "Submitting..." : "Submit Registration"}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}