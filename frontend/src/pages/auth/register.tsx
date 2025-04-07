/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Building2, Mail, MapPin, Upload } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { RegisterData } from "@/lib/api/auth";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
});

const organizationSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Company size is required"),
  website: z.string().optional(),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  logo: z
    .any()
    .optional()
    .refine((file) => file instanceof File, {
      message: "Logo must be a file",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Logo size must be less than 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      { message: "Logo must be a JPG, PNG, or GIF image" }
    ),
});

const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

const verificationSchema = z.object({
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  updates: z.boolean(),
});

export default function RegisterPage() {
  const { toast } = useToast();
  const { register: registerUser } = useAuth();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [registerData, setRegisterData] = useState({
    personalForm: {} as z.infer<typeof personalInfoSchema>,
    organizationForm: {} as z.infer<typeof organizationSchema>,
    addressForm: {} as z.infer<typeof addressSchema>,
    verificationForm: {} as z.infer<typeof verificationSchema>,
  });

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subdomainUrl, setSubdomainUrl] = useState<string | null>(null);


  const options = [
    { num: 1, title: "Personal Info" },
    { num: 2, title: "Organization" },
    { num: 3, title: "Address" },
    { num: 4, title: "Verification" },
  ];

  const personalForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
  });

  const organizationForm = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
  });

  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      terms: false,
      updates: false,
    },
  });

  const onSubmitPersonalInfo = (data: z.infer<typeof personalInfoSchema>) => {
    setRegisterData((prev) => ({ ...prev, personalForm: data }));
    setStep(2);
  };

  const onSubmitOrganization = (data: z.infer<typeof organizationSchema>) => {
    setRegisterData((prev) => ({
      ...prev,
      organizationForm: {
        ...data,
        logo: data.logo, // Include the logo file here
      },
    }));
    setStep(3);
  };

  const onSubmitAddress = (data: z.infer<typeof addressSchema>) => {
    setRegisterData((prev) => ({ ...prev, addressForm: data }));
    setStep(4);
  };

  const onSubmitVerification = async (
    data: z.infer<typeof verificationSchema>
  ) => {
    try {
      const finalData: RegisterData = {
        ...registerData.personalForm,
        ...registerData.organizationForm,
        ...registerData.addressForm,
        ...data,
        password: "demo@1234",
        subscriptionPlan: "free",
      };
      console.log("Final Registration Data:", finalData);

      // Call the register function with final data
      const response = await registerUser(finalData);
      console.log('Registration Response:', response);
      // if (response && response.organization) {
      //   const orgUrl: string = `https://${response.organization.subdomain as string}`;
      //   setSubdomainUrl(orgUrl);
      //   setIsModalOpen(true);
      
      //   toast({
      //     title: "Success",
      //     description: "Registration successful! Redirecting to your dashboard...",
      //   });
      // }
      
    } catch (error) {
      console.log("Error registering:", error);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      organizationForm.setValue("logo", file); // Set the file in the form
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {options.map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s.num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`text-sm font-medium ${
                    step === s.num ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {s.title}
                </span>
                {s.num < 4 && <div className="w-12 h-[2px] bg-muted" />}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-card rounded-lg">
          {step === 1 && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Personal Information</h2>
                <p className="text-muted-foreground mt-1">
                  Tell us about yourself
                </p>
              </div>

              <form
                onSubmit={personalForm.handleSubmit(onSubmitPersonalInfo)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                      {...personalForm.register("firstName")}
                      className="h-12"
                      placeholder="John"
                    />
                    {personalForm.formState.errors.firstName && (
                      <p className="text-sm text-destructive">
                        {personalForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      {...personalForm.register("lastName")}
                      className="h-12"
                      placeholder="Doe"
                    />
                    {personalForm.formState.errors.lastName && (
                      <p className="text-sm text-destructive">
                        {personalForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Input
                      {...personalForm.register("email")}
                      type="email"
                      className="h-12 pl-12"
                      placeholder="john@example.com"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  {personalForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {personalForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <div className="relative">
                    <Input
                      {...personalForm.register("dateOfBirth")}
                      type="date"
                      className="h-12 pl-12"
                    />
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  {personalForm.formState.errors.dateOfBirth && (
                    <p className="text-sm text-destructive">
                      {personalForm.formState.errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <div className="relative">
                    <Input
                      {...personalForm.register("address")}
                      className="h-12 pl-12"
                      placeholder="Enter your address"
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  {personalForm.formState.errors.address && (
                    <p className="text-sm text-destructive">
                      {personalForm.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="w-32 h-12">
                    Next Step
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Organization Details</h2>
                <p className="text-muted-foreground mt-1">
                  Tell us about your company
                </p>
              </div>

              <form
                onSubmit={organizationForm.handleSubmit(onSubmitOrganization)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <div className="relative">
                    <Input
                      {...organizationForm.register("companyName")}
                      className="h-12 pl-12"
                      placeholder="Acme Inc."
                    />
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  {organizationForm.formState.errors.companyName && (
                    <p className="text-sm text-destructive">
                      {organizationForm.formState.errors.companyName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Industry</label>
                    <Select
                      onValueChange={(value) =>
                        organizationForm.setValue("industry", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                    {organizationForm.formState.errors.industry && (
                      <p className="text-sm text-destructive">
                        {organizationForm.formState.errors.industry.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Size</label>
                    <Select
                      onValueChange={(value) =>
                        organizationForm.setValue("size", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201-500 employees
                        </SelectItem>
                        <SelectItem value="501+">501+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    {organizationForm.formState.errors.size && (
                      <p className="text-sm text-destructive">
                        {organizationForm.formState.errors.size.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GST Number</label>
                    <Input
                      {...organizationForm.register("gstNumber")}
                      className="h-12"
                      placeholder="Enter GST number"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">PAN Number</label>
                    <Input
                      {...organizationForm.register("panNumber")}
                      className="h-12"
                      placeholder="Enter PAN number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input
                    {...organizationForm.register("website")}
                    className="h-12"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Logo</label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Company Logo Preview"
                        className="mx-auto h-24 w-24 object-contain"
                      />
                    ) : (
                      <>
                        {" "}
                        <Input
                          type="file"
                          // {...organizationForm.register("logo")}
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-32 h-12"
                    onClick={() => setStep(1)}
                  >
                    Previous
                  </Button>
                  <Button type="submit" className="w-32 h-12">
                    Next Step
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Company Address</h2>
                <p className="text-muted-foreground mt-1">
                  Enter your company's address details
                </p>
              </div>

              <form
                onSubmit={addressForm.handleSubmit(onSubmitAddress)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Street Address</label>
                  <Input
                    {...addressForm.register("street")}
                    className="h-12"
                    placeholder="1234 Main St"
                  />
                  {addressForm.formState.errors.street && (
                    <p className="text-sm text-destructive">
                      {addressForm.formState.errors.street.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input
                      {...addressForm.register("city")}
                      className="h-12"
                      placeholder="City"
                    />
                    {addressForm.formState.errors.city && (
                      <p className="text-sm text-destructive">
                        {addressForm.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Input
                      {...addressForm.register("state")}
                      className="h-12"
                      placeholder="State"
                    />
                    {addressForm.formState.errors.state && (
                      <p className="text-sm text-destructive">
                        {addressForm.formState.errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Postal Code</label>
                    <Input
                      {...addressForm.register("postalCode")}
                      className="h-12"
                      placeholder="Postal Code"
                    />
                    {addressForm.formState.errors.postalCode && (
                      <p className="text-sm text-destructive">
                        {addressForm.formState.errors.postalCode.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <Input
                      {...addressForm.register("country")}
                      className="h-12"
                      placeholder="Country"
                    />
                    {addressForm.formState.errors.country && (
                      <p className="text-sm text-destructive">
                        {addressForm.formState.errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-32 h-12"
                    onClick={() => setStep(2)}
                  >
                    Previous
                  </Button>
                  <Button type="submit" className="w-32 h-12">
                    Next Step
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 4 && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Verification</h2>
                <p className="text-muted-foreground mt-1">
                  Final step to complete your registration
                </p>
              </div>

              <form
                onSubmit={verificationForm.handleSubmit(onSubmitVerification)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      {...verificationForm.register("terms")}
                      className="mt-1"
                    />
                    <label className="text-sm">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {verificationForm.formState.errors.terms && (
                    <p className="text-sm text-destructive">
                      {verificationForm.formState.errors.terms.message}
                    </p>
                  )}

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      {...verificationForm.register("updates")}
                      className="mt-1"
                    />
                    <label className="text-sm">
                      I want to receive updates about products and promotional
                      offers
                    </label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-32 h-12"
                    onClick={() => setStep(3)}
                  >
                    Previous
                  </Button>
                  <Button type="submit" className="w-32 h-12">
                    Complete
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Success Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogTitle>Registration Successful 🎉</DialogTitle>
            <p className="text-center text-gray-600">Your organization has been registered successfully.</p>
            <p className="text-center font-semibold">{subdomainUrl}</p>
            <div className="flex justify-center">
              <Button
                className="mt-4"
                onClick={() => navigate(subdomainUrl || "/")}
              >
                Go to Dashboard
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AuthLayout>
  );
}
