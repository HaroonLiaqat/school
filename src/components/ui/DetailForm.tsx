import React from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { detailsFormSchema } from '@school/validator';
import {
  Form,
  Input,
  Button,
  Select,
  FormItem,
  FormField,
  FormLabel,
  SelectItem,
  FormMessage,
  FormControl,
  SelectValue,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  FormDescription,
  Switch,
  Label,
} from '../base/index';
import Text from './Text';
import { Instructor } from 'src/screens/home';

type DetailsFormSchema = z.infer<typeof detailsFormSchema>;

const DetailForm: React.FC<{
  onSubmitSuccess: () => void;
  instructor: Instructor | null;
}> = ({ onSubmitSuccess, instructor }) => {
  const form = useForm<DetailsFormSchema>({
    resolver: zodResolver(detailsFormSchema),
    mode: 'onChange',
    delayError: 500,
    defaultValues: {
      dob: '',
      email: '',
      title: 'Mr',
      gift: false,
      lastName: '',
      firstName: '',
      mobile: undefined,
      billingAddress: '',
      termsAndConditions: false,
      isBillingSameAsPickup: true,
      stayInTheKow: ['email', 'sms', 'telephone', 'post'],
    },
  });

  const handleSubmit = (data: DetailsFormSchema) => {
    console.log(data);

    handleEmailClick(data);
    onSubmitSuccess();
  };

  const handleEmailClick = (data: DetailsFormSchema) => {
    const recipient = instructor?.email;

    const subject = encodeURIComponent('Driving Lesson Booking Request');

    const body = encodeURIComponent(`
Dear ${instructor?.name},

I am reaching out to book driving lessons with you. Below are my details:

Name: ${data.title} ${data.firstName} ${data.lastName}
Date of Birth: ${data.dob}
Email: ${data.email}
Mobile: ${data.mobile}
Billing Address: ${data.billingAddress}

Please let me know your availability and any additional steps required to confirm the booking.

Thank you,
${data.firstName} ${data.lastName}
    `);

    // Create the mailto URL
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;

    // Open the Gmail compose window
    window.open(mailtoUrl, '_blank');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='flex flex-col space-y-10 px-5'>
          <div className='flex flex-col space-y-5'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <div className='flex justify-between items-center'>
                      {['Mr', 'Mrs', 'Miss', 'Ms', 'Mx'].map((t) => (
                        <div
                          className={`border-2 rounded-md text-dark px-4 py-2 cursor-pointer ${field.value === t ? 'border-dark' : ''
                            }`}
                          key={t}
                          onClick={() => field.onChange(t)}
                        >
                          <Text
                            fontSize='text-xl'
                            fontWeight='font-medium'
                            className='text-center'
                          >
                            {t}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter first name'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter last name'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter email' type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='mobile'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='Enter mobile number'
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='dob'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth (DD / MM / YYYY)</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='billingAddress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Address</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder='Pick up Now' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Pick up Now</SelectLabel>
                          <SelectItem value='test'>Test</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isBillingSameAsPickup'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is your Billing Address same as Pickup?</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-2 gap-x-3'>
                      {['Yes', 'No'].map((t) => (
                        <div
                          key={t}
                          onClick={() =>
                            field.onChange(t === 'Yes' ? true : false)
                          }
                          className={`border-2 rounded-md px-4 py-2 text-dark cursor-pointer ${field.value === true && t === 'Yes'
                              ? 'border-dark'
                              : field.value === false && t === 'No'
                                ? 'border-dark'
                                : ''
                            } transition-all duration-100 ease-in-out`}
                        >
                          <Text
                            fontSize='text-xl'
                            fontWeight='font-medium'
                            className='text-center'
                          >
                            {t}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gift'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is this a Gift?</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-2 gap-x-3'>
                      {['Yes', 'No'].map((t) => (
                        <div
                          key={t}
                          onClick={() =>
                            field.onChange(t === 'Yes' ? true : false)
                          }
                          className={`border-2 rounded-md px-4 py-2 text-dark cursor-pointer ${field.value === true && t === 'Yes'
                              ? 'border-dark'
                              : field.value === false && t === 'No'
                                ? 'border-dark'
                                : ''
                            } transition-all duration-100 ease-in-out`}
                        >
                          <Text
                            fontSize='text-xl'
                            fontWeight='font-medium'
                            className='text-center'
                          >
                            {t}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='stayInTheKow'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stay in the know</FormLabel>
                  <FormDescription>
                    We would like to contact you from time to time about driving
                    advice and offers, SMS and Phone number. You can opt out
                    anytime. See our Privacy notice to find out how. Choose how
                    we contact you.
                  </FormDescription>
                  <FormControl>
                    <div
                      className='
                    flex flex-col space-y-2'
                    >
                      {[
                        { label: 'Email', value: 'email' },
                        { label: 'SMS', value: 'sms' },
                        { label: 'Telephone', value: 'telephone' },
                        { label: 'Post', value: 'post' },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className='flex items-center justify-between border-b p-1'
                        >
                          <Label htmlFor={option.value}>{option.label}</Label>
                          <Switch
                            id={option.value}
                            checked={field.value.includes(option.value)}
                            onCheckedChange={() => {
                              const newValue = field.value.includes(
                                option.value
                              )
                                ? field.value.filter((v) => v !== option.value)
                                : [...field.value, option.value];
                              field.onChange(newValue);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='termsAndConditions'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>The AA Terms & Conditions</FormLabel>
                  <FormControl>
                    <div className='flex items-center !justify-start space-x-2 border rounded-md p-2'>
                      <Input
                        type='checkbox'
                        checked={field.value}
                        onChange={field.onChange}
                        className='w-fit'
                      />
                      <FormLabel>I agree to the terms and conditions</FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default DetailForm;
