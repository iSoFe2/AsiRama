import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-black/30 backdrop-blur-md border-white/10">
      <CardBody className="flex flex-col items-center text-center gap-3 p-6">
        <div className="rounded-full bg-danger/20 p-3">
          <Icon icon={icon} className="text-3xl text-danger" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-white/70">{description}</p>
      </CardBody>
    </Card>
  );
}