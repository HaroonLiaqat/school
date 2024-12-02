import React from 'react';
import { Text, DetailFormModal } from '../components/ui';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { instructors_data } from '../db/index';
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
} from '../components/base';
import { IMAGES } from '../assets';
import { InstructorSchema } from '../validator';
import { toast } from 'react-toastify';

export interface Instructor {
    id?: string;
    name: string;
    location: string;
    email: string;
    post_code: string;
}

type InstructorSchemaType = z.infer<typeof InstructorSchema>;

function Home() {
    const [selectedInstructor, setSelectedInstructor] =
        React.useState<Instructor | null>(null);
    const [filteredInstructors, setFilteredInstructors] = React.useState<
        Instructor[]
    >([]);

    const form = useForm<InstructorSchemaType>({
        resolver: zodResolver(InstructorSchema),
        mode: 'onChange',
        delayError: 500,
        defaultValues: {
            location: '',
        },
    });

    const handleSubmit = (data: InstructorSchemaType) => {
        const isData =
            data.location &&
            instructors_data.find(
                (instructor) => instructor.post_code === data.location
            );

        if (isData) {
            setFilteredInstructors(
                instructors_data
                    .filter((instructor) => instructor.post_code === data.location)
                    .flatMap((instructor) =>
                        instructor.instructors.map((inst) => ({
                            ...inst,
                            post_code: instructor.post_code,
                        }))
                    )
            );
        } else {
            form.reset();
            setFilteredInstructors([]);
            toast.warn('No instructors found in this location.');
        }
        setSelectedInstructor(null);
    };

    const requestInstructor = () => {
        if (selectedInstructor) {
            const recipient = selectedInstructor.email;
            const subject = encodeURIComponent('Request for Driving Lessons');
            const body = encodeURIComponent(
                `Dear ${selectedInstructor.name},\n\nI am interested in learning to drive and would like to know your availability for lessons.\nPlease let me know if you have openings and any details about the process.\n\nThank you!\n`
            );

            const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;

            window.open(mailtoUrl, '_blank');
        } else {
            toast.error('Please select an instructor to send request');
        }
    };

    return (
        <div className='flex flex-row h-[90vh] '>
            {/* Left section */}
            <div className='flex flex-col flex-1 items-center justify-center'>
                <div className='w-3/5' style={{marginTop:-100}}>
                    <Text
                        fontSize='text-xl sm:text-3xl lg:text-5xl'
                        fontWeight='font-bold'
                        className='text-light lg:text-dark'
                    >
                        Find an Instructor
                    </Text>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className='w-full flex flex-col mt-6 '
                        >
                            <FormField
                                control={form.control}
                                name='location'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter Location'
                                                type='text'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button size={'lg'} type='submit' className='w-fit mt-6'>
                                Find Instructor
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>

            {/* Right section */}
            <div className='flex flex-col flex-1 items-center justify-center'>
                {filteredInstructors.length > 0 ? (
                    <div className='flex flex-col w-full max-h-[82dvh] px-3 '>
                        {/* Title */}
                        <Text
                            fontSize='text-xl sm:text-3xl lg:text-4xl'
                            fontWeight='font-bold'
                            className='text-light lg:text-dark mb-3'
                        >
                            Choose an Instructor
                        </Text>

                        {/* Scrollable content */}
                        <div
                            className='flex flex-col space-y-3  overflow-y-scroll transition-all duration-500 ease-in-out'
                            style={{
                                scrollbarWidth: 'none',
                            }}
                        >
                            {filteredInstructors.map((instructor, index) => (
                                <div
                                    key={index}
                                    className='flex items-center px-4 py-[2px] rounded-md cursor-pointer '
                                    onClick={() => {
                                        setSelectedInstructor(instructor);
                                    }}
                                    style={{
                                        borderWidth:
                                            selectedInstructor?.id === instructor.id ? '3px' : '1px',
                                        borderColor:
                                            selectedInstructor?.id === instructor.id
                                                ? '#000'
                                                : '#d2d6d3',
                                    }}
                                >
                                    {/* image */}
                                    <div className='w-[15%]' />

                                    {/* Content */}
                                    <div className='flex flex-col flex-1 mx-2'>
                                        <Text
                                            fontSize='text-base sm:text-lg lg:text-2xl'
                                            fontWeight='font-semibold'
                                            className='text-light lg:text-dark'
                                        >
                                            {instructor.name}
                                        </Text>

                                        <Text
                                            fontSize='text-sm lg:text-base'
                                            fontWeight='font-thin'
                                            className='text-light lg:text-dark'
                                        >
                                            {instructor.location}
                                        </Text>

                                        <Text
                                            fontSize='text-lg lg:text-xl'
                                            fontWeight='font-normal'
                                            className='text-light lg:text-dark text-ellipsis'
                                        >
                                            {instructor.email}
                                        </Text>
                                    </div>

                                    {/* Price */}
                                    <Text
                                        fontSize='text-lg sm:text-xl lg:text-2xl'
                                        fontWeight='font-bold'
                                        className='text-light lg:text-dark w-[5%] text-right'
                                    >
                                        $0
                                    </Text>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col sm:flex-row sm:space-y-0 justify-between items-center shadow-lg p-4 rounded-md border border-semiLight bg-light mt-2'>
                            <div className='flex flex-row w-5/6 items-center justify-evenly  mx-auto'>
                                <DetailFormModal instructor={selectedInstructor} />
                                <Button className='w-40 py-6' onClick={requestInstructor}>
                                    <Text
                                        fontSize='text-xl'
                                        fontWeight='font-medium'
                                        className='text-light px-5'
                                    >
                                        Send Request
                                    </Text>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center items-center'>
                        <img
                            className='h-80'
                            src={IMAGES.Main}
                            alt='No instructors found'
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
