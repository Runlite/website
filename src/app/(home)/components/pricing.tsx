import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

interface PricingFeature {
  text: string;
  highlighted?: boolean;
}

interface PricingPlan {
  title: string;
  price: string;
  subtitle: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Pricing() {
  const pricingPlans: PricingPlan[] = [
    {
      title: "Basic",
      subtitle: "Perfect for testing and small projects",
      price: "$0",
      features: [
        { text: "1,000 API calls per month" },
        { text: "10 concurrent requests" },
        { text: "Community support" },
        { text: "Basic analytics dashboard" },
        { text: "99.9% uptime SLA" },
        { text: "Unlimited cached requests", highlighted: true },
      ],
      cta: "Get Started",
    },
    {
      title: "Pro",
      subtitle: "Ideal for growing businesses",
      price: "$49",
      popular: true,
      features: [
        { text: "1,000,000 API calls per month" },
        { text: "100 concurrent requests" },
        { text: "Priority email support" },
        { text: "Advanced analytics & reporting" },
        { text: "Custom rate limiting", highlighted: true },
        { text: "API key management", highlighted: true },
      ],
      cta: "Start Free Trial",
    },
    {
      title: "Enterprise",
      subtitle: "For large-scale applications",
      price: "Custom",
      features: [
        { text: "Unlimited API calls" },
        { text: "Unlimited concurrent requests" },
        { text: "24/7 dedicated support" },
        { text: "Full infrastructure control" },
        { text: "On-premise deployment", highlighted: true },
        { text: "Custom SLA", highlighted: true },
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <motion.section
      className="py-24 bg-gradient-to-b from-slate-50 to-slate-100"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core
            features, plus specific benefits designed to help you achieve your
            goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className={`h-full flex flex-col relative overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-slate-200 hover:border-blue-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-500 text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    {plan.title}
                  </CardTitle>
                  <p className="text-slate-500 mt-1">{plan.subtitle}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-slate-500 ml-2">/month</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-start ${
                          feature.highlighted
                            ? "text-slate-900"
                            : "text-slate-600"
                        }`}
                      >
                        <Check
                          className={`mr-2 h-5 w-5 mt-0.5 ${
                            feature.highlighted
                              ? "text-blue-500"
                              : "text-slate-400"
                          }`}
                        />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 mt-auto">
                  <Button
                    className={`w-full h-11 text-sm font-medium ${
                      index === 0
                        ? "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                        : plan.popular
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-16 text-center" variants={fadeInUp}>
          <p className="text-slate-600">
            All plans include our core features:
            <span className="font-medium text-slate-700">
              {" "}
              API Documentation, SSL Encryption, Rate Limiting, and CORS Support
            </span>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
