
import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ContactSupportProps {
  appointmentId?: string;
  open: boolean;
  onClose: () => void;
}

const ContactSupport: React.FC<ContactSupportProps> = ({
  appointmentId,
  open,
  onClose
}) => {
  const [topic, setTopic] = useState("question");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    // In a real app, we would make an API call to send the support message
    toast.success("Your message has been sent to support. We'll get back to you shortly.");
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Contact Support
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="text-lg font-medium">How can we help you?</span>
          </div>
          
          {appointmentId && (
            <div className="text-sm text-muted-foreground">
              This conversation will reference appointment #{appointmentId.substring(0, 8)}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="question">General Question</SelectItem>
                <SelectItem value="billing">Billing Issue</SelectItem>
                <SelectItem value="technical">Technical Problem</SelectItem>
                <SelectItem value="reschedule">Reschedule Help</SelectItem>
                <SelectItem value="cancellation">Cancellation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please describe your issue or question..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            Support hours: Monday to Friday, 9am to 5pm. We typically respond within 24 hours.
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupport;
