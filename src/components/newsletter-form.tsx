import React from "react";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      console.log("Submitted email:", email);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 text-success p-2 bg-success-50 rounded-lg">
        <Icon icon="lucide:check-circle" className="text-xl" />
        <span>شكراً لك! سنعلمك عند إطلاق الموقع.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <Button color="danger" type="submit">
        أشعرني
      </Button>
      <Input
        type="email"
        placeholder="أدخل بريدك الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        classNames={{
          base: "bg-black/30 backdrop-blur-md",
          inputWrapper: "border-white/20",
        }}
      />
    </form>
  );
}