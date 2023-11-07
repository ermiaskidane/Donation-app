"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { redirect } from "next/navigation";
 
 const NotifyUser = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the alert after 1 minute (60000 milliseconds)
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    redirect("/")

    return () => {
      // Clear the timeout when the component unmounts to avoid memory leaks
      clearTimeout(timeout);
    };
  }, []);

  return isVisible ? (
    <>
    <Alert className=" bg-blue-400">
      {/* <Terminal className="h-4 w-4" /> */}
      <AlertTitle>Information for Clients</AlertTitle>
      <AlertDescription className="">
        While this page currently allows access for all users, 
        it's important to note that in the actual project, only administrators and members have the necessary access privileges.
      </AlertDescription>
    </Alert>
    </>
  ) : null;
};

export default NotifyUser