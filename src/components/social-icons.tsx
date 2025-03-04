import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export function SocialIcons() {
  const socialLinks = [
    { icon: "lucide:instagram", url: "#", label: "Instagram" },
    { icon: "lucide:twitter", url: "#", label: "Twitter" },
    { icon: "lucide:facebook", url: "#", label: "Facebook" },
    { icon: "lucide:youtube", url: "#", label: "YouTube" },
  ];

  return (
    <div className="flex gap-3">
      {socialLinks.map((social) => (
        <Button
          key={social.label}
          isIconOnly
          as="a"
          href={social.url}
          aria-label={social.label}
          variant="flat"
          className="bg-black/30 backdrop-blur-md text-white border-white/10"
        >
          <Icon icon={social.icon} className="text-xl" />
        </Button>
      ))}
    </div>
  );
}