"use client"

import Button from "@/components/ui/buttons/Button";
import TimeSlotButton from "../ui/TimeSlotButton";
import Input from "@/components/ui/forms/Input";
import Select from "@/components/ui/forms/Select";
import { useState } from "react";
import { CalendarSearch, Clock3 } from "lucide-react";
import { useDoctors } from "@/features/doctors/hooks/useDoctors";
import { useCreateAppointment } from "@/features/appointments/hooks/useCreateAppointment";
import Loader from "@/components/ui/feedback/Loader";
import EmptyState from "@/components/shared/empty-state/EmptyState";
import { useDoctorAvailability } from "@/features/doctors/hooks/useDoctorAvailability";
import { getLocaleDateString } from "@/lib/utils/getLocalDateString";


export default function AppointmentBookingForm() {

    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const { data: doctors = [], isLoading: isLoadingDoctors, isError: isDoctorsError } = useDoctors()

    const { data: availableTimes = [], isLoading: isLoadingAvailability, isError: isAvailabilityError } = useDoctorAvailability(
        selectedDoctor,
        selectedDate
    )

    const createAppointmentMutation = useCreateAppointment()

    const specialties = Array.from(
        new Set(doctors.map(doctor => doctor.specialty))
    );

    const availableDoctors = doctors.filter(
        doctor => doctor.specialty === selectedSpecialty
    );

    const handleSpecialtyChange = (specialty: string) => {
        setSelectedSpecialty(specialty);
        setSelectedDoctor("");
        setSelectedDate("");
        setSelectedTime("");
    };

    const handleDoctorChange = (doctorId: string) => {
        setSelectedDoctor(doctorId);
        setSelectedDate("");
        setSelectedTime("");
    };

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedTime("");
    };

    const handleSubmit = () => {

        if (
            !selectedDoctor ||
            !selectedDate ||
            !selectedTime
        ) {
            return;
        }

        createAppointmentMutation.mutate(
            {
                doctorId: selectedDoctor,
                date: selectedDate,
                time: selectedTime
            },
            {
                onSuccess: () => {
                    setSelectedSpecialty("");
                    setSelectedDoctor("");
                    setSelectedDate("");
                    setSelectedTime("");
                }
            }
        );
    };

    if (isLoadingDoctors) {
        return (
            <Loader
                title="Cargando profesionales"
                description="Obteniendo los profesionales disponibles..."
            />
        );
    }

    if (isDoctorsError) {
        return (
            <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="text-sm text-red-600">
                    No se pudieron cargar los profesionales.
                </p>
            </section>
        );
    }


    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="space-y-6 sm:space-y-8">
                <div>

                    <label className="mb-2 block text-base font-medium text-slate-800">
                        Especialidad
                    </label>

                    <Select
                        value={selectedSpecialty}
                        onChange={e => handleSpecialtyChange(e.target.value)}
                        className="w-full"
                    >

                        <option value="">
                            Seleccionar una especialidad
                        </option>

                        {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>
                                {specialty}
                            </option>
                        ))}

                    </Select>

                </div>

                <div>

                    <label className="mb-2 block text-base font-medium text-slate-800">
                        Profesional
                    </label>

                    <Select
                        value={selectedDoctor}
                        onChange={e => handleDoctorChange(e.target.value)}
                        disabled={!selectedSpecialty}
                        className="w-full disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    >

                        <option value="">
                            Seleccionar un profesional
                        </option>

                        {availableDoctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}

                    </Select>

                </div>

                <div>

                    <label className="mb-2 block text-base font-medium text-slate-800">
                        Fecha
                    </label>

                    <Input
                        type="date"
                        value={selectedDate}
                        onChange={e => handleDateChange(e.target.value)}
                        disabled={!selectedDoctor}
                        min={getLocaleDateString()}
                        className="w-full disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />

                </div>

                <div>

                    <h3 className="mb-3 text-sm font-medium">Horarios disponibles</h3>

                    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                        {!selectedDoctor || !selectedDate ? (

                            <div className="col-span-3 w-full">

                                <EmptyState
                                    size="sm"
                                    icon={
                                        <CalendarSearch className="h-10 w-10" />
                                    }
                                    title="Seleccioná una fecha"
                                    description="Elegí un profesional y una fecha para consultar los horarios disponibles."
                                />

                            </div>

                        ) : isLoadingAvailability ? (

                            <div className="col-span-3 w-full">

                                <Loader
                                    title="Cargando horarios"
                                    description="Consultando los horarios disponibles..."
                                />

                            </div>

                        ) : isAvailabilityError ? (

                            <div className="col-span-3 w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

                                <p className="text-sm text-red-600">
                                    No se pudieron cargar los horarios del profesional.
                                </p>

                            </div>

                        ) : availableTimes.length > 0 ? (

                            availableTimes.map(time => (

                                <TimeSlotButton
                                    key={time}
                                    time={time}
                                    selected={selectedTime === time}
                                    onClick={() =>
                                        setSelectedTime(time)
                                    }
                                />

                            ))

                        ) : (

                            <div className="col-span-3 w-full">

                                <EmptyState
                                    size="sm"
                                    icon={
                                        <Clock3 className="h-10 w-10" />
                                    }
                                    title="No hay horarios disponibles"
                                    description="El profesional no tiene horarios disponibles para la fecha seleccionada."
                                />

                            </div>

                        )}
                    </div>

                </div>

                <div className="pt-2 flex sm:justify-end">
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="mx-auto w-full max-w-xs justify-center sm:mx-0 sm:w-auto"
                        disabled={
                            !selectedSpecialty ||
                            !selectedDoctor ||
                            !selectedDate ||
                            !selectedTime ||
                            createAppointmentMutation.isPending
                        }
                    >
                        {createAppointmentMutation.isPending
                            ? "Reservando..."
                            : "Reservar turno"
                        }
                    </Button>
                </div>

            </div>

        </section>
    )
}