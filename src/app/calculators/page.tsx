
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sigma,
  Landmark,
  HeartPulse,
  FlaskConical,
  Sparkles,
  Wand2,
  Calculator as CalculatorIcon, 
  ChevronRight,
  Percent,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CalculatorItem {
  name: string;
  slug: string;
  isImplemented?: boolean;
  icon?: LucideIcon;
}

interface CalculatorCategory {
  name: string;
  icon: LucideIcon;
  calculators: CalculatorItem[];
}

const calculatorCategories: CalculatorCategory[] = [
  {
    name: "Basic Math Calculators",
    icon: Sigma,
    calculators: [
      { name: "Basic Calculator", slug: "basic", isImplemented: true, icon: CalculatorIcon },
      { name: "Scientific Calculator", slug: "scientific", icon: CalculatorIcon },
      { name: "Percentage Calculator", slug: "percentage", isImplemented: true, icon: Percent },
      { name: "Average Calculator", slug: "average" },
      { name: "Ratio Calculator", slug: "ratio" },
      { name: "Fraction Calculator", slug: "fraction" },
      { name: "LCM & HCF Calculator", slug: "lcm-hcf" },
      { name: "Exponent Calculator", slug: "exponent" },
      { name: "Logarithm Calculator", slug: "logarithm" },
      { name: "Modulo Calculator", slug: "modulo" },
    ],
  },
  {
    name: "Financial Calculators",
    icon: Landmark,
    calculators: [
      { name: "Loan EMI Calculator", slug: "loan-emi" },
      { name: "SIP (Mutual Fund) Calculator", slug: "sip" },
      { name: "Fixed Deposit (FD) Calculator", slug: "fd" },
      { name: "Public Provident Fund (PPF) Calculator", slug: "ppf" },
      { name: "GST Calculator", slug: "gst" },
      { name: "Income Tax Calculator", slug: "income-tax" },
      { name: "Inflation Calculator", slug: "inflation" },
      { name: "Credit Card Payment Calculator", slug: "credit-card-payment" },
      { name: "ROI (Return on Investment) Calculator", slug: "roi" },
      { name: "NPV (Net Present Value) Calculator", slug: "npv" },
    ],
  },
  {
    name: "Health & Fitness Calculators",
    icon: HeartPulse,
    calculators: [
      { name: "BMI (Body Mass Index) Calculator", slug: "bmi" },
      { name: "BMR (Basal Metabolic Rate) Calculator", slug: "bmr" },
      { name: "Calorie Calculator", slug: "calorie" },
      { name: "Pregnancy Due Date Calculator", slug: "pregnancy-due-date" },
      { name: "Blood Pressure Calculator", slug: "blood-pressure" },
      { name: "Water Intake Calculator", slug: "water-intake" },
      { name: "Steps to Calorie Calculator", slug: "steps-to-calorie" },
      { name: "Muscle Mass Calculator", slug: "muscle-mass" },
    ],
  },
  {
    name: "Engineering & Science Calculators",
    icon: FlaskConical,
    calculators: [
      { name: "Scientific Notation Calculator", slug: "scientific-notation" },
      { name: "Graphing Calculator", slug: "graphing" },
      { name: "Matrix Calculator", slug: "matrix" },
      { name: "Chemistry Molar Mass Calculator", slug: "molar-mass" },
      { name: "Electricity Calculator", slug: "electricity" },
      { name: "Ohm's Law Calculator", slug: "ohms-law" },
      { name: "Wavelength Calculator", slug: "wavelength" },
      { name: "Binary/Hexadecimal Calculator", slug: "binary-hexadecimal" },
    ],
  },
  {
    name: "Everyday Life Calculators",
    icon: Sparkles,
    calculators: [
      { name: "Tip Calculator", slug: "tip" },
      { name: "Discount Calculator", slug: "discount" },
      { name: "Unit Converter", slug: "unit-converter" },
      { name: "Currency Converter", slug: "currency-converter" },
      { name: "Age Calculator", slug: "age" },
      { name: "Date Difference Calculator", slug: "date-difference" },
      { name: "Time Calculator", slug: "time" },
      { name: "Password Generator", slug: "password-generator" },
    ],
  },
  {
    name: "Advanced & Special Tools",
    icon: Wand2,
    calculators: [
      { name: "Function Graph Plotter", slug: "function-graph-plotter" },
      { name: "Casio-style Calculator", slug: "casio-style" },
      { name: "Barcode Generator", slug: "barcode-generator" },
      { name: "QR Code Generator", slug: "qr-code-generator" },
      { name: "Random Number Generator", slug: "random-number-generator" },
      { name: "Password Strength Checker", slug: "password-strength-checker" },
      { name: "Math Formula Solver", slug: "math-formula-solver" },
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto space-y-8">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <CalculatorIcon className="h-10 w-10 text-primary" />
            <CardTitle className="text-4xl font-bold">Explore Calculators</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Browse our comprehensive suite of calculators, organized by category.
            More tools are being added regularly!
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculatorCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <Card key={category.name} className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center text-xl text-primary">
                  <CategoryIcon className="mr-3 h-6 w-6" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <ul className="space-y-2">
                  {category.calculators.map((calc) => {
                    const CalcItemIcon = calc.icon;
                    return (
                    <li key={calc.slug}>
                      <Link
                        href={calc.isImplemented ? `/calculators/${calc.slug}` : `#`}
                        className={`flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors group ${!calc.isImplemented ? 'cursor-not-allowed opacity-70' : ''}`}
                        aria-disabled={!calc.isImplemented}
                        tabIndex={!calc.isImplemented ? -1 : undefined}
                      >
                        <div className="flex items-center">
                          {CalcItemIcon && <CalcItemIcon className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary" />}
                          <span className="text-foreground/90 group-hover:text-primary">{calc.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!calc.isImplemented && (
                            <Badge variant="outline" className="text-xs border-accent text-accent group-hover:bg-accent group-hover:text-accent-foreground">
                              Soon
                            </Badge>
                          )}
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    </li>
                  )}
                  )}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
