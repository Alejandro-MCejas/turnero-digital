"use client"

import Button from "@/components/ui/buttons/Button";
import TimeSlotButton from "../ui/TimeSlotButton";
import Input from "@/components/ui/forms/Input";
import Select from "@/components/ui/forms/Select";
import { specialties } from "@/mocks/specialties";
import { useState } from "react";
import { doctors } from "@/mocks/doctors";
import { schedules } from "@/mocks/schedules";
import { generateTimeSlots } from "@/lib/utils/generateTimeSlots";
import { getDayNameFromDate } from "@/lib/utils/getDayNameFromDate";
import { CalendarSearch } from "lucide-react";



export default function AppointmentBookingForm() {

    const [selectedspecialty, setSelectedspecialty] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const availableDoctors = doctors.filter(
        doctor => doctor.specialty === selectedspecialty && doctor.status === "Activo"
    );

    const selectedDay = selectedDate ? getDayNameFromDate(selectedDate) : "";

    const doctorSchedules = schedules.filter(
        schedule =>
            schedule.doctorId === Number(selectedDoctor) &&
            schedule.day === selectedDay
    );

    const availableTimes = doctorSchedules.flatMap(schedule =>
        generateTimeSlots(
            schedule.start,
            schedule.end,
            schedule.appointmentDuration
        )
    );

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">

            <div className="space-y-6 sm:space-y-8">

                <div>

                    <label className="mb-2 block text-base font-medium text-slate-800">
                        Especialidad
                    </label>

                    <Select
                        value={selectedspecialty}
                        onChange={e => {
                            setSelectedspecialty(e.target.value)
                            setSelectedDoctor("");
                            setSelectedDate("");
                            setSelectedTime("");
                        }}
                        className="w-full"
                    >

                        <option value="">
                            Seleccionar una especialidad
                        </option>

                        {specialties.map(specialty => (
                            <option key={specialty.id} value={specialty.name}>
                                {specialty.name}
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
                        onChange={e => {
                            setSelectedDoctor(e.target.value);
                            setSelectedDate("");
                            setSelectedTime("");
                        }}
                        disabled={!selectedspecialty}
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
                        onChange={e => {
                            setSelectedDate(e.target.value);
                            setSelectedTime("");
                        }}
                        disabled={!selectedDoctor}
                        className="w-full disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />

                </div>

                <div>

                    <h3 className="mb-3 text-sm font-medium">

                        Horarios disponibles

                    </h3>

                    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">

                        {availableTimes.length > 0 ? (

                            availableTimes.map(time => (

                                <TimeSlotButton
                                    key={time}
                                    time={time}
                                    selected={selectedTime === time}
                                    disabled={!selectedDate}
                                    onClick={() => setSelectedTime(time)}
                                />

                            ))

                        ) : (

                            <div className="col-span-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">

                                <CalendarSearch className="mx-auto mb-3 h-8 w-8 text-slate-400" />

                                <p className="mx-auto max-w-xs text-sm leading-6 text-slate-500">
                                    Seleccioná un profesional y una fecha para consultar los horarios disponibles.
                                </p>

                            </div>

                        )}

                    </div>

                </div>

                <div className="pt-2 flex sm:justify-end">
                    <Button
                        className="mx-auto w-full max-w-xs justify-center sm:mx-0 sm:w-auto"
                        disabled={
                            !selectedspecialty ||
                            !selectedDoctor ||
                            !selectedDate ||
                            !selectedTime
                        }
                    >
                        Reservar turno
                    </Button>
                </div>

            </div>

        </section>
    )
}