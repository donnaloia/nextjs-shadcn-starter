"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  address: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email address" }),
})

export default function CreateEmailAddress() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Sending payload:', values);

      const response = await fetch('http://localhost:8080/api/email-addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        throw new Error('Failed to create email address');
      }

      alert('Email address created successfully');
      form.reset();
    } catch (error) {
      alert('Failed to create email address');
      console.error('Error:', error);
    }
  }

// NOTES: all resource urls will be nested behind an organization name.  every request will need to include the organization name as a path parameter. 
// in the middleware, the organization in the url will be compared against the organization in the jwt token.  if they match, the request will be allowed.  otherwise, a 403 should be returned.
// we also should restructure the rest api to use api/v1/organization/{organization}/resource  as the path for all requests.
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Create Email Address</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="email@example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              Create Email Address
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
} 